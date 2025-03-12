import ClientResume from "@/components/layout/my-resume/ClientResume";
import { fetchResume } from "@/lib/actions/resume.actions";
import { FormProvider } from "@/lib/context/FormProvider";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await fetchResume(params.id);
  const resume = JSON.parse(data || "{}");

  if (!resume?.firstName && !resume?.lastName) {
    return {
      title: "ResumeAI - Professional AI Resume Builder",
      description:
        "Generate a polished, professional resume in just a few clicks with our AI-powered resume builder.",
    };
  }

  return {
    title: `${resume.firstName ?? ""} ${resume.lastName ?? ""} - ResumeAI`,
    description: `${resume.firstName ?? ""} ${
      resume.lastName ?? ""
    }'s Resume. Powered by ResumeAI.`,
  };
}

const MyResume = async ({ params }: { params: { id: string } }) => {
  let userId = null;

  try {
    const user = await currentUser();
    userId = user ? JSON.parse(JSON.stringify(user.id)) : null;
  } catch (error) {
    console.warn("Failed to fetch current user. Offline mode?", error);
  }

  return (
    <>
      <FormProvider params={params}>
        <ClientResume params={params} serverUserId={userId} />;
      </FormProvider>
    </>
  );
};

export default MyResume;
