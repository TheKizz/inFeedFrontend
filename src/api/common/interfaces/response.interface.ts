/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse<DataType> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: DataType;
  errors?: any[];
}
