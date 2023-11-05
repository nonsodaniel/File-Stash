import React, { useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import Storage from "../../components/Storage/Storage";
import { useRouter } from "next/router";

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
        <Storage />
      </div>
    </AppLayout>
  );
};

export default Home;
