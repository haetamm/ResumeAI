import { useToast } from "@/components/ui/use-toast";

export const useCheckOffline = () => {
  const { toast } = useToast();

  const checkOffline = (message?: string) => {
    if (typeof window !== "undefined" && !navigator.onLine) {
      toast({
        title: "Disconnected",
        description: `You are offline. Please connect to the internet ${
          message || ""
        } .`,
        variant: "destructive",
        className: "bg-white",
      });
      return true;
    }
    return false;
  };

  return { checkOffline };
};
