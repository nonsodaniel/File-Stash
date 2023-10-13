import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Storage from "../../components/Storage/Storage";

const Home = () => {
  return (
    <AppLayout>
      <div className={"p-5"}>
        <Storage />
      </div>
    </AppLayout>
  );
};

export default Home;
