export type FileMeta = {
  fileId: string;
  fileName: string;
  contentType: string;
  fileSize: number;
};
export type PresignedUrlPayload = {
  files: FileMeta[];
  folder: string;
};

export type PresignedUrlResponse = {
  success: boolean;
  message: string;
  data: { uploadUrls: { fileId: string; key: string; uploadUrl: string }[] };
};
