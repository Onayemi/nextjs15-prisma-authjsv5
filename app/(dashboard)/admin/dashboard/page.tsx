import { auth, signOut } from "@/auth";
import { Stats3 } from "@/components/stats3";
// import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) redirect("/auth/login");
  console.log("client log", session);
  return (
    <div className="mx-[30px] md:mx-[10px] pt-16 md:mt-[10px]">
      <Stats3 />
      <div className="mx-[30px] my-5">
        <h1>Dashboard Page</h1>
        <h3>{session?.user?.email}</h3>
        <h3>User Role: {session?.user?.role}</h3>
        <h3>User Name: {session?.user?.name}</h3>
        <h3>Phone Number: {session?.user?.phone}</h3>
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
      {/* <LogoutButton /> */}
    </div>
  );
};

export default DashboardPage;
