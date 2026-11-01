import { getCurrentUser } from "@/lib/current-user";
import { SiteNav } from "@/components/layout/site-nav";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <SiteNav
      user={user ? { name: user.name, email: user.email } : null}
    />
  );
}