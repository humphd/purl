const { format, applyDefaults } = require("./pretty-printer");
const prettier = require("prettier");

describe("applyDefaults tests", () => {
  function checkOptions(options, printWidth, tabWidth) {
    expect(typeof options).toBe("object");
    expect(options.printWidth).toBe(printWidth);
    expect(options.tabWidth).toBe(tabWidth);
    expect(options.filepath).toEqual('index.html');
  }

  test("passing an nothing or empty object should result in good defaults", () => {
    [null, undefined, {}].forEach((options) => {
      const result = applyDefaults(options);
      checkOptions(result, 80, 2);
    });
  });

  test("should be able to give no options", () => {
    const result = applyDefaults();
    checkOptions(result, 80, 2);
  });

  test("should be able to override printWidth", () => {
    const result = applyDefaults({ printWidth: 100 });
    checkOptions(result, 100, 2);
  });

  test("should be able to override tabWidth", () => {
    const result = applyDefaults({ tabWidth: 4 });
    checkOptions(result, 80, 4);
  });

  test("should be able to override both printWidth and tabWidth", () => {
    const result = applyDefaults({ printWidth: 100, tabWidth: 4 });
    checkOptions(result, 100, 4);
  });
});

describe("format tests", () => {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Web Page</title></head><body><h1>Hello World!</h1></body></html>`;

  const defaultPrettierOptions = {
    printWidth: 80,
    tabWidth: 2,
    filepath: "index.html",
  };

  test("should format correctly if no options are given", () => {
    expect(format(html)).toEqual(prettier.format(html, defaultPrettierOptions));
  });

  test("should format correctly if printWidth option is given", () => {
    expect(format(html, { printWidth: 40 })).toEqual(
      prettier.format(html, { ...defaultPrettierOptions, printWidth: 40 })
    );
  });

  test("should format correctly if tabWidth option is given", () => {
    expect(format(html, { tabWidth: 4 })).toEqual(
      prettier.format(html, { ...defaultPrettierOptions, tabWidth: 4 })
    );
  });

  test("should format correctly if tabWidth and printWidth options are given", () => {
    expect(format(html, { tabWidth: 4, printWidth: 40 })).toEqual(
      prettier.format(html, {
        ...defaultPrettierOptions,
        tabWidth: 4,
        printWidth: 40,
      })
    );
  });
});
