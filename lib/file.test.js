const { validate, read } = require("./file");

jest.mock("fs");
const fs = require("fs").promises;

describe("validate tests", () => {

  test("empty, null, undefined should return false", () => {
    [null, undefined, ""].forEach((p) => expect(validate(p)).toBe(false));
  });

  test("relative file path should return true", () => {
    const path = "abc";
    expect(validate(path)).toBe(true);
  });

  test("relative file path with a space should return true", () => {
    const path = "a bc";
    expect(validate(path)).toBe(true);
  });

  test("absolute Unix file path should return true", () => {
    const path = "/abc";
    expect(validate(path)).toBe(true);
  });

  test("absolute Windows file path should return true", () => {
    const path = "C:\\abc";
    expect(validate(path)).toBe(true);
  });
});

describe("read tests", () => {
  const filename = "file";
  const fileData = "<p>Hello World</p>";

  beforeAll(() => {
    fs.__setMockFileData(filename, fileData);
  });

  test("an invalid path should throw", async () => {
    expect(() => read(null)).rejects.toThrow();
  });

  test("reading an existing file should work", async () => {
    const data = await read(filename);
    expect(data).toEqual(fileData);
  });

  test("reading a non-existing file should throw", async () => {
    expect(() => read("invalid")).rejects.toThrow();
  });
});
