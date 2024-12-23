import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) redirect("/auth/login");
  console.log(session);
  return (
    <div className="p-16">
      <h1>Dashboard Page</h1>
      <h3>{session?.user?.email}</h3>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
