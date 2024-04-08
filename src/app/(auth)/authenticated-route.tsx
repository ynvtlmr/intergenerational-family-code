"use client";
import Loading from "@/components/loading";
import { useAuth } from "@/components/providers/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

type AuthenticatedRouteProps = {
  children: ReactNode;
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
