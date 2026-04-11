import { expect, test, mock, describe, beforeEach, afterEach, spyOn } from "bun:test";
import * as THREE from "three";
import setCharacter from "./character";
import * as decryptModule from "./decrypt";
import { GLTFLoader } from "three-stdlib";

mock.module("../../utils/GsapScroll", () => ({
  setCharTimeline: mock(() => {}),
  setAllTimeline: mock(() => {}),
}));

describe("setCharacter", () => {
  let renderer: any;
  let scene: any;
  let camera: any;
  let createObjectURLSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    renderer = {
      compileAsync: mock(() => Promise.resolve()),
    };
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();

    createObjectURLSpy = spyOn(URL, "createObjectURL").mockImplementation(() => "blob:test-url");
    consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    mock.restore();
  });

  test("rejects when decryptFile throws an error", async () => {
    const decryptSpy = spyOn(decryptModule, "decryptFile").mockRejectedValue(new Error("Decrypt failed"));

    const { loadCharacter } = setCharacter(renderer, scene, camera);

    await expect(loadCharacter()).rejects.toThrow("Decrypt failed");
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Decrypt failed"));

    decryptSpy.mockRestore();
  });

  test("rejects when GLTFLoader.load calls onError", async () => {
    const decryptSpy = spyOn(decryptModule, "decryptFile").mockResolvedValue(new ArrayBuffer(8));

    const loadSpy = spyOn(GLTFLoader.prototype, "load").mockImplementation((url, onLoad, onProgress, onError) => {
      if (onError) onError(new Error("GLTF Load Error"));
    });

    const { loadCharacter } = setCharacter(renderer, scene, camera);

    await expect(loadCharacter()).rejects.toThrow("GLTF Load Error");
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error loading GLTF model:", new Error("GLTF Load Error"));

    decryptSpy.mockRestore();
    loadSpy.mockRestore();
  });

  test("resolves with gltf when GLTFLoader.load succeeds", async () => {
    const decryptSpy = spyOn(decryptModule, "decryptFile").mockResolvedValue(new ArrayBuffer(8));

    const mockCharacter = new THREE.Object3D();
    const mockFootR = new THREE.Object3D();
    mockFootR.name = "footR";
    const mockFootL = new THREE.Object3D();
    mockFootL.name = "footL";
    mockCharacter.add(mockFootR);
    mockCharacter.add(mockFootL);

    const mockMesh = new THREE.Mesh();
    mockCharacter.add(mockMesh);

    const mockGltf = { scene: mockCharacter };

    const loadSpy = spyOn(GLTFLoader.prototype, "load").mockImplementation((url, onLoad, onProgress, onError) => {
      onLoad(mockGltf);
    });

    const { loadCharacter } = setCharacter(renderer, scene, camera);

    const gltf = await loadCharacter();
    expect(gltf).toBe(mockGltf);
    expect(mockFootR.position.y).toBe(3.36);
    expect(mockFootL.position.y).toBe(3.36);

    decryptSpy.mockRestore();
    loadSpy.mockRestore();
  });
});
