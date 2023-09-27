import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div
      className="flex justify-center 
  items-center mt-[25%] ml-[0%] md:ml-[50%] flex-col gap-6"
    >
      <Image src="/logo.png" alt="logo" width={200} height={100} />
      <button className=" text-white" onClick={() => signIn()}>
        <Image src="/google.png" alt="google" width={300} height={300} />
      </button>
    </div>
  );
};

export default Login;
