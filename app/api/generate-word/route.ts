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
    } = await request.json();

    const qrCodeBuffer = await QRCode.toBuffer(qrCodeUrl, {
      type: 'png',
      width: 170,
      color: {
        dark: '#FFFFFF',
        light: '#00000000', 
      },
    });

    const templatePath = path.join(process.cwd(), 'public', 'template.docx');
    if (!fs.existsSync(templatePath)) {
      throw new Error('Template file not found');
    }
    const content = fs.readFileSync(templatePath);
    const zip = new PizZip(content);

    const imageModule = new ImageModule({
      centered: false,
      getImage: (tagValue: string, tagName: string) => {
        if (tagName === 'qrCode') {
          return qrCodeBuffer;
        }
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
    }));

    const typedSkills: Skill[] = skills;

    const hasEducation = processedEducation.length > 0;
    const hasExperience = processedExperience.length > 0;
    const hasSkills = typedSkills.length > 0;
    const hasCertificate = processedCertificate.length > 0;
    const hasPortofolio = processedPortofolio.length > 0;

    const numColumns = 3;
    const skillsColumns: { column1: Skill[]; column2: Skill[]; column3: Skill[] } = {
      column1: [],
      column2: [],
      column3: [],
    };
    typedSkills.forEach((skill: Skill, index: number) => {
      const row = Math.floor(index / numColumns);
      const col = index % numColumns;
      if (col === 0) skillsColumns.column1[row] = skill;
      else if (col === 1) skillsColumns.column2[row] = skill;
      else if (col === 2) skillsColumns.column3[row] = skill;
    });

    doc.setData({
      firstName: firstName || 'N/A',
      lastName: lastName || 'N/A',
      email: email || 'N/A',
      phone: phone || 'N/A',
      birthplace: birthplace || 'N/A',
      birthdate: birthdate ? formatDate(birthdate) : 'N/A',
      address: address || 'N/A',
      jobTitle: jobTitle || 'N/A',
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

    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=resume.docx',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate Word', details: error }, { status: 500 });
  }
}