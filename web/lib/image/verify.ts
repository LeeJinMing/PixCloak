export type VerifiedImage = {
  width: number;
  height: number;
  mime: string;
};

/** Decode an exported blob before it is offered for download. */
export async function verifyImageBlob(blob: Blob): Promise<VerifiedImage> {
  if (!blob.size) throw new Error("Exported image is empty");
  const bitmap = await createImageBitmap(blob);
  try {
    if (bitmap.width < 1 || bitmap.height < 1) {
      throw new Error("Exported image has invalid dimensions");
    }
    return { width: bitmap.width, height: bitmap.height, mime: blob.type };
  } finally {
    bitmap.close();
  }
}
