/** @format */

const axios = require("axios");
const cheerio = require("cheerio");
const countryList = require("./countryList").countryList;

const defaultUrl =
	"https://en.wikipedia.org/wiki/Travel_restrictions_related_to_the_2019%E2%80%9320_coronavirus_pandemic";

// Store countries in dictionary for quicker look up
const dict = {};
countryList.forEach((el, index) => (dict[el] = index));

module.exports.scrapeData = function(url = defaultUrl) {
	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);

			const countriesBannedFlights = [];
			const countries = $("a");

			countries.each(function() {
				let text = $(this)
					.parent()
					.text();
				let title = $(this).attr("title");

				if (dict[title] !== undefined && text.includes("citizens")) {
					if (
						(text.includes("citizen") ||
							text.includes("closed") ||
							text.includes("resident") ||
							text.includes("foreign") ||
							text.includes("international")) &&
						!countriesBannedFlights.includes(title)
					) {
						countriesBannedFlights.push(title);
					}
				}
			});
			global.console.log("countries", countriesBannedFlights);
		})
		.catch(console.error);
};
