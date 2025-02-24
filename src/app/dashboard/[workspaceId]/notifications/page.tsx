import { getNotifications } from "@/actions/user";
import { Avatar } from "@/components/ui/avatar";
import { useQueryData } from "@/hooks/useQueryData";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

const Notification = () => {
  const { data: notifications } = useQueryData(
    ["user-notification"],
    getNotifications,
  );

  const { data: notification, status } = notifications as {
    status: number;
    data: {
      notification: {
        id: string;
        userId: string;
        content: string;
      }[];
    };
  };

  if (status !== 200) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>No notification</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {notification.notification.map((item) => (
        <div
          key={item.id}
          className=" border-2 flex gap-x-2 items-center  rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
