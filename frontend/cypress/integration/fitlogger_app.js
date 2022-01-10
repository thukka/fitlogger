describe('Fitlogger', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {
      name: 'teppo testaaja',
      password: 'testi',
      email: 'testi'
    };
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

    it('Entry can be deleted', function () {
      cy.get('#input-date').type('2022-12-01');
      cy.get('#input-distance').type('10');
      cy.get('#input-duration').type('35');
      cy.get('#input-difficulty').type('5');
      cy.contains('Submit').click();
      cy.contains('New entry added!');
      cy.contains('Stats').click();
      cy.get('#delete-icon').click();
    });

    describe('Errors are shown if wrong inputs are given', function() {
      beforeEach(function() {
        cy.get('#input-date').type('2022-01-01');
      });

      it('Distance field contains letters', function() {
        cy.get('#input-distance').type('foobar');
        cy.get('#input-duration').type('35');
        cy.get('#input-difficulty').type('5');
        cy.contains('Submit').click();
        cy.get('html').should('contain', 'Only numbers are allowed');
      });

      it('Duration field contains letters', function() {
        cy.get('#input-distance').type('10');
        cy.get('#input-duration').type('foobar');
        cy.get('#input-difficulty').type('5');
        cy.contains('Submit').click();
        cy.get('html').should('contain', 'Only numbers are allowed');
      });

      it('Difficulty field contains letters', function() {
        cy.get('#input-distance').type('10');
        cy.get('#input-duration').type('35');
        cy.get('#input-difficulty').type('foobar');
        cy.contains('Submit').click();
        cy.get('html').should('contain', 'Only numbers are allowed');
      });
    });
  });

  describe('User can\'t access website if auth failed', function() {
    beforeEach(function () {
      cy.get('#email').type('testi');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('html').should('contain', 'Invalid username or password');
    });

    it('User cannot access statpage', function() {
      cy.visit('http://localhost:3000/stats');
      cy.get('html').should('not.contain', 'Total distance');
    });

    it('User cannot access homepage', function() {
      cy.visit('http://localhost:3000/stats');
      cy.get('html').should('not.contain', 'Hello teppo testaaja :)');
    });
  });
});