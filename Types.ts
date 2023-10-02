export type Entry = {
  id: string;
  category: 0 | 1 | 2;
  tags: string[];
  text: string | undefined;
  image: string | undefined;
};

export type ApiKeyCookie = {
  key: string | undefined;
};
