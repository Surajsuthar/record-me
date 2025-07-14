import { useSubscription } from "@/hooks/useSubscripation"
import { Loader } from "../loader"
import { Button } from "../ui/button"

export const PaymentButton = () => {
    const { isProcessing, onSubscribe } = useSubscription()
    return (
        <Button
        className="text-sm w-full"
        onClick={onSubscribe}
        >
            <Loader
            state={isProcessing}
            color="#000"
            >
                Upgrade
            </Loader>
        </Button>
    )
}