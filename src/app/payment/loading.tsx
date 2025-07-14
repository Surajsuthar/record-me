import { Spinner } from "@/components/loader/spinner";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Spinner/>
        </div>
    )
}