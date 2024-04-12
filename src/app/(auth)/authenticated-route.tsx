"use client";
import { usePathname } from "next/navigation";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
};

export default function AuthenticatedRoute({
  children,
}: AuthenticatedRouteProps) {
  // const { isAuthenticating, user } = useAuth();
  const pathname = usePathname();
  // const { push } = useRouter();

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify-email"
  ) {
    return <>{children}</>;
  }

  // if (isAuthenticating) {
  //   return <Loading />;
  // }

  // if (!user) {
  //   push("/login");
  //   return;
  // }

  // if (user.emailVerified === false) {
  //   push("/verify-email");
  //   return;
  // }

  return <>{children}</>;
}
