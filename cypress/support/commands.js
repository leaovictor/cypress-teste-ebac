import { faker } from '@faker-js/faker';

Cypress.Commands.add('cadastroFake', (email, password) => {
    // Essa constante armazena o e-mail faker para validar no cadastro
    const fakerEmail = faker.internet.email();

    cy.get('#reg_email').type(email || fakerEmail);
    cy.get('#reg_password').type(password || faker.internet.password());
    cy.get('.woocommerce-password-strength').should('be.visible');
    cy.get('.woocommerce-password-strength').should('have.text', 'Forte');
    cy.get(':nth-child(4) > .button').click();
    cy.get('.page-title').should('have.text', 'Minha conta');

    // Capturando o nome do usuário exibido no painel
    cy.get('.woocommerce-MyAccount-content > :nth-child(2) > :nth-child(1)').should('be.visible')
        .then(($element) => {
            const usernameOnPanel = $element.text();
            // Compare o nome de usuário no painel com o nome derivado do email (sem diferenciação entre maiúsculas e minúsculas)
            expect(usernameOnPanel.toLowerCase()).to.equal((email || fakerEmail).split('@')[0].toLowerCase());
        })
})
