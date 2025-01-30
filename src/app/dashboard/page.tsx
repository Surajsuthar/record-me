import { onAuthenticateUse } from "@/actions/user"
import { redirect } from "next/navigation"

export default async function DashBoard() {
    const auth = await onAuthenticateUse()

    if(auth.status === 200 || auth.status === 201 ) {
        return redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }

    if(auth.status == 400 || auth.status == 500 ) {
        return redirect("/auth/sign-in")
    }
    return <div>

    </div>
}