import IImageRequest from '../dto/IImageRequest';
import Image from '../entities/Image';

interface ImageResponse {
  id: string;
  url: string;
}

export function handleImage(image: IImageRequest): ImageResponse {
  return {
    id: image.id,
    url: `http://localhost:8001/uploads/${image.path}`,
  };
}

export function handleManyImages(images: IImageRequest[]): ImageResponse[] {
  return images.map(image => this.handleImage(image));
}
