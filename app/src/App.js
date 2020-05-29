import React, { useState, useEffect } from "react"
import "./App.css"
import EnigmaService from "./services/EnigmaService"
import Header from "./Header"
import Main from "./Main"

const App = () => {
  const [enigmaInitialized, setEnigmaInitialized] = useState(false)

  useEffect(() => {
    const initializeEnigma = async () => {
      setEnigmaInitialized(await EnigmaService.init())
    }
    initializeEnigma()
  }, [])

  return enigmaInitialized ? (
    <div className="App">
      <Header />
      <Main />
    </div>
  ) : (
    <div />
  )
}

export default App
