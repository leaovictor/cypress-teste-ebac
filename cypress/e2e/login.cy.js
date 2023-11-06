import dadosLogin from '../fixtures/login.json'

context('Funcionalidade de login', () => {

    beforeEach('', () => {
        cy.visit('minha-conta/');
    })

    it('Deve fazer login com sucesso', () => {
        cy.fixture('login').then((loginData) => {
            cy.get('#username').type(loginData.login);
            cy.get('#password').type(loginData.password);
        })
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-MyAccount-content > :nth-child(2) > :nth-child(1)').should('have.text', 'aluno_ebac20Nome de ExibiçãoNome de Exibição');
        cy.get('.page-title').should('have.text', 'Minha conta');
    });

    it('Deve aparecer uma mensagem de erro ao inserir um email inválido', () => {
        cy.get('#username').type('usernameerrado@teste.com');
        cy.get('#password').type('senhaerrada');
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-error > li').should('have.text', '\n\t\t\tEndereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.\t\t');
    });

    it('Deve aparecer uma mensagem de erro ao inserir uma senha inválida', () => {
        cy.get('#username').type(dadosLogin.login);
        cy.get('#password').type('senhaerrada');
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-error > li').should('be.visible');
        cy.get('.woocommerce-error > li').should('have.text', '\n\t\t\tErro: a senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?\t\t');
    });

})