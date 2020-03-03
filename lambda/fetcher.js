const axios = require("axios")
const providers = require("./providers.json")

// create lambda function with providers.json file too!
const fetchData = async (url, callBack) => {
  const response = await axios(url)
  callBack(response.data)
}

// recorre todos los providers y trae el HTML entero y le aplica la función que graba en dynamoDB
for (let i in providers) {
  fetchData(providers[i].url, funcionQueGrabaEnDinamoDB)
}

fetchData(providers.google.url, funcionQueGrabaEnDinamoDB)

function funcionQueGrabaEnDinamoDB (data)  {
    //here the code for store in dynamoDB
    console.log(data)
}