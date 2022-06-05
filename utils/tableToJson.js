const cheerio = require("cheerio");
const axios = require("axios");

const convert = async function (
  url,
  dataFirstRowSelector,
  dataTableRowsSelector
) {
  const response = await axios.get(url);
  const site = cheerio.load(response.data);
  let headerArray = [];
  site(dataFirstRowSelector).each(function (i) {
    headerArray[i] = site(this).text();
  });

  let dataArray = [];
  site(dataTableRowsSelector).each(function (i) {
    if (i >= headerArray.length) dataArray.push(site(this).text());
  });
  return jsonify(dataArray, headerArray);
};

const jsonify = (dataArray, headerArray) => {
  let result = [];
  while (dataArray.length > 0) {
    let dataSet = [];
    for (let i = 0; i < headerArray.length; i++) {
      let removedElement = dataArray.shift();
      dataSet[i] = [headerArray[i], removedElement];
    }
    result.push(Object.fromEntries(dataSet));
  }
  return result;
};

module.exports = { convert };
