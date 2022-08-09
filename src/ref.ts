

export type TTopic =
{
  topicId: number;
  name: string
}

interface IRef
{
  refId: number;
  title: string;
  date: Date;
  timestamp: string | null;
}

export interface IBookRef extends IRef
{
  bookId: number;
  pageNo: number | null;
  formatId: number
}

export interface IPostRef extends IRef
{
  url: string;
  platformId: number;
  platform: string;
}

export type TRef = IBookRef | IPostRef;