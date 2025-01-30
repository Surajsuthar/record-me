import { onAuthenticateUse } from "@/actions/user"
import { redirect } from "next/navigation"

export default async function AuthCallBackPage() {
    const auth = await onAuthenticateUse()
    console.log("auth",auth)
    if(auth.status === 200 || auth.status === 201 ) {
        return redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }

    if(auth.status == 400 || auth.status == 500 ) {
        return redirect("/auth/sign-in")
    }
}