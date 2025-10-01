export type Tab = {
  id: string;
  title: string;
  url: string;
  content: React.ReactNode;
  favicon?: string;
};

export type ProjectType = {
  title: string;
  url: string;
  snippet: string;
};
