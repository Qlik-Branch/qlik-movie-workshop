import React, { useState, useEffect } from "react"
import EnigmaService from "../services/EnigmaService"
import "./Filter.css"
import separator from "../assets/separator.svg"

const Filter = props => {
  const [filterList, setFilterList] = useState([])

  useEffect(() => {
    EnigmaService.getList(props.field, {}, updateList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateList = async model => {
    const layout = await model.getLayout()
    const filterList = layout.qListObject.qDataPages[0].qMatrix.map(
      listItem => {
        const item = listItem[0]
        const value = item.qText || "<none>"
        const classes = ["filter-item"]
        classes.push(`state-${item.qState.toLowerCase()}`)
        return (
          <div
            key={value}
            className={classes.join(" ")}
            onClick={() => selectValue(value)}
          >
            {value}
          </div>
        )
      }
    )
    setFilterList(filterList)
  }

  const selectValue = async value => {
    await EnigmaService.makeSelection(
      props.field,
      value === "<none>" ? "" : value
    )
  }

  return (
    <div className="Filter">
      <div className="title">{props.title}</div>
      <img src={separator} alt="" />
      <div className="content">{filterList}</div>
    </div>
  )
}

export default Filter
