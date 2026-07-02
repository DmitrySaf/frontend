import { redirect } from "next/navigation";
import { createServerClient } from "@/api/server-client";

export default async function Home() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  redirect("/communities");
}
