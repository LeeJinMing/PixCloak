export async function downloadZipFromBlobs(
  entries: { name: string; blob: Blob }[],
  filename = "download.zip"
) {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  for (const { name, blob } of entries) {
    zip.file(name, blob);
  }
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
