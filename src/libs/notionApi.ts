import { databaseId, notion } from "./notion";
import { IdProps } from "./type";

//notionのqueryを取得する
export const getNotionQuery = async () => {
  const data = await notion.databases.query({
    database_id: databaseId || "",
    sorts: [
      {
        property: "created_at",
        direction: "ascending",
      },
    ],
  });
  return data;
};

//pageIdの取得
export const getNotionApiForId = async () => {
  const data = await getNotionQuery();
  const result = data.results;

  const tags = result.map((cur: any) => {
    const tag = cur.properties["ジャンル"];
    const tagName = tag.multi_select[0];
    return tagName;
  });

  const newTags: IdProps[] = tags.filter(
    (element, index, self) =>
      self.findIndex((e) => e.id === element.id) === index
  );
  return newTags;
};

export const getNotionApiForLangJa = async () => {
  const data = await getNotionQuery();
  const result = data.results;

  const resultData = result.map((cur: any) => {
    const langJa = cur.properties["Name_ja"];
    return langJa;
  });
  return resultData;
};
export const getNotionApiForLangVi = async () => {
  const data = await getNotionQuery();
  const result = data.results;

  const resultData = result.map((cur: any) => {
    const langVi = cur.properties["Name_vi"];
    return langVi;
  });
  return resultData;
};
