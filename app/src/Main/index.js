import React, { useState, useEffect } from "react"
import "./Main.css"
import Movie from "../Movie"
import EnigmaService from "../services/EnigmaService"
import hypercubeJson from "../assets/movie-hypercube.json"
import Pagination from "../Pagination"

const Main = () => {
  const HEIGHT = 100

  const [movieList, setMovieList] = useState([])
  const [matrix, setMatrix] = useState(null)
  const [dimensions, setDimensions] = useState([])
  const [hypercube, setHypercube] = useState(null)
  const [top, setTop] = useState(0)
  const [height, setHeight] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    const getHyperCube = async () => {
      hypercubeJson.qHyperCubeDef.qInitialDataFetch[0].qHeight = HEIGHT
      const hypercube = await EnigmaService.getData(hypercubeJson, updateData)
      setHypercube(hypercube)
    }
    getHyperCube()
  }, [])

  const updateData = async model => {
    const layout = await model.getLayout()

    setTop(0)
    setHeight(layout.qHyperCube.qSize.qcy)
    setHasMore(layout.qHyperCube.qSize.qcy > HEIGHT)
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

  const prevPage = async () => {
    const newTop = top - HEIGHT
    const pageDef = [
      {
        qTop: newTop,
        qLeft: 0,
        qWidth: 10,
        qHeight: HEIGHT
      }
    ]
    let pages = await hypercube.getHyperCubeData("/qHyperCubeDef", pageDef)
    setTop(newTop)
    setHasMore(height > newTop)
    setMatrix(pages[0].qMatrix)
  }

  const nextPage = async () => {
    const newTop = top + HEIGHT
    const pageDef = [
      {
        qTop: newTop,
        qLeft: 0,
        qWidth: 10,
        qHeight: HEIGHT
      }
    ]
    let pages = await hypercube.getHyperCubeData("/qHyperCubeDef", pageDef)
    setTop(newTop)
    setHasMore(height > newTop * 2)
    setMatrix(pages[0].qMatrix)
  }

  useEffect(transformMatrix, [matrix])

  return (
    <div className="Main">
      <Pagination
        previousEnabled={top > 0}
        nextEnabled={hasMore}
        onPreviousClick={prevPage}
        onNextClick={nextPage}
      />
      {movieList}
      <Pagination
        previousEnabled={top > 0}
        nextEnabled={hasMore}
        onPreviousClick={prevPage}
        onNextClick={nextPage}
      />
    </div>
  )
}

export default Main
