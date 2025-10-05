"use client";

import React, { useEffect, useState } from "react";
import ResumeView from "@/components/layout/ResumeView";
import { checkResumeOwnership } from "@/lib/actions/resume.actions";
import { getFromDB } from "@/lib/indexedDB";

interface ClientResumeProps {
  params: { id: string };
  serverUserId: any;
}

const ClientResume = ({ params, serverUserId }: ClientResumeProps) => {
  const [userId, setUserId] = useState<any>(serverUserId);
  const [isResumeOwner, setIsResumeOwner] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserFromIndexedDB = async () => {
      if (!serverUserId) {
        const userId = await getFromDB("userId");
        setUserId(userId);
      }
    };

    fetchUserFromIndexedDB();
  }, [serverUserId]);

  useEffect(() => {
    if (userId) {
      checkResumeOwnership(userId, params.id).then(setIsResumeOwner);
    }
  }, [userId, params.id]);

  return (
    <>
      <ResumeView isOwnerView={isResumeOwner} />
    </>
  );
};

export default ClientResume;
