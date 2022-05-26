import { Client } from "@notionhq/client"

export const notion = new Client({ auth: process.env.NEXT_PUBLIC_API_KEY })

export const databaseId = process.env.NEXT_PUBLIC_API_URL