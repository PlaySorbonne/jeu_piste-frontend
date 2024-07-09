export const APILINK = "/api";
export const PLAYERLINK = APILINK + "/player";

export enum HttpCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  WRONG_METHOD = 405,
  INTERNAL_ERROR = 500,
}

export interface OKApiResponse<T = any> {
  message: string;
  status: number;
  data: T;
  isError: false;
}
export interface ErrorApiResponse {
  message: string;
  status: number;
  data?: null;
  isError: true;
}

export type ApiResponse<T> = OKApiResponse<T> | ErrorApiResponse;
