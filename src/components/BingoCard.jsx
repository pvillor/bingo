import { useState, useEffect } from "react";
import { useBingo } from "../contexts/BingoContext";

function generateBingoCard() {
	const card = Array.from({ length: 5 }, () => new Array(5).fill(0));
	const freeSpace = Math.floor(card.length / 2);

	for (let i = 0; i < card.length; i++) {
		let columnNumbers = Array.from({ length: 15 }, (_, k) => k + 1 + i * 15);
		columnNumbers.sort(() => Math.random() - 0.5); // Shuffle numbers

		for (let j = 0; j < card[i].length; j++) {
			if (i === freeSpace && j === freeSpace) {
				card[j][i] = "FREE";
				continue;
			}
			card[j][i] = columnNumbers.pop();
		}
	}

	return card;
}

function BingoCard() {
	const [bingoCard, setBingoCard] = useState(generateBingoCard());
	const { drawnNumbers } = useBingo();

	useEffect(() => {
		// Função para marcar o número sorteado na cartela
		const checkNumber = (number) => {
			setBingoCard((prevCard) =>
				prevCard.map((row) =>
					row.map((cell) => (cell === number ? cell : cell))
				)
			);
		};

		if (
			drawnNumbers.length &&
			bingoCard.flat().includes(drawnNumbers[drawnNumbers.length - 1])
		) {
			checkNumber(drawnNumbers[drawnNumbers.length - 1]);
		}
	}, [drawnNumbers, bingoCard]);

	const isNumberDrawn = (number) => drawnNumbers.includes(number);

	const isGameOver = () => {
		// Verifica se todos os números, exceto o "FREE", foram sorteados
		return bingoCard.every((row) =>
			row.every((number) => number === "FREE" || isNumberDrawn(number))
		);
	};

	// Crie um state para rastrear o status do Game Over
	const [gameOver, setGameOver] = useState(false);

	// Use useEffect para verificar o Game Over quando os números sorteados mudarem
	useEffect(() => {
		if (isGameOver()) {
			setGameOver(true); // Atualiza o estado para indicar que o jogo acabou
		}
	}, [drawnNumbers, bingoCard]);

	if (gameOver) {
		return (
			<div className="text-4xl font-bold text-red-600 my-4">Game Over</div>
		);
	}

	return (
		<div className="flex flex-col items-center mt-12">
			<h1 className="text-4xl font-bold mb-6">Bingo Card</h1>
			<table className="border-2 border-gray-300">
				<tbody>
					{bingoCard.map((row, rowIndex) => (
						<tr key={rowIndex} className="bg-white">
							{row.map((number, colIndex) => (
								<td
									key={colIndex}
									className={`relative border border-gray-300 p-4 text-center 
                              ${
																isNumberDrawn(number) && number !== "FREE"
																	? "bg-red-500 text-white"
																	: ""
															}`}
								>
									{number}
									{isNumberDrawn(number) && number !== "FREE" && (
										<span className="absolute inset-0 flex items-center justify-center">
											{/* Você pode adicionar uma marcação SVG, ícone ou texto aqui */}
										</span>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<button
				onClick={() => setBingoCard(generateBingoCard())}
				className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
			>
				Generate New Card
			</button>
		</div>
	);
}

export default BingoCard;
