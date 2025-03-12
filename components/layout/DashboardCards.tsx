"use client";

import AddResume from "@/components/common/AddResume";
import ResumeCard from "@/components/common/ResumeCard";
import { fetchUserResumes } from "@/lib/actions/resume.actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getFromDB, saveToDB } from "@/lib/indexedDB";

const DashboardCards = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const clerkUserId = user?.id;
  const [resumeList, setResumeList] = useState<any[] | null>(null);
  const [storedUserId, setStoredUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeUserId = async () => {
      if (isSignedIn && clerkUserId) {
        await saveToDB("userId", clerkUserId);
        setStoredUserId(clerkUserId);
      } else if (!navigator.onLine) {
        const cachedUserId = await getFromDB("userId");
        if (cachedUserId) {
          setStoredUserId(cachedUserId);
        }
      }
    };
    initializeUserId();
  }, [isSignedIn, clerkUserId]);

  const loadResumeData = async () => {
    try {
      const userIdToUse = storedUserId || clerkUserId || "";
      let resumeData: string;

      if (!navigator.onLine) {
        resumeData = (await getFromDB(`resumes`)) || "[]";
        setResumeList(JSON.parse(resumeData));
        return;
      }

      resumeData = await fetchUserResumes(userIdToUse);
      const parsedResumes = JSON.parse(resumeData);
      setResumeList(parsedResumes);

      if (navigator.onLine) {
        await saveToDB(`resumes`, resumeData);
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  useEffect(() => {
    if ((isSignedIn || storedUserId) && isLoaded) {
      loadResumeData();
    }
  }, [isLoaded, storedUserId, isSignedIn, clerkUserId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
      <AddResume userId={storedUserId || clerkUserId || ""} />
      {resumeList !== null
        ? resumeList.map((resume: any) => (
            <ResumeCard
              key={resume.resumeId}
              resume={JSON.stringify(resume)}
              refreshResumes={loadResumeData} // Gunakan langsung tanpa arrow function
            />
          ))
        : [1, 2, 3].map((index) => (
            <ResumeCard
              key={index}
              resume={null}
              refreshResumes={loadResumeData} // Gunakan langsung tanpa arrow function
            />
          ))}
    </div>
  );
};

export default DashboardCards;
