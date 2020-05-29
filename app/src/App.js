import React, { useState, useEffect, Fragment } from "react"
import "./App.css"
import EnigmaService from "./services/EnigmaService"
import Header from "./Header"
import Main from "./Main"
import Loading from "./Loading"
import Login from "./Login"

const App = () => {
  const [enigmaInitialized, setEnigmaInitialized] = useState(0)

  useEffect(() => {
    const initializeEnigma = async () => {
      setEnigmaInitialized(await EnigmaService.init())
    }
    initializeEnigma()
  }, [])

  return (
    <div className="App">
      {enigmaInitialized === 0 ? (
        <Loading />
      ) : enigmaInitialized === 1 ? (
        <Fragment><Header /><Main /></Fragment>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
