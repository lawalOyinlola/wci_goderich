/**
 * Checks an uploaded file's first bytes against the raster formats we accept,
 * instead of trusting the client-sent Content-Type. SVG is deliberately not
 * on the list: it is XML that can carry script.
 */
export async function isAllowedImageFile(file: Blob): Promise<boolean> {
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const ascii = (start: number, end: number) =>
    String.fromCharCode(...head.slice(start, end));

  // JPEG
  if (head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) return true;
  // PNG
  if (
    head[0] === 0x89 &&
    ascii(1, 4) === "PNG" &&
    head[4] === 0x0d &&
    head[5] === 0x0a
  ) {
    return true;
  }
  // GIF
  if (ascii(0, 6) === "GIF87a" || ascii(0, 6) === "GIF89a") return true;
  // WebP
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return true;
  // HEIC / HEIF / AVIF (ISO base media "ftyp" box), common from phones
  if (ascii(4, 8) === "ftyp") {
    return ["heic", "heix", "hevc", "mif1", "msf1", "avif"].includes(
      ascii(8, 12)
    );
  }

  return false;
}
