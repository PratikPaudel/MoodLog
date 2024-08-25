"use client";
import { useEffect, useState } from "react";
import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";

const opensans = Open_Sans({ subsets: ["latin"] });
const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

// export const metadata = {
//     title: "MoodLog",
//     description: "Monitor and reflect on your daily mood throughout the entire year!",
// };

export default function RootLayout({ children }) {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // Initialize theme based on localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkTheme(savedTheme === "dark");
            document.documentElement.classList.add(savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setIsDarkTheme(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkTheme(false);
            document.documentElement.classList.add("light");
        }
    }, []);

    // Toggle theme between light and dark
    const toggleTheme = () => {
        const newTheme = isDarkTheme ? "light" : "dark";
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.classList.remove(isDarkTheme ? "dark" : "light");
        document.documentElement.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const header = (
        <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
            <Link href="/">
                <h1 className={`text-base sm:text-lg textGradient ${roboto.className}`}>MoodLog</h1>
            </Link>
            <button onClick={toggleTheme} className="text-sm sm:text-base">
                {isDarkTheme ? (
                    <i className="fa-solid fa-sun text-yellow-400"></i> // Light Mode Icon
                ) : (
                    <i className="fa-solid fa-moon text-blue-500"></i> // Dark Mode Icon
                )}
            </button>
            <Logout/>
        </header>

    );

    const footer = (
        <footer className="p-4 sm:p-8 grid place-items-center">
            <p className={`text-indigo-500 duration-200 hover:text-white hover:bg-indigo-500 ${roboto.className}`}>
                Built by Pratik 💛
            </p>
        </footer>
    );

    return (
        <html lang="en">
        <Head/>
        <AuthProvider>
            <body
                className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col ${
                    isDarkTheme ? "text-slate-100 bg-grey-900" : "text-slate-800 bg-white"
                } ${opensans.className}`}
            >
            {header}
            {children}
            {footer}
            </body>
        </AuthProvider>
        </html>
    );
}
