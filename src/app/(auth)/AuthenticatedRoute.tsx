import Loading from "@/components/loading";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type AuthenticatedRouteProps = {
  children: ReactNode;
};

export default function AuthenticatedRoute({
  children,
}: AuthenticatedRouteProps) {
  const { isAuthenticating, user } = useAuth();
  const { push } = useRouter();

  if (isAuthenticating) {
    return <Loading />;
  }

  if (!user) {
    push("/login");
  }

  return <>{children}</>;
}
