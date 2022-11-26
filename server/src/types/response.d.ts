export type Response<TData = undefined, TError = any> =
  | {
      success: true;
      error?: TError;
    }
  | {
      success: false;
      data: TData;
    };
