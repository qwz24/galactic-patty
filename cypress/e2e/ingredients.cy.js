describe('Тестирование модального окна с деталями ингредиента', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.viewport(2000, 1080);

    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('Открытие модального окна с деталями ингредиента', () => {
    cy.get('[data-test="ingredient"]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-test="modal"]').should('exist');
    cy.get('[data-test="modal"]').contains('Детали ингредиента');
    cy.get('[data-test="modal"]').contains('Краторная булка N-200i');
  });

  it('Закрытие модального окна по кнопке', () => {
    cy.get('[data-test="ingredient"]')
      .contains('Краторная булка N-200i')
      .click();

    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="modal"]').should('not.exist');
  });

  it('Закрытие модального окна кликом на подложку', () => {
    cy.get('[data-test="ingredient"]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-test="modal-overlay"]').should('exist');
    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.get('[data-test="modal"]').should('not.exist');
  });

  it('Закрытие модального окна нажатием ESC', () => {
    cy.get('[data-test="ingredient"]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('body').type('{esc}');
    cy.get('[data-test="modal"]').should('not.exist');
  });
});
