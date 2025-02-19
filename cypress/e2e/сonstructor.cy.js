describe('Тестирование страницы "Конструктор"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.viewport(2000, 1080);

    cy.setCookie('accessToken', 'test-access-token');
    cy.setCookie('refreshToken', 'test-refresh-token');

    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.wait('@getIngredients');
  });

  it('Перетаскивание ингредиента в конструктор и оформление заказа', () => {
    const dragAndDrop = (name, dropContainer) => {
      cy.get('[data-test="ingredient"]').contains(name).trigger('dragstart');
      cy.get(dropContainer).trigger('drop');
      cy.get(dropContainer).trigger('dragend');
    };

    dragAndDrop('Краторная булка N-200i', "[data-test='constructor']");
    dragAndDrop('Соус фирменный Space Sauce', "[data-test='constructor']");
    dragAndDrop(
      'Биокотлета из марсианской Магнолии',
      "[data-test='constructor']"
    );

    cy.get('[data-test="order-button"]').click();
    cy.wait('@getUser');
    cy.get('[data-test="order-button"]').click();
    cy.wait('@postOrder');
    cy.get('[data-test="order-details"]').should('exist');
    cy.get('[data-test="order-details"]').contains(12345);
    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="modal"]').should('not.exist');
  });

  afterEach(() => {
    cy.clearCookies();
  });
});
