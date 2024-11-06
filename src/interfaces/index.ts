export interface IMetaData {
  page: number;
  limit: number;
}

export interface IResponseMetaData {
  next_page: boolean;
  total_count: number;
}

export interface IBaseResponse {
  message: string;
}

export interface IErrorMessage extends IBaseResponse {}

export interface ISignInResponse extends IBaseResponse {
  token: string;
}
