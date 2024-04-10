describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Mr Tester ',
      username: 'tester',
      password: 'sekret'
    }
    const user2 = {
      name: 'Mr Tester 2',
      username: 'tester 2',
      password: 'sekret2'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Blog App')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input#username').type('tester')
      cy.get('input#password').type('sekret')
      cy.contains('login').click()
      cy.contains('Mr Tester logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input#username').type('tester')
      cy.get('input#password').type('badPass')
      cy.contains('login').click()
      cy.get('html').should('not.contain', 'Mr Tester logged in')
      cy.get('.error').should('contain','invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#new-blog_title').type('a blog created by cypress')
      cy.get('#new-blog_author').type('Tester 2')
      cy.get('#new-blog_url').type('http://www.localhost-test.com')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })

    it('user can like blog', function () {
      cy.createBlog({
        'title': 'a blog created by cypress',
        'author': 'Tester 2',
        'url': 'http://www.localhost-test.com'
      })
      cy.contains('a blog created by cypress').parent().find('button').as('viewButton-1')
      cy.get('@viewButton-1').click()
      cy.contains('a blog created by cypress').parent().get('.blog-info').as('blogInfo-1')
      cy.get('@blogInfo-1').contains('like').as('likeButton-1')
      cy.get('@blogInfo-1').contains('likes: 0')
      cy.get('@likeButton-1').click()
      cy.get('@blogInfo-1').contains('likes: 1')
    })

    it('user can delete his own blog', () => {
      cy.createBlog({
        'title': 'a blog created by cypress',
        'author': 'Tester 2',
        'url': 'http://www.localhost-test.com'
      })
      cy.contains('a blog created by cypress').parent().find('button').as('viewButton-1')
      cy.get('@viewButton-1').click()
      cy.contains('a blog created by cypress').parent().get('.blog-info').as('blogInfo-1')
      cy.get('@blogInfo-1').contains('delete').as('deleteButton-1')
      cy.get('@deleteButton-1').click()
      cy.get('html').should('not.contain', 'a blog created by cypress')
    })

    it('user can delete his own created blogs', function () {
      cy.createBlog({
        'title': 'a blog created by cypress',
        'author': 'Tester',
        'url': 'http://www.localhost-test.com'
      })
      cy.contains('log out').click()
      cy.login({ username: 'tester 2', password: 'sekret2' })
      cy.createBlog({
        'title': 'a blog created by cypress 2',
        'author': 'Tester 2',
        'url': 'http://www.localhost-test.com'
      })
      cy.contains('a blog created by cypress').parent().find('button').as('viewButton-1')
      cy.get('@viewButton-1').click()
      cy.contains('a blog created by cypress').parent().children('.blog-info').as('blogInfo-1')
      cy.get('@blogInfo-1').should('not.contain', 'delete')

      cy.contains('a blog created by cypress 2').parent().find('button').as('viewButton-2')
      cy.get('@viewButton-2').click()
      cy.contains('a blog created by cypress 2').parent().children('.blog-info').as('blogInfo-2')
      cy.get('@blogInfo-2').should('contain', 'delete')
    })
  })
})