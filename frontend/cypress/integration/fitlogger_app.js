describe('Fitlogger', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {
      name: 'teppo testaaja',
      password: 'testi',
      email: 'testi'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Frontpage opens', function () {
    cy.contains('Sign in');
  });

  it('Error message is shown when wrong credentials are used', function () {
    cy.get('#email').type('testi');
    cy.get('#password').type('test');
    cy.get('#login-button').click();
    cy.contains('Invalid username or password');
  });

  it('User can log in', function () {
    cy.get('#email').type('testi');
    cy.get('#password').type('testi');
    cy.get('#login-button').click();
    cy.contains('Hello teppo testaaja :)');
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#email').type('testi');
      cy.get('#password').type('testi');
      cy.get('#login-button').click();
    });

    it('New entry can be created', function () {
      cy.get('#input-date').type('2022-12-01');
      cy.get('#input-distance').type('10');
      cy.get('#input-duration').type('35');
      cy.get('#input-difficulty').type('5');
      cy.contains('Submit').click();
      cy.contains('New entry added!');
    });

    it.only('Entry can be deleted', function () {
      cy.get('#input-date').type('2022-12-01');
      cy.get('#input-distance').type('10');
      cy.get('#input-duration').type('35');
      cy.get('#input-difficulty').type('5');
      cy.contains('Submit').click();
      cy.contains('New entry added!');
      cy.contains('Stats').click();
      cy.get('#delete-icon').click();
    });
  });
});