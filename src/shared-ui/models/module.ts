export interface IModule {
  id: string;
  title: string;
  route?: string;
  loading?: boolean;
  iconType: string;
  parent?: string;
  size?: "large" | "normal";
  children: IModule[];
}
