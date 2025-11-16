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

  const fullName = `${resume.firstName ?? ""} ${resume.lastName ?? ""}`.trim();
  const defaultTitle = "ResumeAI - Professional AI Resume Builder";
  const defaultDescription =
    "Generate a polished, professional resume in just a few clicks with our AI-powered resume builder.";

  const title = fullName ? `${fullName} - ResumeAI` : defaultTitle;
  const description = fullName
    ? `${fullName}'s Resume. Powered by ResumeAI.`
    : defaultDescription;

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/my-resume/${params.id}/view`;

  const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/img/og-image.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "ResumeAI",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${fullName}'s Resume Preview`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    // === Twitter / X ===
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@ResumeAI",
    },
    icons: {
      icon: "/icons/favicon.ico",
    },
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