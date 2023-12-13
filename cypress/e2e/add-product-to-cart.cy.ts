describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add ti to cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product/')
    cy.contains('Adicionar ao Carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated product on cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product/')

    cy.contains('Adicionar ao Carrinho').click()
    cy.contains('Adicionar ao Carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should bea able to search for a product and it to the cart', () => {
    cy.get('input[name=query]').type('moletom').parent('form').submit()

    cy.location('pathname').should('include', '/search')

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product/')

    cy.contains('Adicionar ao Carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })
})
