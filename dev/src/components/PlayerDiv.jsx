function PLayer({name, symbol}) {
	return (
		<>
			<li>
				<span className='player'>
					<span className='player-name'>{name}</span>
					<span className='player-symbol'>{symbol}</span>
				</span>
				<button className='edit'>Edit</button>
			</li>
		</>
	);
}

export default PLayer;
