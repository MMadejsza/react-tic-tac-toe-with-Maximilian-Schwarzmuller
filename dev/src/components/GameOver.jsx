function GameOwer({winner, rematch}) {
	return (
		<>
			<div id='game-over'>
				<h2>Game over!</h2>
				{winner && <p>{winner} won!</p>}
				{!winner && <p>It's a draw!</p>}
				<p>
					<button onClick={rematch}>Rematch!</button>
				</p>
			</div>
		</>
	);
}

export default GameOwer;
