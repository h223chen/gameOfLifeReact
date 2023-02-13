import React, { useState, useEffect } from 'react'

import Cell from './Cell'

function Gameboard() {
  const X = 30, Y = 30
  const DELAY = 500

  const styles = {
    board: {
      display: 'grid',
      gridTemplateColumns: `repeat(${Y}, 1fr)`,
      gap: '0.2rem'
    }
  }

  const initialGrid = (): any[][] => {
    let grid = new Array(Y).fill(0).map((_, idx) => {
      let tmp = new Array(X)
  
      for (let i=0; i<X; i++) {
        tmp[i] = Math.round(Math.random())
      }
  
      return tmp
    })

    // custom shapes
    grid[0][0] = 0
    grid[0][1] = 0
    grid[0][2] = 0
    grid[0][3] = 0
    grid[0][4] = 0
    grid[1][0] = 0
    grid[1][1] = 0
    grid[1][2] = 0
    grid[1][3] = 0
    grid[1][4] = 0
    grid[2][0] = 0
    grid[2][1] = 1
    grid[2][2] = 1
    grid[2][3] = 1
    grid[2][4] = 0
    grid[3][0] = 0
    grid[3][1] = 0
    grid[3][2] = 0
    grid[3][3] = 0
    grid[3][4] = 0
    grid[4][0] = 0
    grid[4][1] = 0
    grid[4][2] = 0
    grid[4][3] = 0
    grid[4][4] = 0

    return grid
  }

  const [ grid, setGrid ] = useState(initialGrid())

  const checkLivingNeighbour = (grid: any[][], i: number, j: number): number => {
    if (i < 0) {
      i = grid.length + i
    }

    if (j < 0) {
      j = grid[0].length + j
    }

    if (i >= grid.length) {
      i = i - grid.length
    }

    if (j >= grid[0].length) {
      j = j - grid[0].length
    }

    return grid[i][j]
  }

  const checkNeighbours = (grid: number[][], i: number, j: number): number => {
    let livingNeighbours = 0

    livingNeighbours = 
      checkLivingNeighbour(grid, i+1, j) +
      checkLivingNeighbour(grid, i+1, j+1) +
      checkLivingNeighbour(grid, i, j+1) +
      checkLivingNeighbour(grid, i-1, j+1) +
      checkLivingNeighbour(grid, i-1, j) +
      checkLivingNeighbour(grid, i-1, j-1) +
      checkLivingNeighbour(grid, i, j-1) +
      checkLivingNeighbour(grid, i+1, j-1)
    
    return livingNeighbours
  }

  useEffect(() => {
    setTimeout(() => {
      setGrid((prev) => {
        const newGrid = new Array(Y).fill(0).map(() => {
          return new Array(X).fill(0)
        })

        for (let i=0; i<newGrid.length; i++) {
          for (let j=0; j<newGrid[i].length; j++) {
            const curCell = prev[i][j]
            const numLivingNeighbours = checkNeighbours(prev, i, j)
            const isLiving = curCell === 1
            
            // console.log(i, j, numLivingNeighbours)

            if (isLiving) {
              if (numLivingNeighbours < 2 || numLivingNeighbours > 3) {
                newGrid[i][j] = 0
                console.log('cell', i, j, 'died')
              } else {
                newGrid[i][j] = prev[i][j]
              }
            } else { // if dead
              if (numLivingNeighbours === 3) {
                newGrid[i][j] = 1
                console.log('cell', i, j, 'is alive')
              }
            }
          }
        }        

        return newGrid
      })
    }, DELAY)
  }, [grid])

  console.log(grid)

  return (
    <>
      { 
        // grid.map((line) => {
        //   return <div>{line.map((cell) => {
        //     return cell === 1 ? 'o' : '_'
        //   })}</div>
        // })
        grid.map((line) => {
          return <div style={styles.board}>{line.map((cell, idx) => {
            return <Cell style={{
              gridRow: idx+1
            }} value={cell}>{cell}</Cell>
          })}</div>
        })
      }
    </>
  )
}

export default Gameboard