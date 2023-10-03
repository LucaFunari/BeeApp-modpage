export type Entry = {
  uid: string;
  type: string;
  tags: string[];
  description: string | undefined;
  image: string | undefined;
};

export type ApiKeyCookie = {
  key: string | undefined;
};
