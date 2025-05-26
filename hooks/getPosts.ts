import notion from "@/lib/notion";

export const getPosts = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });

  return response.results;
};