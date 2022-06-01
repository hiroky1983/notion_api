import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import {
  getNotionApiForId,
  getNotionApiForLanguage,
  getNotionQuery,
} from "../libs/notionApi";
import { IdProps } from "../libs/type";

type Props = {
  props: IdProps[];
};

const Home: NextPage<Props> = ({ props }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main>
        <ul>
          {props.map((prop) => (
            <li key={prop.id} className="hover:opacity-60">
              <Link href={`/contents/${prop.id}`}>
                <a>{prop.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getNotionApiForId();

  const data = await getNotionQuery();
  const result = data.results;
  await getNotionApiForLanguage();
  return {
    props: {
      props: tags,
    },
  };
};

export default Home;
