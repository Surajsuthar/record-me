import { Spinner } from "@/components/loader/spinner";

export default function AuthLoading() {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Spinner/>
        </div>
    )
}