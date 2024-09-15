"use client"

import Navbar from "../components/Navbar";
import Image from "next/image";
import Overview from "./overview";
import Dashboard from "./dashboard";
import { useState } from "react";

export default function Page() {
    const [page, setPage] = useState("overview");

    const buttonStyle = (currentPage: "overview" | "dashboard") =>
        page === currentPage ? "bg-[#29292970]" : "bg-[#29292920]";

    return (
        <>
            <Navbar />
            <div className="flex flex-col mt-4 gap-5 mx-auto w-[90vw] h-3/4 ">
                <div className="pages-container">
                    <div className={`page-button ${buttonStyle("overview")}`} onClick={() => setPage("overview")}>
                        <Image src="/overview.svg" alt="overview" width={30} height={30}></Image>
                        <span className="text-lg">Overview</span>
                    </div>
                    <div className={`page-button ${buttonStyle("dashboard")}`} onClick={() => setPage("dashboard")}>
                        <Image src="/dashboard.svg" alt="dashboard" width={20} height={20}></Image>
                        <span className="text-lg">Dashboard</span>
                    </div>
                </div>

                {/* Overview */}
                {page === "overview" &&
                    <Overview />
                }

                {/* Dashboard */}
                {page === "dashboard" &&
                    <Dashboard />
                }

            </div>

        </>
    ); 
}