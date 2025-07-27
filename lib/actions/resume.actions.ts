"use server";

import Certificate from "../models/certificate.model";
import Education from "../models/education.model";
import Experience from "../models/experience.model";
import Portofolio from "../models/portofolio.model";
import Resume from "../models/resume.model";
import Skill from "../models/skill.model";
import Socmed from "../models/socmed.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

async function getResume(resumeId: string) {
  await connectToDB();
  const resume = await Resume.findOne({ resumeId: resumeId });
  if (!resume) {
    throw new Error("Resume not found");
  }
  return resume;
}

export async function createResume({
  resumeId,
  userId,
  title,
}: {
  resumeId: string;
  userId: string;
  title: string;
}) {
  try {
    await connectToDB();

    const newResume = await Resume.create({
      resumeId,
      userId,
      title,
    });

    return { success: true, data: JSON.stringify(newResume) };
  } catch (error: any) {
    console.error(`Failed to create resume: ${error.message}`);
    return { success: false, error: error.message };
  }
}

export async function fetchResume(resumeId: string) {
  try {
    await connectToDB();

    const resume = await Resume.findOne({ resumeId: resumeId })
      .populate({
        path: "experience",
        model: Experience,
        options: { sort: { startDate: -1 } }, 
      })
      .populate({
        path: "education",
        model: Education,
        options: { sort: { startDate: -1 } }, 
      })
      .populate({
        path: "certificate",
        model: Certificate,
        options: { sort: { startDate: -1 } }, 
      })
      .populate({
        path: "portofolio",
        model: Portofolio,
        options: { sort: { startDate: -1 } }, 
      })
      .populate({
        path: "skills",
        model: Skill,
      })
      .populate({
        path: "socmed",
        model: Socmed,
      });

    return JSON.stringify(resume);
  } catch (error: any) {
    throw new Error(`Failed to fetch resume: ${error.message}`);
  }
}

export async function fetchUserResumes(userId: string): Promise<string> {
  if (userId === "") {
    return "[]";
  }
  try {
    await connectToDB();
    const resumes = await Resume.find({ userId: userId })
      .populate("experience")
      .populate("education")
      .populate("skills")
      .populate("certificate")
      .populate("portofolio")
      .populate("socmed");
    return JSON.stringify(resumes);
  } catch (error: any) {
    throw new Error(`Failed to fetch user resumes: ${error.message}`);
  }
}

export async function checkResumeOwnership(userId: string, resumeId: string) {
  if (userId === "") {
    return false;
  }

  try {
    await connectToDB();

    const resume = await Resume.findOne({ resumeId: resumeId, userId: userId });

    return resume ? true : false;
  } catch (error: any) {
    throw new Error(`Failed to check resume ownership: ${error.message}`);
  }
}

export async function updateResume({
  resumeId,
  updates,
}: {
  resumeId: string;
  updates: Partial<{
    firstName: string;
    lastName: string;
    birthplace: string;
    birthdate: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    imageUrl: string,
    summary: string;
    themeColor: string;
  }>;
}) {
  try {
    const resume = await getResume(resumeId);

    Object.keys(updates).forEach((key) => {
      const updateValue = updates[key as keyof typeof updates];

      if (updateValue !== undefined) {
        resume[key as keyof typeof updates] = updateValue;
      }
    });

    resume.updatedAt = new Date();

    const updatedResume = await resume.save();

    return { success: true, data: JSON.stringify(updatedResume) };
  } catch (error: any) {
    console.error(`Failed to update resume: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function updateResumeField(
  resumeId: string,
  fieldName: string,
  dataArray: any[],
  Model: any
) {
  try {
    const resume = await getResume(resumeId);

    // Simpan ID awal sebelum diupdate
    const originalIds = [...resume[fieldName]].map((id) => id.toString());

    // Proses data baru atau update data yang ada
    const savedItems = await Promise.all(
      dataArray.map(async (data: any) => {
        if (data._id) {
          const existingItem = await Model.findById(data._id);
          if (existingItem) {
            return await Model.findByIdAndUpdate(data._id, data, { new: true });
          }
        }
        const newItem = new Model(data);
        return await newItem.save();
      })
    );

    // Update field di resume dengan ID baru
    const itemIds = savedItems.map((item) => item._id);
    resume[fieldName] = itemIds;

    const updatedResume = await resume.save();

    // Hapus item yang tidak lagi ada di daftar baru
    const updatedIds = updatedResume[fieldName].map((id: string) =>
      id.toString()
    );
    const idsToDelete = originalIds.filter((id) => !updatedIds.includes(id));

    if (idsToDelete.length > 0) {
      await Model.deleteMany({ _id: { $in: idsToDelete } });
    }

    return { success: true, data: JSON.stringify(updatedResume) };
  } catch (error: any) {
    console.error(`Error updating ${fieldName} in resume: `, error);
    return { success: false, error: error.message };
  }
}

export async function addExperienceToResume(
  resumeId: string,
  experienceDataArray: any
) {
  return await updateResumeField(
    resumeId,
    "experience",
    experienceDataArray,
    Experience
  );
}

export async function addEducationToResume(
  resumeId: string,
  educationDataArray: any
) {
  return await updateResumeField(
    resumeId,
    "education",
    educationDataArray,
    Education
  );
}

export async function addSkillToResume(resumeId: string, skillDataArray: any) {
  return await updateResumeField(resumeId, "skills", skillDataArray, Skill);
}

export async function addCertificateToResume(
  resumeId: string,
  certificationDataArray: any
) {
  return await updateResumeField(
    resumeId,
    "certificate",
    certificationDataArray,
    Certificate
  );
}

export async function addPortofolioToResume(
  resumeId: string,
  portofolioDataArray: any
) {
  return await updateResumeField(
    resumeId,
    "portofolio",
    portofolioDataArray,
    Portofolio
  );
}

export async function addSocmedToResume(
  resumeId: string,
  socmedDataArray: any
) {
  return await updateResumeField(resumeId, "socmed", socmedDataArray, Socmed);
}

export async function deleteResume(resumeId: string, path: string) {
  try {
    const resume = await getResume(resumeId);

    // Manually delete related documents
    const collections = [
      { model: Experience, field: resume.experience },
      { model: Education, field: resume.education },
      { model: Skill, field: resume.skills },
      { model: Certificate, field: resume.certificate },
      { model: Portofolio, field: resume.portofolio },
      { model: Socmed, field: resume.socmed },
    ];

    await Promise.all(
      collections.map(({ model, field }) => {
        console.log(`Deleting ${model.modelName}:`, field);
        return field && field.length > 0
          ? model.deleteMany({ _id: { $in: field } })
          : Promise.resolve();
      })
    );

    await resume.deleteOne();

    revalidatePath(path);

    return { success: true };
  } catch (error: any) {
    console.error(`Failed to delete resume: ${error.message}`);
    throw error;
  }
}
