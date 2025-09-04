import { getUserProfile } from "@/app/auth/actions";
import { NavbarClient } from "./NavbarClient";

export default async function Navbar() {
  const { user } = await getUserProfile();

  return <NavbarClient user={user} />;
}
