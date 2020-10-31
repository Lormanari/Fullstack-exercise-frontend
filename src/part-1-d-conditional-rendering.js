import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// const Display = ({counter}) => <div>{counter}</div>


const Button = (props) => {
	console.log('props value is', props)
	const {onClick, text} = props
	return (
		<button onClick={onClick}>{text}</button>
	)
}

const History = (props) => {
	if(props.allClicks.length === 0) {
		return (
			<div>
				the app is used by pressing the buttons
			</div>
		)
	}
	return (
		<div>
			button press history: {props.allClicks.join(' ')}
		</div>
	)
}
const App = (props) => {
	// const [clicks, setClicks] = useState({
	// 	left: 0, right: 0
	// })
	const [left, setLeft] = useState(0)
	const [right, setRight] = useState(0)
	const [allClicks, setAll] = useState([])
	const handleLeftClick = () => {
		// const newClicks = {
		// 	...clicks,
		// 	left: clicks.left + 1,
		// }
		// setClicks(newClicks)
		// setClicks({...clicks, left: clicks.left + 1})

		setAll(allClicks.concat('L'))
		setLeft(left + 1)
	}
	const handleRightClick = () => {
		// const newClicks = {
		// 	...clicks,
		// 	right: clicks.right + 1
		// }
		// setClicks(newClicks)
		// setClicks({...clicks, right: clicks.right + 1})

		setAll(allClicks.concat('R'))
		setRight(right + 1)
	}


	return (
		<div>
			<div>
				{left}
				<Button onClick={handleLeftClick} text='left' />
				<Button onClick={handleRightClick} text='right' />
				{right}
				<History allClicks={allClicks} />
			</div>
		</div>
	)
  }


	ReactDOM.render(
		<App />,
		document.getElementById('root')
	)
