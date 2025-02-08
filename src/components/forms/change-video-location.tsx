import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface Props {
  videoId: string;
  currentFolder?: string;
  currentFolderName?: string;
  currenWorkspace?: string;
}

export const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentFolderName,
  currenWorkspace,
}: Props) => {
  return (
    <form className="flex flex-col gap-y-5">
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
        <p className="text-[#a4a4a4]">Workspace</p>
        <p className="text-[#a4a4a4] text-sm"> Suraj </p>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 border-[1px] rounded-xl">
        <h2 className="text-sm text-[#a4a4a4]">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-sm">Workspace</p>
          <select className=" rounded-xl text-base bg-transparent">
            <option className="text-[#a4a4a4]" value={"somwthin"}>
              worksapce
            </option>
          </select>
        </Label>
      </div>
    </form>
  );
};
