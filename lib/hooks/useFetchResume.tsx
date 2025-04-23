import { useEffect, useState, useRef } from "react";
import { fetchResume } from "../actions/resume.actions";
import { getFromDB } from "../indexedDB";

const getResumeByIdFromDB = async (resumeId: string) => {
  const resumeData = (await getFromDB("resumes")) || "[]";
  const resumes = JSON.parse(resumeData);
  return resumes.find((resume: any) => resume.resumeId === resumeId) || null;
};

const useFetchResume = (resumeId: string) => {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  const loadResumeData = async () => {
    try {
      setLoading(true);

      const offlineResume = await getResumeByIdFromDB(resumeId);
      if (offlineResume && isMountedRef.current) {
        setFormData(offlineResume);
      }

      const resumeData = await fetchResume(resumeId);
      if (resumeData && isMountedRef.current) {
        const resume = JSON.parse(resumeData);
        setFormData(resume);
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;

    loadResumeData();

    return () => {
      isMountedRef.current = false;
    };
  }, [resumeId]);

  return { formData, setFormData, loading, loadResumeData };
};

export default useFetchResume;
