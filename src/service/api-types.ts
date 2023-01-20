export interface APIServerRes<DataType> {
  data: DataType;
  totalcount: number;
  err_message: string;
}

export interface APIReqType<T> {
  action: string;
  data: T;
  token?: any
}

export interface ReqLogin {
  id: string;
  passwd: string;
}
