import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps, NextPage } from "next";
import { databaseId, notion } from "../libs/notion";

type Props = {
  response: QueryDatabaseResponse;
  props: {
    id: string;
    name: string;
    color: string;
  }[];
};

const Home: NextPage<Props> = ({ response, props }) => {
  console.log(props);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main>
        <ul>
          {props.map((prop) => (
            <li key={prop.id}>{prop.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await notion.databases.query({
    database_id: databaseId || "",
    sorts: [
      {
        property: "created_at",
        direction: "ascending",
      },
    ],
  });
  const result = data.results;

  const tags = result.map((cur: any) => {
    const tag = cur.properties["ジャンル"];
    const tagName = tag.multi_select[0];
    return tagName;
  });

  const newTags = tags.filter(
    (element, index, self) =>
      self.findIndex((e) => e.id === element.id) === index
  );

  return {
    props: {
      response: data,
      props: newTags,
    },
  };
};

export default Home;
