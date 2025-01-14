import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "",
  dataset: "",
  apiVersion: "",
  useCdn: false,
});

export default client

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}