import { Logo } from "@/app/Logo";
import { Button } from "@cargoship/ui";

export default function SignupWithoutVerificationSuccess() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="mx-auto flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-8 shadow-xl lg:w-96">
            <div>
              <Logo className="fill-zinc-900 px-16" />
            </div>

            <div className="mt-8">
              <h1 className="leading-2 mb-4 text-center font-bold">User successfully created</h1>
              <p className="text-center">
                Your new user has been created successfully. Please click the button below and sign in to your
                account.
              </p>
              <hr className="my-4" />
              <Button href="/" className="w-full justify-center">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
