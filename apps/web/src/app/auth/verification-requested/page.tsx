import { Logo } from "@/app/Logo";
import { RequestVerificationEmail } from "./RequestVerificationEmail";

interface SignInProps {
  searchParams?: {
    email?: string;
  };
}

export default function SignIn({ searchParams }: SignInProps) {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="mx-auto flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-8 shadow-xl lg:w-96">
            <div>
              <Logo className="fill-zinc-900 px-16" />
            </div>
            <div className="mt-8">
              {searchParams.email ? (
                <>
                  <h1 className="leading-2 mb-4 text-center font-bold">Please verify your email address</h1>
                  <p className="text-center">
                    We have sent you an email to the address{" "}
                    <span className="italic">{searchParams.email}</span>. Please click the link in the email
                    to activate your account.
                  </p>
                  <hr className="my-4" />
                  <p className="text-center text-xs">
                    You didn&apos;t receive an email or your link expired?
                    <br />
                    Click the button below to request a new email.
                  </p>
                  <div className="mt-5">
                    <RequestVerificationEmail email={searchParams.email} />
                  </div>
                </>
              ) : (
                <p className="text-center">No E-Mail Address provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
