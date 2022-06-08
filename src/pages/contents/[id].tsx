import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import {
  getNotionApiFillterProperties,
  getNotionApiForId,
  getNotionApiNewObject,
} from "../../libs/notionApi";

const contents: NextPage = ({ data }: any) => {
  const proparties = data.map((prop: any) => {
    return prop.properties;
  });
  return (
    <>
      <div>
        <Link href="/">
          <a>戻る</a>
        </Link>
        {proparties.map((prop: any) => (
          <ul className="p-4" key={prop.id}>
            <li className="flex">
              <p className="pr-4">{prop.Name_vi.title[0].plain_text}</p>
              <p>{prop.Name_ja.rich_text[0].plain_text}</p>
            </li>
          </ul>
        ))}
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
  const id = ctx.params?.id as string;
  const propaties = await getNotionApiFillterProperties(id);
  const data = await getNotionApiNewObject(propaties);
  return {
    props: {
      id,
      data,
    },
  };
};

export default contents;
