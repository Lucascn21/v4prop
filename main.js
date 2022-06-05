const fs = require("fs");
const tableToJson = require("./utils/tableToJson");

/**
 * fetches data from a Gsheet, parses it to Json and creates a local json file.
 *
 * @param {string} url google sheet url to parse
 * @param {string} dataFirstRowSelector a google sheet's selector that matches only the first td
 * @param {string} dataTableRowsSelector a google sheet's selector that matches every td
 * @param {boolean} saveFile should a json file be created?
 * @returns {string} status of the operations
 */
async function getData(
  url,
  dataFirstRowSelector,
  dataTableRowsSelector,
  saveFile
) {
  let status = null;
  let jsonDATA;
  try {
    jsonDATA = await tableToJson.convert(
      url,
      dataFirstRowSelector,
      dataTableRowsSelector
    );
    status = "jsonData acquired succesfully.";
    if (saveFile) {
      fs.writeFileSync("data.json", JSON.stringify(jsonDATA));
      status += "\njsonData file created succesfully.";
    }
  } catch (error) {
    status = "Error on getData.";
    console.log(error.message);
    throw error;
  } finally {
    console.log(status);
    return jsonDATA;
  }
}

getData(
  "https://docs.google.com/spreadsheets/u/0/d/1CEBhao3rMe-qtCbAgJTn5ZKQMRFWeAeaiXFpBY3gbHE/gviz/tq?tqx=out:html&tq",
  "table > tbody > tr:first > td",
  "table > tbody > tr > td",
  true
);
