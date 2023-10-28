export type IRPCHandler = {
  handler(origin: string, params: any): any;
};
