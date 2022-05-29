import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { databaseId, notion } from "../../libs/notion";

const contents: NextPage = ({ id }) => {
  return (
    <>
      <div>
        <h1>contents</h1>
        <p>{id}</p>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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

  const paths = newTags.map((tag) => `/contents/${tag.id}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id;

  return {
    props: {
      id,
    },
  };
};

export default contents;
