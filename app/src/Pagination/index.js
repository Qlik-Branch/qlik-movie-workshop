import React from "react"
import "./Pagination.css"

const Pagination = props => {
  const { onPreviousClick, onNextClick, previousEnabled, nextEnabled } = props

  return (
    <div className="Pagination">
      <div className="buttonContainer previousButton">
        {previousEnabled ? (
          <button className="button" onClick={onPreviousClick}>
            Previous
          </button>
        ) : null}
      </div>
      <div className="buttonContainer nextButton">
        {nextEnabled ? (
          <button className="button" onClick={onNextClick}>
            Next
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Pagination
