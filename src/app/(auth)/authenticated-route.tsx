type AuthenticatedRouteProps = {
  children: React.ReactNode;
};

export default function AuthenticatedRoute({
  children,
}: AuthenticatedRouteProps) {
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
