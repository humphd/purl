const nock = require("nock");
const { processUri } = require("./resource");

const originalConsoleLogFn = global.console.log;
const originalConsoleErrorFn = global.console.error;

describe("processUri tests", () => {
  let logOutput = null;
  let errorOutput = null;

  function testLogFn(...args) {
    logOutput = logOutput || [];
    args.forEach((arg) => logOutput.push(arg));
  }

  function testErrorFn(...args) {
    errorOutput = errorOutput || [];
    args.forEach((arg) => errorOutput.push(arg));
  }

  function finalize(output) {
    if (output && Array.isArray(output)) {
      return output.join("");
    }
    return output;
  }

  beforeEach(() => {
    global.console.log = testLogFn;
    global.console.error = testErrorFn;

    logOutput = null;
    errorOutput = null;
  });

  afterEach(() => {
    global.console.log = originalConsoleLogFn;
    global.console.error = originalConsoleErrorFn;

    logOutput = null;
    errorOutput = null;
  });

  test("passing file path works", async () => {
    await processUri("test/small-sample.html");

    const expected = `<html>
  <p>Hello World</p>
</html>
`;

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test("passing url works", async () => {
    const url = "https://example.com";
    const urlData = "<html><p>Hello World</p></html>";
    nock(url).get("/").reply(200, urlData);

    await processUri("https://example.com/");

    const expected = `<html>
  <p>Hello World</p>
</html>
`;

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test("passing invalid uri should throw in read", async () => {
    await processUri(null);

    const expected = `Error processing null: invalid uri`;
    expect(finalize(logOutput)).toBe(null);
    expect(finalize(errorOutput)).toEqual(expected);
  });

  test("passing non-existing file path errors", async () => {
    await processUri("no-such-file");

    const expected = `Error processing no-such-file: ENOENT: no such file or directory, open 'no-such-file'`;
    expect(finalize(logOutput)).toBe(null);
    expect(finalize(errorOutput)).toEqual(expected);
  });

  test("passing indent works", async () => {
    await processUri("test/small-sample.html", 80, 4);

    const expected = `<html>
    <p>Hello World</p>
</html>
`;

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test("passing indent works", async () => {
    await processUri("test/small-sample.html", 80, 4);

    const expected = `<html>
    <p>Hello World</p>
</html>
`;

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test("passing width works", async () => {
    await processUri("test/small-sample.html", 8);

    const expected = `<html>
  <p>
    Hello
    World
  </p>
</html>
`;

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });
});
