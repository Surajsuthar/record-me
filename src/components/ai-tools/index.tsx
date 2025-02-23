import { Loader } from "../loader";
import { Button } from "../ui/button";
import { TabsContent } from "../ui/tabs";

interface Props {
  plan: "PRO" | "FREE";
  trail: boolean;
  videoId: string;
}

export const AiTools = ({ plan, trail, videoId }: Props) => {
  // WIP :  ai hooks

  return (
    <TabsContent
      value="Ai tools"
      className="p-5 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-10"
    >
      {" "}
      <div className="flex items-center">
        <div className="w-8/12">
          <h2 className="text-3xl font-bold">Ai Tools</h2>
          <p className="text-[#bdbdbd]">
            Taking your videos to next <br /> step with help of ai
          </p>
        </div>
        {plan === "FREE" ? (
          !trail ? (
            <Button className="w-4/12 mt-2 text-sm">
              <Loader state={false} color="#000">
                Try Now
              </Loader>
            </Button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </TabsContent>
  );
};
