import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import { SidebarProvider } from "./SidebarContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
return (
    <SidebarProvider>
      <div className="h-screen flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:pl-64">
          {/* Header */}
          <Header />

          {/* Scrollable content */}
          <main className="mt-14 overflow-y-auto flex-1 p-4 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );



    // return (
    //     <div className="">
    //         <div className="fixed left-0 top-0 text-left">
    //             <Sidebar />
    //             <div className="fixed max-w-230 right-20 top-5">
    //                 <Header />
    //                 <div className="">
    //                     {children}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}
