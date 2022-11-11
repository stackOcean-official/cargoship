"use client";

import { createUser } from "@/lib/users";
import { Button } from "@cargoship/ui";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(
        e.target.elements.firstname.value,
        e.target.elements.lastname.value,
        e.target.elements.email.value,
        e.target.elements.password.value
      );
      const url =
        process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_DISABLED === "1"
          ? `/auth/signup-without-verification-success`
          : `/auth/verification-requested?email=${encodeURIComponent(e.target.elements.email.value)}`;

      router.push(url);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      {error && (
        <div className="absolute top-10 rounded-md bg-sky-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-sky-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-sky-800">An error occurred when logging you in</h3>
              <div className="mt-2 text-sm text-sky-700">
                <p className="space-y-1 whitespace-pre-wrap">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstname" className="text-ui-gray-dark block text-sm font-medium">
            First name
          </label>
          <div className="mt-1">
            <input
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="given-name"
              required
              className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="lastname" className="text-ui-gray-dark block text-sm font-medium">
            Last name
          </label>
          <div className="mt-1">
            <input
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="family-name"
              required
              className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="text-ui-gray-dark block text-sm font-medium">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="text-ui-gray-dark block text-sm font-medium">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full justify-center">
            Sign up
          </Button>

          <div className="mt-3 text-center text-xs text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-sky hover:text-sky-600">
              Log in.
            </Link>
          </div>
          {(process.env.NEXT_PUBLIC_TERMS_URL || process.env.NEXT_PUBLIC_PRIVACY_URL) && (
            <div className="mt-3 text-center text-xs text-gray-400">
              By clicking &quot;Sign Up&quot;, you agree to our
              <br />
              {process.env.NEXT_PUBLIC_TERMS_URL && (
                <a
                  className="text-sky hover:text-sky-600"
                  href={process.env.NEXT_PUBLIC_TERMS_URL}
                  rel="noreferrer"
                  target="_blank">
                  terms of service
                </a>
              )}
              {process.env.NEXT_PUBLIC_TERMS_URL && process.env.NEXT_PUBLIC_PRIVACY_URL && <span> and </span>}
              {process.env.NEXT_PUBLIC_PRIVACY_URL && (
                <a
                  className="text-sky hover:text-sky-600"
                  href={process.env.NEXT_PUBLIC_PRIVACY_URL}
                  rel="noreferrer"
                  target="_blank">
                  privacy policy
                </a>
              )}
              .<br />
              We&apos;ll occasionally send you account related emails.
            </div>
          )}
        </div>
      </form>
    </>
  );
};
