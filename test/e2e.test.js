const run = require("./run");
const server = require("./server");

describe("end-to-end integration", () => {
  beforeAll(() => server.start(3333));
  afterAll(() => server.stop());

  test("prints error and help message when no arguments given", async () => {
    const { stderr, stdout, exitCode } = await run();
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual("");
  });

  test("prints help message when --help given", async () => {
    const { stderr, stdout, exitCode } = await run("--help");
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints formatted output for a filename", async () => {
    const { stderr, stdout, exitCode } = await run("./test/sample.html");
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints formatted output for multiple filenames", async () => {
    const { stderr, stdout, exitCode } = await run(
      "./test/sample.html",
      "./test/sample.html"
    );
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints formatted output for a URL", async () => {
    const { stderr, stdout, exitCode } = await run(
      "http://localhost:3333/sample.html"
    );
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints formatted output for a URL and filename", async () => {
    const { stderr, stdout, exitCode } = await run(
      "./test/sample.html",
      "http://localhost:3333/sample.html"
    );
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints formatted output to specified width for --width", async () => {
    const { stderr, stdout, exitCode } = await run(
      "--width",
      "40",
      "./test/sample.html"
    );
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints formatted output to specified width for -w", async () => {
    const { stderr, stdout, exitCode } = await run(
      "-w",
      "40",
      "./test/sample.html"
    );
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints formatted output to specified width for --indent", async () => {
    const { stderr, stdout, exitCode } = await run(
      "--indent",
      "4",
      "./test/sample.html"
    );
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints formatted output to specified width for -i", async () => {
    const { stderr, stdout, exitCode } = await run(
      "-i",
      "4",
      "./test/sample.html"
    );
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });
});
