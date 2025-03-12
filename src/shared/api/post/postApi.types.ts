type ImageModel = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type UploadPhotoRespond = {
  images: Array<ImageModel>,
};