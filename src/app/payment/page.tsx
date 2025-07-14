import { comeleteSubsripation } from "@/actions/user"
import { redirect } from "next/navigation"

type Props = {
    searchParams: {
        session_id: string
        cancel: string
    }
}

export default async function  Payment({ searchParams }: Props) {
    const { session_id, cancel } = searchParams

    if(session_id) {
        const coustomer = await comeleteSubsripation(session_id)
        if(coustomer.status === 200) {
            return redirect('auth/callback')
        }
    }

    if(cancel) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Payment Failed</h1>
                <p className="text-sm text-gray-500">
                    Please try again or contact support if the problem persists.
                </p>
            </div>
        )
    }
    
}