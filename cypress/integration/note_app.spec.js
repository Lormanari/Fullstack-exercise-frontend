describe('Note app', function() {

	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Yurong Z',
			username: 'yurong',
			password: '12345'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function() {
		cy.contains('Notes')
		cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
	})

	it('login form can be opened', function() {
		cy.contains('login').click()
	})

	it('user can login', function () {
		cy.contains('login').click()
		cy.get('#username').type('yurong')
		cy.get('#password').type('12345')
		cy.get('#login-button').click()

		cy.contains('Yurong Z logged-in')
	})

	it('login fails with wrong password', function() {
		cy.contains('login').click()
		cy.get('#username').type('yurong')
		cy.get('#password').type('wrong')
		cy.get('#login-button').click()

		// cy.get('.error').contains('Wrong credentials')
		cy.get('.error')
			.should('contain', 'Wrong credentials')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid')

			cy.get('html').should('not.contain', 'Yurong Z logged-in')
	})

	describe('when logged in', function() {
		beforeEach(function() {
		//   cy.contains('login').click()
		//   cy.get('#username').type('yurong')
		//   cy.get('#password').type('12345')
		//   cy.get('#login-button').click()
			// cy.request('POST', 'http://localhost:3001/api/login', {
			// 	username: 'yurong', password: '12345'
			// 	}).then(response => {
			// 	localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
			// 	cy.visit('http://localhost:3000')
			// })

			cy.login({ username: 'yurong', password: '12345' })
		})

		it('a new note can be created', function() {
		  cy.contains('new note').click()
		  cy.get('#newNote').type('a note created by cypress')
		  cy.contains('save').click()
		  cy.contains('a note created by cypress')
		})

		describe('and a note exists', function () {
			beforeEach(function () {
			//   cy.contains('new note').click()
			//   cy.get('#newNote').type('another note cypress')
			//   cy.contains('save').click()
				cy.createNote({
					content: 'another note cypress',
					important: false
				})
			})

			it('it can be made important', function () {
			  cy.contains('another note cypress').parent().find('button').as('theButton')
			  cy.get('@theButton').click()
			  cy.get('@theButton').should('contain', 'make not important')
			})
		})

		describe('and several notes exist', function () {
			beforeEach(function () {
			  cy.createNote({ content: 'first note', important: false })
			  cy.createNote({ content: 'second note', important: false })
			  cy.createNote({ content: 'third note', important: false })
			})

			it('one of those can be made important', function () {
			//   cy.contains('second note')
			// 	.contains('make important')
			// 	.click()

			//   cy.contains('second note')
			// 	.contains('make not important')
				// cy.contains('second note').parent().find('button').click()
				// cy.contains('second note').parent().find('button')
				// 	.should('contain', 'make not important')
				cy.contains('second note').parent().find('button').as('theButton')
  				cy.get('@theButton').click()
  				cy.get('@theButton').should('contain', 'make not important')
			})
		})
	})

})