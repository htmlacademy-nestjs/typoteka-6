export interface File {
  id?: string;
  originalName: string;
  subDirectory: string;
  size: number;
  mimetype: string;
  hashName: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}
