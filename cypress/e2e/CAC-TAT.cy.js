describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  
  //Exercício 1 e Exercício extra 1-> Delay
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longtext = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',10)

    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Junior')
    cy.get('#email').type('robson@teste.com') 
    cy.get('#open-text-area').type(longtext, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })
  //Exercício extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#email').type('robsonteste.com') 
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')    
  })
  //Exercício extra 3
  it('validar se um valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('#phone')
      .type('abcdefghijklmnopqrstuvwxyz')
      .should('have.value','')
  })
  //Exercício extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longtext = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',10)

    cy.get('#firstName').type('Robson')
    cy.get('#lastName').type('Junior')
    cy.get('#email').type('robson@teste.com') 
    cy.get('#open-text-area').type(longtext, {delay: 0})
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })
  //Exercício extra 5
  it('preencher e limpar os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Robson')
      .should('have.value','Robson')
      .clear()
      .should('have.value','')
    cy.get('#lastName')
      .type('Junior')
      .should('have.value','Junior')
      .clear()
      .should('have.value','')
    cy.get('#email')
      .type('robson@teste.com')
      .should('have.value','robson@teste.com')
      .clear()
      .should('have.value','')
    cy.get('#phone')
      .type('123456789')
      .should('have.value','123456789')
      .clear()
      .should('have.value','')
  })

  //Exercício extra 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    
  })

  //Exercício extra 7.1
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
    
  })

  //Exercício extra 7.2
  it('envia o formuário com sucesso usando um comando customizado parrte 2', () => {
    const data ={
      firstName: 'Robson',
      lastName: 'Lima e Silva Filho',
      email: 'robson@teste.com',
      text: 'Teste'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
    
  })

  //Exercício extra 7.3
  it('envia o formuário com sucesso usando um comando customizado parrte 3', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
    
  })

  //Exercício extra 7.3
  // Substituir o "cy.get('button[type="submit"]').click()" por "cy.contains('button', 'Enviar').click()" e todos os exercios

  //Aula 3

  //Exercício 1
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') 
      .should('have.value', 'youtube')
  })

  //Exercício Extra 1
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria') 
      .should('have.value', 'mentoria')
  })

  //Exercício Extra 2
  it('seleciona um produto (Blog) por seu índice)', () => {
    cy.get('#product')
      .select(1) 
      .should('have.value', 'blog')
  })

  //Aula 4

  //Exercício 1
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
      
  })

  //Exercício Extra 1
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')  
        })
  })

  //Aula 5
  //Exercício 1
  it('marca ambos checkboxes, depois desmarca o último', () =>{
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  
  //Exercício Extra 1
  //Realizado a troca do '.click' para '.check' no teste "exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário"
  

  //Aula 6
  //Exercício 1
  it('seleciona um arquivo da pasta fixtures',() =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input =>{
        expect(input[0].files[0].name).to.eq('example.json')
      })
      // .then(($input) => {
      //   expect($input[0].files[0].name).to.eq('example.json')})
  })

  //Exercício Extra 1
  it('seleciona um arquivo simulando um drag-and-drop',() =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json',{ action: 'drag-drop' })
      .should(input =>{
        expect(input[0].files[0].name).to.eq('example.json')
      })
      // .then((input) => {
      //   expect(input[0].files[0].name).to.eq('example.json')})
  })

  //Exercício Extra 2
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',() =>{
    cy.fixture('example.json').as('arquivoExemplo')
    cy.get('#file-upload')
      .selectFile('@arquivoExemplo')
      .should(input =>{
        expect(input[0].files[0].name).to.eq('example.json')
      })
      // .then((input) => {
      //   expect(input[0].files[0].name).to.eq('example.json')})
  })

  //Aula 7
  //Exercício 1
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
    cy.contains('a','Política de Privacidade')
      .should('have.attr', 'href','privacy.html')
      .and('have.attr','target', '_blank')
  })

  //Exercício extra 1
  it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
    cy.contains('a','Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')  
  })

  
})

