import React from "react"
import "./Filters.css"
import Filter from "../Filter"

const Filters = () => {
  return (
    <div className="Filters">
      <div className="titleContainer">
        <div className="title">Filters</div>
      </div>
      <Filter title="Ratings" field="content_rating" />
      <Filter title="Country" field="country" />
      <Filter title="Language" field="language" />
      <Filter title="Color" field="color" />
    </div>
  )
}

export default Filters
