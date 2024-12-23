import { auth, signOut } from "@/auth";
// import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) redirect("/auth/login");
  console.log(session);
  return (
    <div className="p-16">
      <h1>Dashboard Page</h1>
      <h3>{session?.user?.email}</h3>
      {/* <LogoutButton /> */}
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/auth/login",
          });
        }}
      >
        <Button type="submit" className="mt-3" variant={"destructive"}>
          Logout
        </Button>
      </form>
    </div>
  );
};

export default DashboardPage;
