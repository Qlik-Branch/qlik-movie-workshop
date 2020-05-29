import enigma from "enigma.js"
import schema from "enigma.js/schemas/12.170.2.json"

class EnigmaService {
  qix = null
  document = null
  clearSearch = null

  static instance = null

  async init() {
    console.log("Creating Session...")
    const fetchResult = await fetch(
      `https://${process.env.REACT_APP_TENANT}/api/v1/csrf-token`,
      {
        credentials: "include",
        headers: {
          "qlik-web-integration-id": process.env.REACT_APP_WEB_INTEGRATION_ID,
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "content-type": "application/json"
        }
      }
    )
    const csrfToken = fetchResult.headers.get("qlik-csrf-token")
    if (csrfToken == null) return -1
    const session = enigma.create({
      schema,
      url: `wss://${process.env.REACT_APP_TENANT}/app/${process.env.REACT_APP_QLIK_APP}?qlik-web-integration-id=${process.env.REACT_APP_WEB_INTEGRATION_ID}&qlik-csrf-token=${csrfToken}`,
      createSocket: url => new WebSocket(url)
    })
    console.log("Session Created. Opening...")
    this.qix = await session.open()
    this.document = await this.qix.openDoc(process.env.REACT_APP_QLIK_APP)
    console.log("Document opened.")
    return 1
  }

  static createInstance() {
    const object = new EnigmaService()
    return object
  }

  static getInstance() {
    if (!EnigmaService.instance) {
      EnigmaService.instance = EnigmaService.createInstance()
    }
    return EnigmaService.instance
  }

  async getData(properties, callback) {
    const sessionObject = await this.document.createSessionObject(properties)

    if (callback) sessionObject.on("changed", () => callback(sessionObject))

    await callback(sessionObject)

    return sessionObject
  }

  async getList(field, options, callback) {
    const properties = {
      qInfo: {
        qType: "field-list"
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: [field],
          qSortCriterias: [{ qSortByState: 1 }, { qSortByAscii: 1 }]
        },
        qShowAlternatives: true,
        // We fetch the initial three values (top + height),
        // from the first column (left + width):
        qInitialDataFetch: [
          {
            qTop: 0,
            qHeight: 10000,
            qLeft: 0,
            qWidth: 1
          }
        ]
      }
    }

    const listObject = await this.document.createSessionObject(properties)

    if (callback) listObject.on("changed", () => callback(listObject))

    await callback(listObject)
  }

  async makeSelection(fieldName, selection) {
    const field = await this.document.getField(fieldName)
    await field.toggleSelect(selection)
  }

  async clearSelections() {
    await this.document.clearAll()
    if (this.clearSearch) {
      this.clearSearch()
      this.clearSearch = null
    }
  }

  async search(terms, fields, callback) {
    this.clearSearch = callback
    const searchResults = await this.document.searchResults(
      { qSearchFields: fields },
      terms,
      { qOffset: 0, qCount: 20 }
    )
    if (searchResults.qSearchGroupArray.length > 0) {
      return await this.document.selectAssociations(
        { qSearchFields: fields },
        terms,
        0
      )
    } else {
      return false
    }
  }
}

const enigmaService = EnigmaService.getInstance()
export default enigmaService
