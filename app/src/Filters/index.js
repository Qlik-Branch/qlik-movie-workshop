import React from "react"
import "./Filters.css"
import Filter from "../Filter"
import EnigmaService from "../services/EnigmaService"

const Filters = () => {
  const clear = async () => {
    await EnigmaService.clearSelections()
  }

  return (
    <div className="Filters">
      <div className="titleContainer">
        <div className="title">Filters</div>
        <button className="button" onClick={clear}>
          Clear All
        </button>
      </div>
      <Filter title="Ratings" field="content_rating" />
      <Filter title="Country" field="country" />
      <Filter title="Language" field="language" />
      <Filter title="Color" field="color" />
    </div>
  )
}

export default Filters
