import { SignIn } from "./SignIn";

interface VerifyProps {
  searchParams?: {
    token?: string;
  };
}

export default function Verify({ searchParams }: VerifyProps) {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="mx-auto flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-8 shadow-xl lg:w-96">
            <p className="text-center">{!searchParams.token ? "No Token provided" : "Verifying..."}</p>
          </div>
        </div>
      </div>
      <SignIn token={searchParams.token} />
    </>
  );
}
