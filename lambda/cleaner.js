const cheerio = require("cheerio")
var TurndownService = require("turndown")
var td = new TurndownService()
const providers = require("./providers.json")

// passing htmlBody (string) from dynamodb, mainTag from providers.json and a callback for store again in dynamodb
const cleaner = (htmlBody, mainTag, callBack) => {
  const $ = cheerio.load(htmlBody, { xml: { normalizeWhitespace: true } })
  const firstUrl = $(mainTag)
    .html()
    .replace(/\n/g, "") // unnecessary spaces
    .replace(/> </g, "><") // space between tags
    .replace(/<[^/>][^>]*><\/[^>]+>/gi, "") // empty tags e.g. <div class="d1"></div>
    .replace(/\s\s+/g, " ") // double spaces
    .replace(/<([^\/>]+)\/>/gi, "") // auto-close tags like: <br />
    .replace(/&nbsp;/gi, "") // &nbsp - non black spaces
  let cleanedText = td.turndown(firstUrl)
  callBack(cleanedText)
}


fetchData(providers.davivienda.url, providers.davivienda.mainTag, funcionQueGrabaEnDinamoDB)

function funcionQueGrabaEnDinamoDB (data)  {
    //here the code for store in dynamoDB
    console.log(data)
}