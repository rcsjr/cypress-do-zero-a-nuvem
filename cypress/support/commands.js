Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'NomePadrão',
    lastName: 'SobrenomePadrão',
    email: 'emailpadrao@teste.com',
    text: 'Texto Padrão'
}) =>{
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email) 
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})