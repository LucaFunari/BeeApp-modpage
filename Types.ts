export type Entry = {
  uid: string;
  timestamp: string;

  type: string;
  subtype: string;
  family: Array<string | undefined> | undefined;

  tags: string[];
  description: string | undefined;
  image: string | undefined;
};

export type ApiKeyCookie = {
  key: string | undefined;
};
