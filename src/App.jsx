import BingoCard from "./components/BingoCard";
import BingoDraw from "./components/BingoDraw";
import { BingoProvider } from "./contexts/BingoContext";
import "./tailwind.css";

function App() {
	return (
		<BingoProvider>
			<div className="App flex justify-evenly items-center h-screen">
				<BingoCard />
				<BingoDraw />
			</div>
		</BingoProvider>
	);
}

export default App;
