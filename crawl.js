const { JSDOM } = require("jsdom");

// function to crawl webpage for given url
async function crawlPage(currentUrl) {
  console.log(`Actively crawling: ${currentUrl} ...`);
  try {
    const res = await fetch(currentUrl);
    if (res.status > 399) {
      console.log(`Error fetching ${currentUrl}, Status code: ${res.status}`);
      return;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Error fetching ${currentUrl}, Non HTML response. Content-Type: ${contentType}`
      );
      return;
    }
  } catch (err) {
    console.log(`Error fetching ${currentUrl}, Error: ${err.message}`);
  }
}

// function to get urls from html webpage
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

// function to normalize urls
function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/")
    return hostPath.slice(0, -1);

  return hostPath;
}

module.exports = crawlPage;
module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
