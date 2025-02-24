import { enableFirstView, getFirstView } from "@/actions/user";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [firstView, setfirstView] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    if (firstView !== undefined) return;
    const fetchData = async () => {
      const response = await getFirstView();
      if (response.status === 200) setfirstView(response.data);
    };
    fetchData();
  }, [firstView]);

  const switchState = async (state: boolean) => {
    const view = await enableFirstView(state);
    if (view) {
      toast(view.status === 200 ? "success" : "Failed", {
        description: view.data,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Video Sharing Setting</h2>
      <p className=" text-muted-foreground">
        Enabling this feature will send you notification when someone watched
        your video for first time. This feature can help you to
      </p>
      <Label className="flex items-center gap-x-3 mt-4 text-md">
        Enable Frist View
        <Switch
          onCheckedChange={switchState}
          disabled={firstView === undefined}
          checked={firstView}
          onClick={() => setfirstView(!firstView)}
        />
      </Label>
    </div>
  );
};

export default Settings;
