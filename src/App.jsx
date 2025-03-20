import { useState } from 'react'
import './App.css'

function App() {
  const [matrix, setMatrix] = useState(
    [
      ["", "", ""], 
      ["", "", ""], 
      ["", "", ""]
    ]
  )
  console.log(matrix)

  const [player, setPlayer] = useState(true);
  const [blockdCells, setBlockdCells] = useState([])

  const handleCheck = () => {
    for(let i = 0; i < 3; i ++) {
      if(
        matrix[i][0] != "" &&
        matrix[i][0] === matrix[i][1] 
        && matrix[i][0] === matrix[i][2]
      ) {
        player ? alert("Você Venceu!") : alert("A IA Venceu!");
        setMatrix(
          [
            ["", "", ""], 
            ["", "", ""], 
            ["", "", ""]
          ]
        )
        return;
      }
    }

    for (let j = 0; j < 3; j++) {
      if (
        matrix[0][j] !== "" && 
        matrix[0][j] === matrix[1][j] &&
        matrix[0][j] === matrix[2][j]
      ) {
        player ? alert("Você Venceu!") : alert("A IA Venceu!");
        setMatrix([
          ["", "", ""], 
          ["", "", ""], 
          ["", "", ""]
        ]);
        return;
      }
    }
    
    

    if(
      matrix[0][0] !== "" && 
      matrix[0][0] === matrix[1][1] && 
      matrix[0][0] === matrix[2][2]
    ) {
      player ? alert("Você Venceu!") : alert("A IA Venceu!");
      setMatrix(
        [
          ["", "", ""], 
          ["", "", ""], 
          ["", "", ""]
        ]
      )
      return;
    }

    if (
      matrix[0][2] !== "" &&
      matrix[0][2] === matrix[1][1] &&
      matrix[0][2] === matrix[2][0]
    ) {
      player ? alert("Você Venceu!") : alert("A IA Venceu!");
      setMatrix([
        ["", "", ""], 
        ["", "", ""], 
        ["", "", ""]
      ]);
      return;
    }
    IAPlay()
  }

  const IAPlay = () => {
    if(player) {
      let flag = true;
      while(flag) {
        const numeroAleatorio = Math.floor(Math.random() * 3);
        const numeroAleatorio2 = Math.floor(Math.random() * 3);

        const newMatrix = [...matrix]


        if(!blockdCells.includes(`${numeroAleatorio}-${numeroAleatorio2}`)) {
          newMatrix[numeroAleatorio][numeroAleatorio2] = "O"
          setMatrix(newMatrix)

          flag = false;
          setPlayer(true)
        }
      }
    }
  }

  const handleClick = (rowIndex, colIndex) => {
    const newMatrix = [...matrix]

    if(blockdCells.includes(`${colIndex}-${rowIndex}`)) {
      return;
    }

    newMatrix[rowIndex][colIndex] = "X";
    setBlockdCells([...blockdCells, `${colIndex}-${rowIndex}`])
    
    setMatrix(newMatrix)
    handleCheck()
  }

  return (
    <div className="board">
      {matrix.map((row, rowIndex) => (
          row.map((el, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                backgroundColor: "#242424",
              }}
            >
              {el}
            </button>
          ))
      ))}
    </div>
  );
  
}

export default App