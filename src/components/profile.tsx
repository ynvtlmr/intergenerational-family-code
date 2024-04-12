"use client";

import { User } from "@supabase/supabase-js";

import { signout } from "@/app/(auth)/actions";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Profile({ user }: { user: User | null }) {
  return (
    <>
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <span>{user.email}</span>
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={async () => await signout()}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">
          <Link className="w-full cursor-pointer" href="/login">
            <Button variant="secondary" className="w-full">
              Login
            </Button>
          </Link>
          <Link className="w-full cursor-pointer" href="/signup">
            <Button variant="secondary" className="w-full">
              Signup
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
