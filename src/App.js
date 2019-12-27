import React, { useState } from 'react';
import './App.css';

function App() {
  const winningCombinations = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [theArray, setTheArray] = useState([...Array(9)].map(_ => ''));
  const [player, togglePlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const resetAll = () => {
    setTheArray([...Array(9)].map(_ => ''));
    togglePlayer('X');
    setWinner(null);
  };

  const checkIfBoxesFull = () => {
    let isNotFull = false;

    [...theArray].forEach(val => {
      if (val === '') {
        isNotFull = isNotFull || true;
      }
    });

    return isNotFull;
  };

  const setSelectedBox = index => {
    const isNotFull = checkIfBoxesFull();

    if (winner || !isNotFull) {
      alert('resetting');
      resetAll();
    } else {
      const arrayCopy = [...theArray];
      if (player === 'X') {
        arrayCopy[index] = 'X';
        setTheArray(arrayCopy);
        checkForWinner(arrayCopy);
        togglePlayer('O');
      } else {
        arrayCopy[index] = 'O';
        setTheArray(arrayCopy);
        checkForWinner(arrayCopy);
        togglePlayer('X');
      }
    }
  };

  const checkForWinner = arrayCopy => {
    for (let key of winningCombinations) {
      const [first, second, third] = key;
      if (
        arrayCopy[first] === arrayCopy[second] &&
        arrayCopy[second] === arrayCopy[third] &&
        (arrayCopy[first] !== '' ||
          arrayCopy[second] !== '' ||
          arrayCopy[third] !== '')
      ) {
        setWinner(player);
      }
    }
  };

  return (
    <div className="App">
      <div>Tic Tac Toe</div>
      <div className="main-container">
        {theArray.map((value, index) => {
          return (
            <TicBox
              setSelectedBox={() => setSelectedBox(index, theArray)}
              value={value}
              key={index}
            />
          );
        })}
      </div>
      {winner ? (
        <div>
          {`PLAYER ${winner} WINS`}
          {alert(`PLAYER ${winner} WINS`)}
        </div>
      ) : (
        <div>{`It's player ${player} turn`}</div>
      )}
      <button onClick={() => resetAll()}>RESET</button>
    </div>
  );
}

export default App;

const TicBox = ({ setSelectedBox, value }) => {
  return (
    <div className="box" onClick={setSelectedBox}>
      {value}
    </div>
  );
};
