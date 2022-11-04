/// <reference types="cypress" />



describe('Ongs', () => {
    it.skip('deve fazer um cadastro', () => {
        cy.visit('https://bethehero-frontend.netlify.app/register')

        //cy.get busca um elemento
        //.type - insere um elemento

        cy.get('[placeholder="Nome da ONG"]').type('Dogs queridos');
        cy.get('[type="email"]').type('dogs@gmail.com');
        cy.get('[placeholder="Whatsapp"]').type('11999999999');
        cy.get('[placeholder="Cidade"]').type('Osasco');
        cy.get('[placeholder="UF"]').type('SP');

      // routing
      // start server com cy.server()
      // criar uma rota com cy.route()
      // atribuir rota a um alias
      // esperar com cy.wait e fazer uma validação
        cy.server();
        cy.route('POST', '**/ongs').as('postOng');
        cy.get('.button').click();

        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

  

    });

    it ('deve fazer um teste no sistema', () => {
        cy.request({
            method: 'POST',
            url: 'https://bethehero-frontend.netlify.app/register',
            body: {
                name: "Dogs queridos",
                email: "dogs@gmail.com",
                whatsapp: "11999999999",
                city: "Osasco",
            }  uf: "SP"
        }).then(response => {
            cy.log(response.body.id);
        })
    });
})   
    
