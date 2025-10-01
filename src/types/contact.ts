import type * as Icons from "@icons-pack/react-simple-icons";

export type ContactItemType = {
  label: string;
  value: string;
  link: string;
  icon: keyof typeof Icons;
};
