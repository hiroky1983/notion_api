import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "../libs/axios";
import { databaseId, notion } from "../libs/notion";

type Props = {
  response: QueryDatabaseResponse;
};

const Home: NextPage<Props> = (props) => {
  console.log(props.response);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main>
        <h1>Next template</h1>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const responseA = await notion.databases.query({
    database_id: databaseId || "",
    filter: {
      or: [
        {
          property: "ジャンル",
          multi_select: {
            contains: "日常会話",
          },
        },
      ],
    },
    sorts: [
      {
        property: "ジャンル",
        direction: "ascending",
      },
    ],
  });

  return {
    props: {
      response: responseA.results,
    },
  };
};

export default Home;
