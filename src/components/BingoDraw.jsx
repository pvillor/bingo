import { useBingo } from "../contexts/BingoContext";

function BingoDraw() {
	const { currentNumber, drawNumber, drawnNumbers, TOTAL_NUMBERS } = useBingo();
	const gameOver = drawnNumbers.length >= TOTAL_NUMBERS;

	return (
		<div className="flex flex-col items-center mt-12">
			<h1 className="text-4xl font-bold mb-6">Bingo Draw</h1>
			<div className="mb-8">
				<div className="text-6xl font-bold text-center">
					{currentNumber || "-"}
				</div>
				<button
					onClick={drawNumber}
					disabled={gameOver}
					className={`mt-4 px-6 py-2 ${
						gameOver ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
					} text-white font-semibold rounded`}
				>
					{gameOver ? "Game Over" : "Draw Number"}
				</button>
			</div>
			<div className="w-full max-w-3xl">
				<h2 className="text-2xl font-bold mb-4">Drawn Numbers:</h2>
				<div className="flex flex-wrap gap-2">
					{drawnNumbers.map((number, index) => (
						<span key={index} className="px-4 py-2 bg-blue-100 rounded">
							{number}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

export default BingoDraw;
