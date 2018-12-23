const Nightmare = require('nightmare');
const fs = require('fs');


// Usage: node main.js 'Haruki Murakami' 20
let base_url = "https://www.goodreads.com/quotes/search?utf8=✓&commit=Search&q=";
let author = process.argv[2];
let numPages = parseInt(process.argv[3], 10) || 100;

console.log(`Fetching results for ${author}...`);

async function getQuotes(author, numPages) {
    try {
        const nightmare = Nightmare({ show: false }); // hide electron window
        
        let formattedAuthor = author.replace(" ", "+");
        let tempArray = [];

        await nightmare
            .goto(base_url + formattedAuthor)
            .wait('body');

        tempArray.push(await nightmare
                       .evaluate(function() {
                           return Array.from(document.querySelectorAll('.quoteText')).map(el => el.innerText);
                       })
                      );

        await nightmare.end();
        const fileName = author.toLowerCase().replace(" ", "-") + '-quotes';
        
        const finalArray = await processResults(tempArray);
        const finalObject = {
            'goodreadsQuotes': finalArray
        };

        
        fs.writeFileSync(`${fileName}.json`, JSON.stringify(finalObject, null, 2));
        console.log('Scrape complete!');

    }

    catch(error) {
        console.log(error);
    }
    
}

getQuotes(author, numPages);

//take results array, merge, filter out null quotes and return array of quote objects
async function processResults(array) {
    const flattened = await array.reduce((acc, cur)=>
      acc.concat(cur),[]
                                        );
    
    const formattedQuotes = flattened.map(quote => {
        return {
            "quote" : getQuoteString(quote)
        };
    });

    const finalArray = await formattedQuotes.filter(quote=>{
        return quote.quote !== null;
    });

    return finalArray;
}
                                
                                    
//remove author and book title from quote string
function getQuoteString(quote){
  try{
    return quote.match(/“([^"]*)”/)[1];

  }
  catch(err){
    return null;
  }
}


           

