import React from "react";

export default function Layout({
    children
}: { children: React.ReactNode }) {
    return (
        <div className="container h-screen flex justify-center">
            
            {children}
        </div>
    )
}