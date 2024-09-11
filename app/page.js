import Header from "@/components/header";
import Sidebar from "../components/sidebar";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Login from "./login/page";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { redirect } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  preload: false,
  variable: "--font-inter",
});
export default async function App({ Component, pageProps }) {
  const session = await getServerSession(authOptions);

  return (
    <div className={`flex h-screen ${inter.variable}`}>
      {/* {session?.user?.name ? (
        <>{Component} </>
      ) : (
        <div className="overflow-auto w-full h-full flex justify-center items-center">
          <Login />
        </div>
      )} */}
    </div>
  );
}
