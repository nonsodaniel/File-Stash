import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="text-2xl font-bold text-blue-500 tracking-wide" href="/">
      File <span className="text-yellow-500">Stash</span>
    </Link>
  );
};

export default Logo;
