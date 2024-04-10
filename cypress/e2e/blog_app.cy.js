describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Blog App')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})