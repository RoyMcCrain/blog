import type { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

/**
 * @package
 */
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch: MicroCMSImage;
  category: Category;
} & MicroCMSDate;

type Category = {
  id: string;
  name: string;
} & MicroCMSDate;
