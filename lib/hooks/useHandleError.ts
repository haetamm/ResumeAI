import { useToast } from "@/components/ui/use-toast";

export const useHandleError = () => {
  const { toast } = useToast();

  const handleError = (error: any, customMessage?: string) => {
    console.error("Error: ", error);

    toast({
      title: "Uh Oh! Something went wrong.",
      description:
        customMessage ||
        error?.message ||
        "An unexpected error occurred. Please try again.",
      variant: "destructive",
      className: "bg-white",
    });
  };

  return { handleError };
};
