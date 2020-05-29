import React from "react"
import "./Header.css"
import logo from "../assets/logo.png"
import Filters from "../Filters"

const Header = () => {
  return (
    <div className="Header">
      <img className="logo" src={logo} alt="Qlik Core Films" />
      <Filters />
      <div />
    </div>
  )
}

export default Header
