import { getServerSession } from "next-auth/next";
import Child from "./child";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PrintComponent from "@/components/PrintForm";
import PrintComponentPages from "@/components/PrintForm2";
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user?.name && session?.user?.image) {
    redirect("/");
  }

  return (
    <div>
      <Child />
      {/* <PrintComponentPages /> */}
      {/* <PrintComponent /> */}
    </div>
  );
}
