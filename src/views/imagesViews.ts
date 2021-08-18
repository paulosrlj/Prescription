import Image from '../entities/Image';

interface ImageResponse {
  id: string;
  url: string;
}

export function handleImage(image: Image): ImageResponse {
  return {
    id: image.id,
    url: `http://localhost:8001/uploads/${image.path}`,
  };
}

export function handleManyImages(images: Image[]): ImageResponse[] {
  return images.map(image => this.handleImage(image));
}
