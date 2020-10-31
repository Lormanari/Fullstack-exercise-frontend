import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
const Display = ({counter}) => <div>{counter}</div>


const Button = ({handleCLick, text}) => {
	return (
		<button onClick={handleCLick}>{text}</button>
	)
}
const App = () => {
	const [counter, setCounter] = useState(0)

	const inscreaeByOne = () => setCounter(counter + 1)
	const setZero = () => setCounter(0)
	const decreaeByOne = () => setCounter(counter - 1)
	return (
		<div>
	  		<Display counter={counter} />
			<Button handleCLick={inscreaeByOne} text='Plus'/>
			<Button handleCLick={setZero} text='Zero'/>
			<Button handleCLick={decreaeByOne} text='Minus'/>
		</div>
	)
  }


	ReactDOM.render(
		<App />,
		document.getElementById('root')
	)