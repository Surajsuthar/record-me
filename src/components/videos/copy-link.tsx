import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface Props {
  videoId: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secenodry"
    | "ghost"
    | "link"
    | null;
}

export const CopyLink = ({ videoId, className, variant }: Props) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`,
    );
  };

  toast("Copied", {
    description: "Link successflly copied",
  });
  return (
    <Button variant={variant} onClick={copyToClipboard} className={className}>
      <Link size={20} className="text-[#a4a4a4]" />
    </Button>
  );
};
