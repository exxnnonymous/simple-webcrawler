const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
        // relative URLs
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative URLs: ${err.message}`);
      }
    } else {
        // absolute URLs
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative URLs: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/")
    return hostPath.slice(0, -1);

  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
