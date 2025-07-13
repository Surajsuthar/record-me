import { acceptInvitation } from "@/actions/user";
import { redirect } from "next/navigation";

type Prop = {
    params: {
        inviteid: string
    }
}

export default async function  InvitePage({ params: { inviteid } }: Prop) {
  const invite = await acceptInvitation(inviteid)

  if(invite.status === 404) {
    return redirect('/auth/sign-in')
  }

  if(invite.status === 401) {
    return (
      <div className="h-screen flex flex-col container gap-y-2 justify-center items-center">
        <h2 className="text-2xl font-bold">You are not authorized to access this page</h2>
      </div>
    )
  }

  if(invite.status === 200) {
    return redirect('/auth/callback')
  }
}