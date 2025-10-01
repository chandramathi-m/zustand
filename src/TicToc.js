import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useGameStore = create(
  combine(
    {
      history: [Array(9).fill(null)],
      currentMove: 0,
    },
    (set, get) => {
      return {
        setHistory: (nextHistory) => {
          set((state) => ({
            history:
              typeof nextHistory === 'function'
                ? nextHistory(state.history)
                : nextHistory,
          }))
        },
        setCurrentMove: (nextCurrentMove) => {
          set((state) => ({
            currentMove:
              typeof nextCurrentMove === 'function'
                ? nextCurrentMove(state.currentMove)
                : nextCurrentMove,
          }))
        },
      }
    },
  ),
)

function Square({ value, onSquareClick }) {
  const getSquareStyles = () => {
    if (value === 'X') {
      return 'text-red-600 hover:text-red-700'
    } else if (value === 'O') {
      return 'text-blue-600 hover:text-blue-700'
    }
    return 'text-gray-400 hover:text-gray-600'
  }

  return (
    <button
      className={`w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-2xl font-bold transition-all duration-200 active:scale-95 ${getSquareStyles()}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : 'O'
  const status = calculateStatus(winner, turns, player)

  function handleClick(i) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    onPlay(nextSquares)
  }

  return (
    <>
      <div className="mb-4 text-center">
        <div className={`text-xl font-semibold px-4 py-2 rounded-lg ${
          winner 
            ? 'bg-green-100 text-green-800 border-2 border-green-300' 
            : turns === 0 
            ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
            : 'bg-blue-100 text-blue-800 border-2 border-blue-300'
        }`}>
          {status}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-gray-800 p-2 rounded-lg shadow-lg">
        {squares.map((_, i) => (
          <Square
            key={`square-${i}`}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </>
  )
}

export default function TicToc() {
  const history = useGameStore((state) => state.history)
  const setHistory = useGameStore((state) => state.setHistory)
  const currentMove = useGameStore((state) => state.currentMove)
  const setCurrentMove = useGameStore((state) => state.setCurrentMove)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tic Tac Toe</h1>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Game History</h2>
        <div className="bg-white rounded-lg shadow-md p-4 max-h-96 overflow-y-auto">
          <ol className="space-y-2">
            {history.map((_, historyIndex) => {
              const description =
                historyIndex > 0
                  ? `Go to move #${historyIndex}`
                  : 'Go to game start'
              const isCurrentMove = historyIndex === currentMove

              return (
                <li key={historyIndex}>
                  <button 
                    onClick={() => jumpTo(historyIndex)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                      isCurrentMove
                        ? 'bg-blue-500 text-white font-semibold shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                    }`}
                  >
                    {description}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function calculateTurns(squares) {
  return squares.filter((square) => !square).length
}

function calculateStatus(winner, turns, player) {
  if (!winner && !turns) return 'Draw'
  if (winner) return `Winner ${winner}`
  return `Next player: ${player}`
}
