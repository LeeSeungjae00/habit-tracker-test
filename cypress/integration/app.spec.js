/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('habit tracer', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('renders', () => {
        cy.findByText('Habit Tracker').should('exist');
    })
    it('total habits count is 0', () => {
        cy.findAllByTestId('total-count').should('have.text', '0');
    })

    it('display three habits', () => {
        cy.findAllByTestId('habit-name').should('have.length', 3);
    })

    it('add new habit', () => {
        cy.findByPlaceholderText('Habit').type('Testing');
        cy.findByText('Add').click();

        cy.findAllByTestId('habit-name')
            .should('have.length', 4)
            .last()
            .should('have.text', "Testing");
        cy.findAllByTestId('habit-count')
            .should('have.length', 4)
            .last()
            .should('have.text', "0");
    })

    it('add new habit and increase habit count', () => {
        cy.findByPlaceholderText('Habit').type('Testing');
        cy.findByText('Add').click();

        cy.findAllByTitle("increase").first().click();
        cy.findAllByTitle("increase").last().click();

        cy.findAllByTestId('habit-count').first().should('have.text', '1')
        cy.findAllByTestId('habit-count').last().should('have.text', '1')

        cy.findAllByTestId('total-count').should('have.text', '2');
    })

    it('add new habit and increase and decrease habit count', () => {
        cy.findByPlaceholderText('Habit').type('Testing');
        cy.findByText('Add').click();

        cy.findAllByTitle("increase").first().click();
        cy.findAllByTitle("increase").last().click();
        cy.findAllByTitle("decrease").last().click();
        cy.findAllByTitle("decrease").last().click();

        cy.findAllByTestId('habit-count').first().should('have.text', '1')
        cy.findAllByTestId('habit-count').last().should('have.text', '0')

        cy.findAllByTestId('total-count').should('have.text', '1');
    })

    it('reset all', () => {
        cy.findByPlaceholderText('Habit').type('Testing');
        cy.findByText('Add').click();

        cy.findAllByTitle("increase").first().click();
        cy.findAllByTitle("increase").last().click();
        cy.findAllByTitle("increase").last().click();
        cy.findAllByTitle("increase").last().click();



        cy.findByText('Reset All').click();

        cy.findAllByTestId('habit-count').each((item) => {
            cy.wrap(item).should('have.text', '0');
        })
        cy.findAllByTestId('total-count').should('have.text', '0');

    })

    it('deltes an item' , () => {
        cy.findAllByTitle('delete').first().click();
        cy.findAllByTestId('habit-name').findByText('Reading').should('not.exist')
    })
})
