// components/ClientLayout.js
"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import IdleLogout from "./IdeLogout";
import ReduxLayout from "./ReduxLayout";

export default function ClientLayout({ children, session }) {
    return (
        <SessionProvider session={session}>
            <IdleLogout />
            <Toaster position="top-right" />
            <ReduxLayout>{children}</ReduxLayout>
        </SessionProvider>
    );
}
