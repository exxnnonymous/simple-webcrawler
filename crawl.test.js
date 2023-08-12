const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl");

// normalize url function test
test("normalizeURL strip protocol", () => {
  const input = "https://blog.crawl.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.crawl.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing /", () => {
  const input = "https://blog.crawl.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.crawl.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals /", () => {
  const input = "https://BloG.crawl.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.crawl.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://blog.crawl.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.crawl.dev/path";
  expect(actual).toEqual(expected);
});

// geturlsfromhtml function test
test("getURLsfromHTML absolute url", () => {
  const htmlBody = `
  <html>
    <body>
        <a href="https://blog.crawl.dev/"> Webcrawler Blog </a>
    <body>
  </html>
  `;
  const baseURL = "https://blog.crawl.dev";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = ["https://blog.crawl.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsfromHTML relative url", () => {
  const htmlBody = `
  <html>
    <body>
        <a href="/path/"> Webcrawler Blog </a>
    <body>
  </html>
  `;
  const baseURL = "https://blog.crawl.dev";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = ["https://blog.crawl.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsfromHTML multiple urls", () => {
  const htmlBody = `
  <html>
    <body>
        <a href="https://blog.crawl.dev"> Webcrawler Blog </a>
        <a href="/path/"> Webcrawler Blog </a>
        <a href="https://google.com"> Google </a>
    <body>
  </html>
  `;
  const baseURL = "https://blog.crawl.dev";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = [
    "https://blog.crawl.dev/",
    "https://blog.crawl.dev/path/",
    "https://google.com/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsfromHTML invalid url", () => {
  const htmlBody = `
  <html>
    <body>
        <a href="invalid"> Webcrawler Blog </a>
    <body>
  </html>
  `;
  const baseURL = "https://blog.crawl.dev";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
