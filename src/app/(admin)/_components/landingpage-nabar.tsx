import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const LandingPageNavBar = () => {
  return (
    <div className="fixed top-0 left-0 h-16 right-0 flex w-full mx-auto justify-between items-center">
      <div className="flex w-3/4 p-6 z-50 mx-auto h-10 rounded-md border border-border bg-background/50 backdrop-blur-sm my-auto justify-between items-center gap-x-10">
        <div className="flex items-center justify-center gap-x-10">
          <h1 className="text-xl text-foreground font-bold">Record Me</h1>
        </div>
        <div className="flex text-sm font-medium items-center justify-center gap-x-10">
          <Link href="/" className="hover:text-primary transition-all duration-300">Home</Link>
          <Link href="/pricing" className="hover:text-primary transition-all duration-300">Pricing</Link>
          <Link href="/contact" className="hover:text-primary transition-all duration-300">Contact</Link>
          <Link href="/auth/sign-in" className="hover:text-primary transition-all duration-300">
            <Button variant={"outline"}>
              <User />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
