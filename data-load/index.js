const WebSocket = require("ws")
const enigma = require("enigma.js")
const schema = require("enigma.js/schemas/12.170.2.json")
const Halyard = require("halyard.js")
const mixins = require("halyard.js/dist/halyard-enigma-mixin")
const fs = require("fs")
require('dotenv').config()

const {
  API_KEY,
  QLIK_APP,
  TENANT
} = process.env

;(async () => {
  try {
    console.log("Creating Halyard table data representation.")

    // creating a new Halyard object
    const halyard = new Halyard()

    // reading the CSV data from the data files into variables
    const movieData = fs.readFileSync("./data/movies.csv").toString()
    const posterData = fs.readFileSync("./data/posters.csv").toString()

    // creating halyard tables from the raw CSV data
    const moviesTable = new Halyard.Table(movieData)
    const posterTable = new Halyard.Table(posterData)

    // adding the tables to the halyard object
    halyard.addTable(moviesTable)
    halyard.addTable(posterTable)

    console.log("Opening session app on engine using Halyard mixin.")
    const session = enigma.create({
      schema,
      mixins,
      url: `wss://${TENANT}/app/${QLIK_APP}`,
      createSocket: url => new WebSocket(url, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`
        }
      })
    })
    console.log("Created. Opening...")
    const qix = await session.open()
    console.log("Opened. Creating App...")
    const app = await qix.reloadAppUsingHalyard(QLIK_APP, halyard)

    console.log("Creating session object with movies.")
    // the following code will just confirm the data is in the app by requesting the first 10 movie titles
    const movieCount = 10
    const properties = {
      qInfo: { qType: "movie-data" },
      qHyperCubeDef: {
        qDimensions: [{ qDef: { qFieldDefs: ["movie_title"] } }],
        qInitialDataFetch: [{ qHeight: movieCount, qWidth: 1 }]
      }
    }
    const object = await app.createSessionObject(properties)
    const layout = await object.getLayout()
    const movies = layout.qHyperCube.qDataPages[0].qMatrix

    console.log(`Listing the ${movieCount} first movies:`)
    movies.forEach(movie => {
      console.log(movie[0].qText)
    })

    await session.close()
    console.log("Session closed.")
  } catch (err) {
    console.log("Whoops! An error occurred.", err)
    process.exit(1)
  }
})()
