function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    b[1] - a[1];
  });
  return pagesArr;
}

function printReport(pages) {
  console.log("\n\n========");
  console.log("REPORT");
  console.log("========");
  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} links to page: ${page[0]}`);
  }
  console.log("========");
  console.log("END REPORT");
  console.log("========");
}


module.exports = printReport