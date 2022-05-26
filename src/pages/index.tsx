import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "../libs/axios";
import { databaseId, notion } from "../libs/notion";

const Home: NextPage<any> = ({ props }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main>
        <h1>Next template</h1>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const responseA = await notion.databases.retrieve({
    database_id: databaseId || "",
  });

  return {
    props: {
      response: responseA.properties,
    },
  };
};

export default Home;
