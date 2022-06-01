import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getNotionApiForId } from "../../libs/notionApi";

const contents: NextPage = ({ id }: any) => {
  return (
    <>
      <div>
        <Link href="/">
          <a>戻る</a>
        </Link>
        <h1>contents</h1>
        <p>{id}</p>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getNotionApiForId();
  const paths = tags.map((tag) => `/contents/${tag.id}`);

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
