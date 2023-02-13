export interface TickerData {
  a: number[];
  b: number[];
  c: number[];
  v: number[];
  p: number[];
  t: number[];
  l: number[];
  h: number[];
  o: number;
}

export interface ResultData {
  [key: string]: TickerData;
}

export interface KrakenData {
  result: ResultData;
  error: string[]
}
