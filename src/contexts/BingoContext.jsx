import { createContext, useState, useContext } from "react";

const TOTAL_NUMBERS = 75;

const BingoContext = createContext();

export const useBingo = () => useContext(BingoContext);

export const BingoProvider = ({ children }) => {
	const [drawnNumbers, setDrawnNumbers] = useState([]);
	const [currentNumber, setCurrentNumber] = useState(null);
	const [isGameOver, setIsGameOver] = useState(false);

	const drawNumber = () => {
		if (drawnNumbers.length >= TOTAL_NUMBERS) {
			setIsGameOver(true);
			return;
		}

		let nextNumber;
		do {
			nextNumber = Math.floor(Math.random() * TOTAL_NUMBERS) + 1;
		} while (drawnNumbers.includes(nextNumber));

		setCurrentNumber(nextNumber);
		setDrawnNumbers([...drawnNumbers, nextNumber]);
	};

	return (
		<BingoContext.Provider
			value={{
				drawnNumbers,
				currentNumber,
				drawNumber,
				isGameOver,
				TOTAL_NUMBERS,
			}}
		>
			{children}
		</BingoContext.Provider>
	);
};
