const nock = require("nock");
const { validate, read } = require("./url");

describe("validate tests", () => {
  test("empty, null, undefined should return false", () => {
    [null, undefined, ""].forEach((url) => expect(validate(url)).toBe(false));
  });

  test("http:// URL should return true", () => {
    const url = "http://example.com";
    expect(validate(url)).toBe(true);
  });

  test("https:// URL should return true", () => {
    const url = "https://example.com";
    expect(validate(url)).toBe(true);
  });

  test("URLs with scheme other than https:// or http:// should return false", () => {
    const url = "ws://example.com";
    expect(validate(url)).toBe(false);
  });
});

describe("read tests", () => {
  test("an invalid URL should throw", async () => {
    expect(() => read(null)).rejects.toThrow();
  });

  test("reading from an existing URL should work", async () => {
    const url = "https://example.com";
    const urlData = "<p>Hello World</p>";

    // We need to fake a good network request
    nock(url).get("/").reply(200, urlData);

    const data = await read(url);
    expect(data).toEqual(urlData);
  });

  test("reading from a missing URL should throw", async () => {
    const url = "https://example.com/404";

    // We need to fake a 404 network request
    nock(url).get("/").reply(404);

    expect(() => read(url)).rejects.toThrow();
  });
});
