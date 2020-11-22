import React, { useState } from 'react';

const useCounter = () => {
	const [value, setValue] = useState(0)

	const increase = () => {
		setValue(value + 1)
	}

	const decrease = () => {
		setValue(value - 1)
	}

	const zero = () => {
		setValue(0)
	}

	return {
		value,
		increase,
		decrease,
		zero
	}
}
// const Display = ({counter}) => <div>{counter}</div>


// const Button = ({handleCLick, text}) => {
// 	return (
// 		<button onClick={handleCLick}>{text}</button>
// 	)
// }
const App = () => {
	// const counter = useCounter()

	// return (
	// 	<div>
	// 		<div>{counter.value}</div>
	// 		<button onClick={counter.increase}>
    //     		plus
    //   		</button>
	// 		<button onClick={counter.decrease}>
	// 			minus
	// 		</button>
	// 		<button onClick={counter.zero}>
	// 			zero
	// 		</button>
	// 	</div>
	// )
	const left = useCounter()
  	const right = useCounter()

  	return (
		<div>
			{left.value}
			<button onClick={left.increase}>
				left
			</button>
			<button onClick={right.increase}>
				right
			</button>
			{right.value}
		</div>
  	)
}

export default App