import { Logo } from "@/app/Logo";

import Link from "next/link";
import { SigninForm } from "./SigninForm";

interface SignInPageProps {
  searchParams?: {
    callbackUrl?: string;
    error?: string;
  };
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <>
      <div className="bg-ui-gray-light flex min-h-screen">
        <div className="mx-auto flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-8 shadow-xl lg:w-96">
            <div>
              <Logo className="fill-zinc-900 px-16" />
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <SigninForm callbackUrl={searchParams.callbackUrl} error={searchParams.error} />
              </div>
              <div>
                {process.env.NEXT_PUBLIC_PASSWORD_RESET_DISABLED !== "1" && (
                  <div>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sky mt-3 grid grid-cols-1 space-y-2 text-center text-xs hover:text-sky-600">
                      Forgot your password?
                    </Link>
                  </div>
                )}

                {process.env.NEXT_PUBLIC_SIGNUP_DISABLED !== "1" && (
                  <div>
                    <Link
                      href="/auth/signup"
                      className="text-sky mt-3 grid grid-cols-1 space-y-2 text-center text-xs hover:text-sky-600">
                      Create an account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
