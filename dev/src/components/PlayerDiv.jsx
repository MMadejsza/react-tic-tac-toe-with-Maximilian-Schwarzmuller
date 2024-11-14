import {useState} from 'react';

function PLayer({name: initialName, symbol, isActive}) {
	// user is editing or not his name. Initially false
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	function handleEdit() {
		// () => is to get truly up to date state
		setIsEditing((editing) => !editing);
		// setIsEditing(!isEditing);
		// setIsEditing(!isEditing);
		// reality is that only last state update call will be triggered / both function receive initial state value:false
	}
	function handleChange(e) {
		setPlayerName(e.target.value);
	}

	let content = <span className='player-name'>{playerName}</span>;
	let label = 'Edit';
	if (isEditing) {
		content = (
			<input
				className='player-name'
				type='text'
				value={playerName}
				required
				onChange={handleChange}
			/>
		);
		label = 'Save';
	}

	return (
		<>
			<li className={isActive ? 'active' : undefined}>
				<span className='player'>
					{content}
					<span className='player-symbol'>{symbol}</span>
				</span>
				<button
					className='edit'
					onClick={handleEdit}>
					{label}
				</button>
			</li>
		</>
	);
}

export default PLayer;
