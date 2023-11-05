import React, { useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import Storage from "../../components/Storage/Storage";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (screen.width > 1042) {
      router.push("/");
    }
  }, []);
  return (
    <AppLayout>
      <div className={"p-5"}>
        <div className="pb-8">
          <BiArrowBack
            className="mr-4 text-gray-800 cursor-pointer text-2xl"
            onClick={() => router.back()}
          />
        </div>
        <Storage />
      </div>
    </AppLayout>
  );
};

export default Home;
