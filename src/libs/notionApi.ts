import { databaseId, notion } from "./notion";

export const getNotionApiForId = async () => {
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
  return newTags;
};
