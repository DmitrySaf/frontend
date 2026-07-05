import { createServerClient } from "@/api/server-client";
import { redirect } from "next/navigation";

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
