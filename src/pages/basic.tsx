import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const basic: NextPage = () => {
  return (
    <div>
      <Link href="/">
        <a>戻る</a>
      </Link>
      <h1>basic</h1>
    </div>
  );
};

export default basic;
