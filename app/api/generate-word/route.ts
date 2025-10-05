import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import ImageModule from 'docxtemplater-image-module-free';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { formatDate, getMonthAndYear, getYear, stripHtml } from '@/lib/utils';

interface Skill {
  name: string;
  rating?: number;
  _id?: string;
  __v?: number;
}

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      birthplace,
      birthdate,
      address,
      jobTitle,
      qrCodeUrl,
      education = [],
      experience = [],
      skills = [],
      certificate = [],
      portofolio = [],
      socmed = [],
      layout,
    } = await request.json();

    let templateFileName = 'template.docx';
    switch (layout) {
      case 'th':
        templateFileName = 'template-th.docx';
        break;
      case 'th-simple':
        templateFileName = 'template-th-simple.docx';
        break;
      default:
        console.warn('⚠️ Layout tidak dikenali, gunakan template default.docx');
        break;
    }

    // 🌐 Ambil file template dengan cara kompatibel (lokal & Netlify)
    let content: Buffer;
    const templatePath = path.join(process.cwd(), 'public', templateFileName);

    if (fs.existsSync(templatePath)) {
      // 🧩 Jalan lokal → baca langsung dari file
      content = fs.readFileSync(templatePath);
    } else {
      // 🌍 Jalan di Netlify/Vercel → fetch dari URL publik
      const baseUrl =
        process.env.NEXT_PUBLIC_URL ||
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000');
      const templateUrl = `${baseUrl}/${templateFileName}`;
      const response = await fetch(templateUrl);

      if (!response.ok) {
        throw new Error(`Template file not found: ${templateFileName}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      content = Buffer.from(arrayBuffer);
    }

    const qrColor =
      layout === 'th-simple'
        ? { dark: '#000000', light: '#FFFFFF' }
        : { dark: '#FFFFFF', light: '#00000000' };

    const qrCodeBuffer = await QRCode.toBuffer(qrCodeUrl, {
      type: 'png',
      width: 170,
      color: qrColor,
    });

    // 📄 Baca file DOCX & siapkan modul image
    const zip = new PizZip(content);
    const imageModule = new ImageModule({
      centered: false,
      getImage: (tagValue: string, tagName: string) => {
        if (tagName === 'qrCode') return qrCodeBuffer;
        return null;
      },
      getSize: () => [170, 170],
    });

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [imageModule],
    });

    const processedExperience = experience.map((exp: any) => ({
      ...exp,
      workSummary: stripHtml(exp.workSummary || ''),
      startDate: getMonthAndYear(exp.startDate || ''),
      endDate: getMonthAndYear(exp.endDate || ''),
    }));

    const processedEducation = education.map((edu: any) => ({
      ...edu,
      startDate: getYear(edu.startDate || ''),
      endDate: getYear(edu.endDate || ''),
    }));

    const processedCertificate = certificate.map((cer: any) => ({
      ...cer,
      startDate: getMonthAndYear(cer.startDate || ''),
      endDate: getMonthAndYear(cer.endDate || ''),
    }));

    const processedPortofolio = portofolio.map((port: any) => ({
      ...port,
      startDate: getMonthAndYear(port.startDate || ''),
      endDate: getMonthAndYear(port.endDate || ''),
      sourceCode: port.sourceCode || '-',
      preview: port.preview || '-',
    }));

    const typedSkills: Skill[] = skills;

    const hasEducation = processedEducation.length > 0;
    const hasExperience = processedExperience.length > 0;
    const hasSkills = typedSkills.length > 0;
    const hasCertificate = processedCertificate.length > 0;
    const hasPortofolio = processedPortofolio.length > 0;

    const numColumns = 3;
    const skillsColumns = {
      column1: [] as Skill[],
      column2: [] as Skill[],
      column3: [] as Skill[],
    };
    typedSkills.forEach((skill, index) => {
      const col = index % numColumns;
      if (col === 0) skillsColumns.column1.push(skill);
      else if (col === 1) skillsColumns.column2.push(skill);
      else skillsColumns.column3.push(skill);
    });

    doc.setData({
      firstName: firstName || '-',
      lastName: lastName || '-',
      email: email || '-',
      phone: phone || '-',
      birthplace: birthplace || '-',
      birthdate: birthdate ? formatDate(birthdate) : '-',
      address: address || '-',
      jobTitle: jobTitle || '-',
      hasEducation,
      education: processedEducation,
      hasExperience,
      experience: processedExperience,
      hasSkills,
      skills: typedSkills,
      skillsColumn1: skillsColumns.column1,
      skillsColumn2: skillsColumns.column2,
      skillsColumn3: skillsColumns.column3,
      hasCertificate,
      certificate: processedCertificate,
      hasPortofolio,
      portofolio: processedPortofolio,
      socmed,
      qrCode: 'qrCode',
    });

    doc.render();

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    return new NextResponse(new Uint8Array(buf), {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=resume.docx',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate Word', details: (error as Error).message },
      { status: 500 }
    );
  }
}
