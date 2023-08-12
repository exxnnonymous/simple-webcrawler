const crawlPage = require("./crawl");


function main() {
  if (process.argv.length < 3) {
    console.log("Error: Insufficient Arguments");
    process.exit(1);
  }
  if (process.argv.length > 4) {
    console.log("Error: Too many Arguments");
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log(`Starting crawling: ${baseURL} `);

  crawlPage(baseURL);
}

main();
