import React, { useState, useEffect } from "react"
import "./Main.css"
import Movie from "../Movie"
import EnigmaService from "../services/EnigmaService"
import hypercubeJson from "../assets/movie-hypercube.json"

const Main = () => {
  const HEIGHT = 100

  const [movieList, setMovieList] = useState([])
  const [matrix, setMatrix] = useState(null)
  const [dimensions, setDimensions] = useState([])

  useEffect(() => {
    const getHyperCube = async () => {
      hypercubeJson.qHyperCubeDef.qInitialDataFetch[0].qHeight = HEIGHT
      await EnigmaService.getData(hypercubeJson, updateData)
    }
    getHyperCube()
  }, [])

  const updateData = async model => {
    const layout = await model.getLayout()

    setDimensions(layout.qHyperCube.qDimensionInfo)
    setMatrix(layout.qHyperCube.qDataPages[0].qMatrix)
  }

  const transformMatrix = () => {
    if (matrix) {
      const movieList = matrix.map(listItem => {
        const item = {}
        for (let i = 0; i < dimensions.length; i++) {
          item[dimensions[i].qFallbackTitle] = listItem[i].qText
        }
        return <Movie key={listItem[0].qText} movie={item} />
      })
      setMovieList(movieList)
    }
  }

  useEffect(transformMatrix, [matrix])

  return <div className="Main">{movieList}</div>
}

export default Main
