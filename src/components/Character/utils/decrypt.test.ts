import { describe, expect, it, spyOn, afterEach, mock } from "bun:test";
import { generateAESKey, decryptFile } from "./decrypt";

describe("decrypt utility", () => {
  afterEach(() => {
    mock.restore();
  });

  describe("generateAESKey", () => {
    it("should hash the password and import a key", async () => {
      const mockDigest = spyOn(global.crypto.subtle, "digest");
      const mockImportKey = spyOn(global.crypto.subtle, "importKey");

      const password = "testPassword";

      const key = await generateAESKey(password);

      expect(mockDigest).toHaveBeenCalledTimes(1);
      const digestCall = mockDigest.mock.calls[0];
      expect(digestCall[0]).toBe("SHA-256");
      expect(digestCall[1]).toBeInstanceOf(Uint8Array);
      const decodedPassword = new TextDecoder().decode(digestCall[1] as Uint8Array);
      expect(decodedPassword).toBe(password);

      expect(mockImportKey).toHaveBeenCalledTimes(1);
      const importKeyCall = mockImportKey.mock.calls[0];
      expect(importKeyCall[0]).toBe("raw");
      expect(importKeyCall[2]).toEqual({ name: "AES-CBC" });
      expect(importKeyCall[3]).toBe(false);
      expect(importKeyCall[4]).toEqual(["encrypt", "decrypt"]);

      expect(key.algorithm.name).toBe("AES-CBC");
    });
  });

  describe("decryptFile", () => {
    it("should throw an error if fetch fails", async () => {
      const mockFetch = spyOn(global, "fetch").mockResolvedValue(new Response(null, { status: 404, statusText: "Not Found" }));

      await expect(decryptFile("http://example.com/file", "pass")).rejects.toThrow("Failed to fetch encrypted file: 404 Not Found");
      expect(mockFetch).toHaveBeenCalledWith("http://example.com/file");
    });

    it("should throw an error if file is too short (corrupted)", async () => {
      const shortBuffer = new ArrayBuffer(10);
      const mockFetch = spyOn(global, "fetch").mockResolvedValue(new Response(shortBuffer));

      await expect(decryptFile("http://example.com/file", "pass")).rejects.toThrow("Encrypted data too short - possibly a corrupted file.");
    });

    it("should decrypt a valid file properly", async () => {
      // Mock fetch
      const validBuffer = new Uint8Array(20);
      validBuffer.fill(1, 0, 16); // IV
      validBuffer.fill(2, 16, 20); // Data
      const mockFetch = spyOn(global, "fetch").mockResolvedValue(new Response(validBuffer.buffer));

      // We can also spy on decrypt
      const mockDecrypt = spyOn(global.crypto.subtle, "decrypt").mockResolvedValue(new ArrayBuffer(4));

      const result = await decryptFile("http://example.com/file", "pass");

      expect(mockFetch).toHaveBeenCalledWith("http://example.com/file");

      expect(mockDecrypt).toHaveBeenCalledTimes(1);
      const decryptCall = mockDecrypt.mock.calls[0];

      expect(decryptCall[0]).toEqual({ name: "AES-CBC", iv: new Uint8Array(validBuffer.buffer.slice(0, 16)) });
      // key is a CryptoKey
      expect(decryptCall[2]).toEqual(validBuffer.buffer.slice(16));

      expect(result).toBeInstanceOf(ArrayBuffer);
      expect(result.byteLength).toBe(4);
    });
  });
});
