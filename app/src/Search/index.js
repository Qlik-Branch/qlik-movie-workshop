import React, { useState } from "react"
import "./Search.css"
import searchIcon from "../assets/search.png"
import EnigmaService from "../services/EnigmaService"

const Search = () => {
  const [searchTerms, setSearchTerms] = useState("")

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      search()
    }
  }

  const clearSearch = () => {
    setSearchTerms("")
  }

  const searchChange = async event => {
    await setSearchTerms(event.target.value)
  }

  const search = async () => {
    await EnigmaService.search(
      searchTerms.split(" "),
      ["movie_title"],
      clearSearch
    )
  }

  return (
    <div className="Search">
      <div className="searchInput">
        <img src={searchIcon} alt="search" />
        <input
          placeholder="Title Search"
          type="text"
          onChange={searchChange}
          value={searchTerms}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default Search
