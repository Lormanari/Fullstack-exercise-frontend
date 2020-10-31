import React, { useState, useEffect, useRef } from 'react'
// import axios from 'axios'

import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
	const [notes, setNotes] = useState([])
	// const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	// const [loginVisible, setLoginVisible] = useState(false)

	const toggleImportanceOf = (id) => {
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important }
		// axios.put(url, changedNote)
		noteService
			.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch(() => {
				setErrorMessage(`the note '${note.content}' was already deleted from server`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter(n => n.id !== id))
			})
	}

	useEffect(() => {
		// 	axios
		//   .get('http://localhost:3001/notes')
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if(loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)

		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(user)
			)

			noteService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')

		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}
	// handleNoteChange & addNote removed to Note form
	// const handleNoteChange = (event) => {
	// 	setNewNote(event.target.value)
	// }


	// const addNote = (event) => {
	// 	event.preventDefault()
	// 	const noteObject = {
	// 		content: newNote,
	// 		date: new Date().toISOString(),
	// 		important: Math.random() < 0.5,
	// 		// id: notes.length + 1,
	// 	}
	// 	setNotes(notes.concat(noteObject))
	// 	setNewNote('')

	// 	// axios
	// 	// .post('http://localhost:3001/notes', noteObject)
	// 	noteService
	// 	.create(noteObject)
	// 	.then(returnedNote => {
	// 		setNotes(notes.concat(returnedNote))
	// 		setNewNote('')
	// 	})
	// }
	const notesToShow = showAll ? notes : notes.filter(note => note.important)


	// created own components
	// const noteForm = () => (
	// 	<form onSubmit={addNote}>
	// 		<input value={newNote}  onChange={handleNoteChange} />
	// 		<button type="submit">save</button>
	// 	</form>
	// )

	// const loginForm = () => {
	// 	const hideWhenVisible = { display: loginVisible ? 'none' : 'block' }
	// 	const showWhenVisible = { display: loginVisible ? 'block' : 'none' }

	// 	return (
	// 		<div>
	// 		  <div style={hideWhenVisible}>
	// 			<button onClick={() => setLoginVisible(true)}>log in</button>
	// 		  </div>
	// 		  <div style={showWhenVisible}>
	// 			<LoginForm
	// 			  username={username}
	// 			  password={password}
	// 			  handleUsernameChange={({ target }) => setUsername(target.value)}
	// 			  handlePasswordChange={({ target }) => setPassword(target.value)}
	// 			  handleSubmit={handleLogin}
	// 			/>
	// 			<button onClick={() => setLoginVisible(false)}>cancel</button>
	// 		  </div>
	// 		</div>
	// 	  )
	// 	}
	const noteFormRef = useRef()

	const addNote = (noteObject) => {
		noteFormRef.current.toggleVisibility()

		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
			})
	}



	const noteForm = () => (
		<Togglable buttonLabel='new note' ref={noteFormRef}>
			<NoteForm createNote={addNote} />
		</Togglable>
	)

	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm
				username={username}
				password={password}
				handleUsernameChange={({ target }) => setUsername(target.value)}
				handlePasswordChange={({ target }) => setPassword(target.value)}
				handleSubmit={handleLogin}
			/>
		</Togglable>
	)

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />

			{/* {user === null && loginForm()}
		{user !== null && noteForm()} */}

			{user === null ?
			//loginForm()
				loginForm() :
				<div>
					<p>{user.name} logged-in</p>
					{noteForm()}
				</div>
			}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note, i) =>
					<Note
						key={i}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				)}
			</ul>
			<Footer />
		</div>
	)
}

export default App