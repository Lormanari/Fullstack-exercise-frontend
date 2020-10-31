import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
	const [newNote, setNewNote] = useState('')

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}


	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: false,
			// important: Math.random() < 0.5,
		}
		createNote(noteObject)

		setNewNote('')
	}
	return (
		<div className="formDiv">
			<h2>Create a new note</h2>

			<form onSubmit={addNote}>
				<input
					id="newNote"
					value={newNote}
					onChange={handleNoteChange}
				/>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default NoteForm