import { faker } from '@faker-js/faker';

describe('Funcionalidade cadastro', () => {
    beforeEach(() => {
        cy.visit('minha-conta');
    });

    it('Deve fazer o pré-cadastro com sucesso usando faker', () => {
        cy.cadastroFake();
    });

    it.only('Deve completar o cadastro com sucesso', () => {
        cy.cadastroFake();

        const nomeFake = faker.person.firstName();
        const sobrenomeFake = faker.person.lastName();

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click();
        cy.get('#account_first_name').type(nomeFake);
        cy.get('#account_last_name').type(sobrenomeFake);
        cy.get('#account_email').click();
        cy.get('.woocommerce-Button').click();
        cy.get('.woocommerce-message').should('have.text', '\n\t\tDetalhes da conta modificados com sucesso.\t');
    });
});
