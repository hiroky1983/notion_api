import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps, NextPage } from "next";
import { databaseId, notion } from "../libs/notion";

type Props = {
  response: QueryDatabaseResponse[];
};

const Home: NextPage<Props> = (props) => {
  console.log(props);

  const A = props.response.map((item) => {
    return item.properties;
  });
  console.log(A);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main>
        <h1>Next template</h1>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await notion.databases.query({
    database_id: databaseId || "",
    sorts: [
      {
        property: "created_at",
        direction: "ascending",
      },
    ],
  });

  console.log(response.results);

  return {
    props: {
      response: response.results,
    },
  };
};

export default Home;
