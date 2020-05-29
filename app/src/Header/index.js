import React from "react"
import "./Header.css"
import logo from "../assets/logo.png"

const Header = () => {
  return (
    <div className="Header">
      <img className="logo" src={logo} alt="Qlik Films" />
    </div>
  )
}

export default Header
