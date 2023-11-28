export type HttpStatusCode = 200 | 201 | 203 | 404 | 401 | 403 | 500;

export interface IApiError {
  message: string;
  statusCode: HttpStatusCode | number;
}

export interface IApiResponse<T> {
  data?: T extends IApiError ? never : T;
  error?: T extends IApiError ? T : never;
}

export interface IUser {
  _id: any;
  name: string;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITask {
  _id: any;
  title: string;
  description: string;
  status: TaskStake;
  user_id: any;
  created_at: Date;
  updated_at: Date;
}
export enum TaskStake {
  "TODO" = "TODO",
  "IN_PROGRESS" = "IN_PROGRESS",
  "COMPLETED" = "COMPLETED",
}
