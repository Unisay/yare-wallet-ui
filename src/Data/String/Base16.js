export const base16Encode = (str) => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export function base16Decode_(hex, onError, onSuccess) {
  if (typeof hex !== "string") {
    return onError("Input must be a string");
  }

  if (hex.length % 2 !== 0) {
    return onError("Hex string must have an even number of characters");
  }

  if (!/^[0-9A-Fa-f]+$/.test(hex)) {
    return onError("Hex string contains invalid characters");
  }

  try {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }

    const decoder = new TextDecoder();
    const result = decoder.decode(bytes);
    return onSuccess(result);
  } catch (error) {
    return onError(`Decoding failed: ${error.message}`);
  }
}
