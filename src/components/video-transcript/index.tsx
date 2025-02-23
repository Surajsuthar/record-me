import { TabsContent } from "../ui/tabs";

interface Props {
  transcript: string | null;
}

export const VideoTranscript = ({ transcript }: Props) => {
  return (
    <TabsContent
      value="Transcript"
      className="p-5 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-10"
    >
      <p className="text-[#a7a7a7]">{transcript}</p>
    </TabsContent>
  );
};
