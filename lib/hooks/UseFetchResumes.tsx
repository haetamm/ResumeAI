import { useEffect, useState } from "react";
import { fetchResume } from "../actions/resume.actions";
import { getFromDB } from "../indexedDB";

const getResumeByIdFromDB = async (resumeId: string) => {
  const resumeData = (await getFromDB("resumes")) || "[]";
  const resumes = JSON.parse(resumeData);
  return resumes.find((resume: any) => resume.resumeId === resumeId) || null;
};

const useFetchResume = (resumeId: string) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResumeData = async () => {
      try {
        // Coba ambil dari server terlebih dahulu
        setLoading(true);
        const resumeData = await fetchResume(resumeId);

        if (resumeData) {
          // Parse data dari fetchResume (langsung satu objek)
          const resume = JSON.parse(resumeData);
          setFormData(resume);
        } else {
          // Jika offline atau fetch gagal, ambil dari IndexedDB
          const offlineResume = await getResumeByIdFromDB(resumeId);
          if (offlineResume) {
            setFormData(offlineResume);
          } else {
            console.error(
              "Resume tidak ditemukan di IndexedDB untuk resumeId:",
              resumeId
            );
          }
        }
      } catch (error) {
        console.error("Error fetching resume:", error);

        // Fallback ke IndexedDB jika ada error
        const offlineResume = await getResumeByIdFromDB(resumeId);
        if (offlineResume) {
          setFormData(offlineResume);
        } else {
          console.error(
            "Resume tidak ditemukan di IndexedDB untuk resumeId:",
            resumeId
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadResumeData();
  }, [resumeId]);

  return { formData, setFormData, loading };
};

export default useFetchResume;
