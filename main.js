const {crawlPage} = require("./crawl");

async function main() {
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

  const pages = await crawlPage(baseURL, baseURL, {});
  console.log("Finished crawling!");
  console.log("Links: ");
  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
