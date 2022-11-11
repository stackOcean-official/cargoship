"use client";

import { Button } from "@cargoship/ui";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { signIn } from "next-auth/react";

export const SigninForm = ({ callbackUrl, error }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      callbackUrl: callbackUrl || "/projects",
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    });
  };

  return (
    <>
      {error && (
        <div className="absolute top-10 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">An error occurred when logging you in</h3>
              <div className="mt-2 text-sm text-red-700">
                <p className="space-y-1 whitespace-pre-wrap">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        method="post"
        action="/api/auth/callback/credentials"
        className="space-y-6">
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
              autoComplete="current-password"
              required
              className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full justify-center">
            Sign in
          </Button>
        </div>
      </form>
    </>
  );
};
