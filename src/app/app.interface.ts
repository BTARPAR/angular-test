export interface Movies {
  id: number;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
}

export type HTMLAttribute = HTMLElement & {
  attributes: {
    dataType: string
  };
};
