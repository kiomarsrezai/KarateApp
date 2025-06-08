export type Province = {
  id: number;
  creationDate: Date;
  name: string;
};

export type City = {
  name: string;
  provinceId: number;
  id: number;
  creationDate: Date;
};
