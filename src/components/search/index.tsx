import { useMutationData } from "@/hooks/useMutationData";
import { useSearch } from "@/hooks/useSearch";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Loader } from "../loader";

interface Props {
  workspaceId: string;
}

export const Search = ({ workspaceId }: Props) => {
  const { onSearchQuery, query, isFetching, onUsers } = useSearch(
    "get-users",
    "USERS",
  );

  // sennfing invitation
  // invite button in ui
  // const { mutate, isPending } = useMutationData(
  //     ['invite-member'],
  //     (data: { recieverId: string, email: string}) => {

  //     }
  // )
  return (
    <div className="flex flex-col gap-y-5">
      <Input
        onChange={onSearchQuery}
        value={query}
        className="bg-transparent border-2 outline-none"
        placeholder="Search for your user..."
        type="text"
      />
      {isFetching ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      ) : !onUsers ? (
        <p className="text-center text-sm text-[#a4a4a4]"> No user found </p>
      ) : (
        <div>
          {onUsers.map((user) => (
            <div
              key={user.id}
              className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h3 className="font-bold text-lg capitalize">
                  {user.firstname} {user.lastname}
                </h3>
                <p className=" lowercase text-sm bg-black px-2 rounded-lg text-white">
                  {user.subscription.plan}
                </p>
              </div>
              <div className="flex-1 flex justify-end items-end">
                <Button
                  onClick={() => {}}
                  variant="default"
                  className="w-5/12 font-bold"
                >
                  <Loader state={false} color="#000">
                    Invite
                  </Loader>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
