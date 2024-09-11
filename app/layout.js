import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "@/styles/globals.css";
import HeaderBar from "@/components/HeaderBar";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Login from "./login/page";
import { Toaster } from "react-hot-toast";
import ReduxLayout from "./ReduxLayout";
import "react-responsive-modal/styles.css";
import IdleLogout from "./IdeLogout";
import ClientLayout from "./ClientLayout";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  preload: false,
  variable: "--font-inter",
});

const arabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  preload: false,
  variable: "--font-arabic",
});

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${arabic.variable} overflow-auto`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextTopLoader color="#113493" height={4} showSpinner={true} />
        <ClientLayout session={session}>
          <Toaster position="top-right" />
          <ReduxLayout>
            {session?.user?.name ? (
              <div className="flex h-screen font-inter">
                <Sidebar session={session} />

                <div className="flex flex-col w-full">
                  <HeaderBar />
                  <div className="flex-grow px-3 overflow-auto">{children}</div>
                </div>
              </div>
            ) : (
              <div className="overflow-auto w-full h-full flex justify-center items-center">
                <Login />
              </div>
            )}
          </ReduxLayout>
        </ClientLayout>
      </body>
    </html>
  );
}
