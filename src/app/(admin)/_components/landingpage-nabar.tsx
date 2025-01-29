import { Button } from "@/components/ui/button"
import { Menu, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const LandingPageNavBar = () => {
    return (
        <div className="flex w-full justify-between items-center">
            <div className="text-3xl font-semibold flex items-center gap-x-3">
                <Menu className="w-8 h-8"/>
                <Image
                alt="not-fount"
                src="logo.svg"
                height={40}
                width={40}
                />
                Record Me
            </div>
            <div className="hidden gap-x-10 items-center lg:flex">
                <Link 
                href="/"
                className="py-2 px-5 font-semibold text-lg hover:bg-muted"
                >Home</Link>
                <Link
                href="/pricing"
                >
                Pricing
                </Link>
                <Link
                href="/contact"
                >
                Contact
                </Link>
            </div>
            <Link
            href="/auth/sign-in"
            >
            <Button className="text-base flex gap-x-2">
                <User fill="#000"/>
                Login
            </Button>
            </Link>
        </div>
    )
}