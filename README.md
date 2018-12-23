# Goodreads Scraper

A simple webscraper that uses Nightmare.js to scrape quotes from an Author on Goodreads and saves them to a JSON file.

## Usage

The function takes in two arguments, the author's name and the number of pages of quotes you wish to scrape. Goodreads displays 20 quotes per pages so the final JSON file will contain 20 times the number of quotes as pages specified. The number of pages is set to 100 by default, so if there is no argument then the scraper will return the first 2000 quotes of a given author. Since Goodreads quotes are organized by the number of likes they received, the quotes will be returned in descending order of popularity.  

The format of the query is as follows:
`node main.js <author> <page_count>`

## Installation and Example Query
```
git clone https://github.com/tombonan/goodreads-scraper.git && cd goodreads-scraper
npm install
node main.js 'Haruki Murakami' 3
```