/* eslint-disable prettier/prettier */
export class SuccessResponse<T> {
  constructor(
    public message: string,
    public code: number,
    public data?: T,
    public status: boolean = true,
  ) {}
}
