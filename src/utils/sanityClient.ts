import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: 'enlu62ww',
  dataset: 'production',
  apiVersion: '2022-03-07',
  useCdn: true,
});

export default client;

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}