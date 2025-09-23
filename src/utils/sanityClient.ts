import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "k9r7o650";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2022-03-07",
  useCdn: true,
});

export default client;

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}