 //Aula 7
 //Exercício extra 2
  it('testa a página da política de privacidade de forma independente', ()=>{
    cy.visit('./src/privacy.html')
    
    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
})

//Aula 13
  //Exercício extra 4
  it.only('faz uma requisição HTTP', () =>{
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .should('Get', '200')
})