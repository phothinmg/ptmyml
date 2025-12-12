declare module "ptmyml" {
  export interface FrontMatterData {
    [x: string]: any;
    layout: string;
  }

  export interface FrontMatterResult<
    T extends Record<string, any> = FrontMatterData
  > {
    data: T;
    content: string;
  }
  export function fm<T extends Record<string, any> = FrontMatterData>(
    str: string
  ): FrontMatterResult<T>;
  export function load<T extends Record<string, any> = Record<string, any>>(
    str: string
  ): T;
}
