import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log({ session });
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full text-center">
        <a className="text-2xl font-bold text-blue-500 tracking-wide" href="#">
          File <span className="text-yellow-500">Stash</span>
        </a>
      </div>
      <button className="text-white" onClick={() => signIn()}>
        <Image src="/google.png" alt="google" width={300} height={300} />
      </button>
    </div>
  );
};

export default Login;
