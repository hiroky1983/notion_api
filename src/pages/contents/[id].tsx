import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import {
  getNotionApiForId,
  getNotionApiForLangJa,
  getNotionApiForLangVi,
} from "../../libs/notionApi";

const contents: NextPage = ({ id, langJa, langVi }: any) => {
  return (
    <>
      <div>
        <Link href="/">
          <a>戻る</a>
        </Link>
        <h1>contents</h1>
        <p>{id}</p>
        <div>
          {langVi.map((item: any) => (
            <p key={item.id}>{item.title[0].plain_text}</p>
          ))}
          {langJa.map((item: any) => (
            <p key={item.id}>{item.rich_text[0].plain_text}</p>
          ))}
        </div>
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
  const langJa = await getNotionApiForLangJa();
  const langVi = await getNotionApiForLangVi();

  return {
    props: {
      id,
      langJa,
      langVi,
    },
  };
};

export default contents;
