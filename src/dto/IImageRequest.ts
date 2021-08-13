export interface IImagesPath {
  path: string;
}

export default interface IImageRequest {
  id: string;
  name?: string;
  path?: IImagesPath[];
  imagesPath?: IImagesPath[];
}
