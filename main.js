const fs = require("fs");
const tableToJson = require("./utils/tableToJson");

/**
 * fetches data from a Gsheet, parses it to Json and creates a local json file.
 *
 * @param {string} url google sheet url to parse
 * @param {string} dataFirstRowSelector a google sheet's selector that matches only the first td
 * @param {string} dataTableRowsSelector a google sheet's selector that matches every td
 * @returns {string} status of the operations
 */
async function getData(url, dataFirstRowSelector, dataTableRowsSelector) {
  let status = null;
  try {
    let jsonDATA = await tableToJson.convert(
      url,
      dataFirstRowSelector,
      dataTableRowsSelector
    );
    status = "jsonData acquired succesfully.";
    try {
      fs.writeFileSync("data.json", JSON.stringify(jsonDATA), (err) => {
        console.error(err);
      });
      status += "\njsonData file created succesfully.";
    } catch (err) {
      status = "Error.";
      console.error(err);
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log(status);
    return status;
  }
}

getData(
  "https://docs.google.com/spreadsheets/u/0/d/1CEBhao3rMe-qtCbAgJTn5ZKQMRFWeAeaiXFpBY3gbHE/gviz/tq?tqx=out:html&tq",
  "table > tbody > tr:first > td",
  "table > tbody > tr > td"
);



