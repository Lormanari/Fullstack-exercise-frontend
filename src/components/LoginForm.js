import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
}) => (
	<form onSubmit={handleSubmit}>
		<div>
			username
			<input
				id='username'
				type='text'
				value={username}
				name='Username'
				onChange={handleUsernameChange} //({target}) => setUsername(target.value)
			/>
		</div>
		<div>
			password
			<input
				id='password'
				type='password'
				value={password}
				name='Password'
				onChange={handlePasswordChange} //
			/>
		</div>
		<button id="login-button" type="submit">login</button>
	</form>
)

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm