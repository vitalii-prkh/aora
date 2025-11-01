export function arrayBufferToString(
  arrayBuffer: ArrayBuffer,
  encoding = "utf-8",
) {
  const uint8Array = new Uint8Array(arrayBuffer);
  const decoder = new TextDecoder(encoding);

  return decoder.decode(uint8Array);
}
