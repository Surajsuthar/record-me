import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
  description: string;
  id: string;
  source: string;
  title: string;
}

export const RichLink = ({ description, id, source, title }: Props) => {
  const copyRichText = () => {
    const orignalTitle = title;
    const thumbnail = `<a style="display: flex; flex-direction: column; gap: 10px" href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}">
            <h3 style="text-decoration: none; color: black; margin: 0;">${orignalTitle}</h3>
                <p style="text-decoration: none; color: black; margin: 0;">${description}</p>
                 <video
                width="320"
                style="display: block"
                >
                    <source
                        type="video/webm"
                        src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}"
                    />
                </video>
            </a>`;

    const thumbnailBlob = new Blob([thumbnail], { type: "text/html" });
    const blobTitle = new Blob([orignalTitle], { type: "text/plain" });
    const data = [
      new ClipboardItem({
        ["text/plain"]: blobTitle,
        ["text/html"]: thumbnailBlob,
      }),
    ];

    navigator.clipboard.write(data).then(() => {
      return toast("Emabbeded Link Clipboard", {
        description: "Successfully copied embedded link",
      });
    });
  };

  return (
    <Button onClick={copyRichText} className=" rounded-full">
      Get Embedded Code
    </Button>
  );
};
