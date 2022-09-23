describe('Navigation', () => {
  it('should navigate to main page', () => {
    cy.visit('/')

    cy.get('[data-testid="load-more-button"]').should('exist')
    cy.title().should('equal', 'Lots of Cats')
    cy.get('[data-testid="grid-image"]').should('have.length', Cypress.env('CLOUDINARY_MAX_RESULTS'))
  })
})
