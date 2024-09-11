import { getServerSession } from "next-auth/next";
import Child from "./child";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Router } from "lucide-react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user?.name && session?.user?.image) {
    redirect("/Dashboard");
  }

  return (
    <div>
      <Child />
    </div>
  );
}
