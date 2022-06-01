import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getNotionApiForId } from "../libs/notionApi";

type Props = {
  props: {
    id: string;
    name: string;
    color: string;
  }[];
};

const Home: NextPage<Props> = ({ props }) => {
  console.log(props);

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

  return {
    props: {
      props: tags,
    },
  };
};

export default Home;
