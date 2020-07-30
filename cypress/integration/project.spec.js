const LETTER_INPUT_SELECTOR = 'input#carta-texto';
const LETTER_GENERATED_P_SELECTOR = 'p#carta-gerada';
const LETTER_GENERATED_SPANS_SELECTOR = 'p#carta-gerada>span';
const LETTER_ADD_BUTTON_SELECTOR = 'button#criar-carta';
const LETTER_COUNTER_P_SELECTOR = 'p#carta-contador';
const WORDS_SPLIT_CHARACTER = ' ';
const LETTER_BLANK_MESSAGE = 'Por favor, digite o conteúdo da carta.';
const ALLOWED_CLASSES = [
  'newspaper',
  'magazine1',
  'magazine2',
  'medium',
  'big',
  'reallybig',
  'rotateleft',
  'rotateright',
  'skewleft',
  'skewright'
];

const checkClass = (className, properties = []) => {
  cy.document().then((doc) => {
    const e = doc.createElement('div');
    e.className = className;
    doc.body.appendChild(e);
    cy.get(`div.${className}`).should(($el) => {
      properties.map(({ key, value, match }) => {
        if (match) {
          expect($el.css(key)).to.have.string(value);
        } else {
          expect($el).to.have.css(key, value);
        }
      });
    });
  });
};

const createLetter = (content) => {
  cy.get(LETTER_ADD_BUTTON_SELECTOR).should('exist');
  cy.get(LETTER_INPUT_SELECTOR).clear();

  cy.get(LETTER_INPUT_SELECTOR).type(content);
  cy.get(LETTER_ADD_BUTTON_SELECTOR).click();
};

const checkLetterContent = (content) => {
  createLetter(content);
  const contentList = content.split(WORDS_SPLIT_CHARACTER);

  cy.get(LETTER_GENERATED_SPANS_SELECTOR).should('have.length', contentList.length);
  cy.get(LETTER_GENERATED_SPANS_SELECTOR).each(($el, index) => {
    const span = $el[0];
    expect(span.innerText.toLowerCase()).to.be.equal(contentList[index]);
  });
};

describe('Deve haver um `input` com o `id="carta-texto"` onde o usuário poderá digitar o conteúdo da carta', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Existe um elemenento input com `id=carta-texto`', () => {
    cy.get(LETTER_INPUT_SELECTOR).should('exist');
  });
});

describe('Deve haver um parágrafo com o `id="carta-gerada"` onde o usuário verá o resultado de sua carta misteriosa', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Existe um elemento p com o `id="carta-gerada"`', () => {
    cy.get(LETTER_GENERATED_P_SELECTOR).should('exist');
  });
});

describe('Deve haver um botão com `id="criar-carta"` e ao clicar nesse botão, a carta misteriosa deve ser gerada', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Existe um elemento button com `id="criar-carta"`', () => {
    cy.get(LETTER_ADD_BUTTON_SELECTOR).should('exist');
  });
  
  it('Ao clicar no botão, a carta misteriosa deve ser gerada', () => {
    const letterContent1 = 'esta é uma carta com 7 palavras';
    checkLetterContent(letterContent1);

    const letterContent2 = 'esta é uma carta com 2 palavras a mais';
    checkLetterContent(letterContent2);
  });
});

describe('Ao criar uma carta através do botão `id="criar-carta"`, o `input` com `id="carta-texto"` deve permanecer com o texto digitado', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Ao criar uma carta através do botão `id="criar-carta"`, o `input` com `id="carta-texto"` deve permanecer com o texto digitado', () => {
    const letterContent = 'esta é uma outra carta';

    cy.get(LETTER_ADD_BUTTON_SELECTOR).should('exist');

    cy.get(LETTER_INPUT_SELECTOR).type(letterContent);
    cy.get(LETTER_ADD_BUTTON_SELECTOR).click();
    cy.get(LETTER_INPUT_SELECTOR).should('have.value', letterContent);
  });
});

describe("Se o usuário não preencher o campo ou preencher com apenas espaços vazios adicionar a mensagem 'Por favor, digite o conteúdo da carta.'", () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });
  
  it('Exibir a mensagem "Por favor, digite o conteúdo da carta." no elemento p com o `id="carta-gerada"', () => {
    const letterContent = ' ';

    cy.get(LETTER_INPUT_SELECTOR).type(letterContent);
    cy.get(LETTER_ADD_BUTTON_SELECTOR).click();

    cy.get(LETTER_GENERATED_P_SELECTOR).each(($el, index) => {
      const span = $el[0];
      expect(span.innerText.toLowerCase()).to.be.equal(LETTER_BLANK_MESSAGE.toLowerCase());
    });
  });
});
  
describe('Crie a classe `newspaper`', () => {
  it('Deve possuir a propriedade `backgroud-color` igual a rgb(250, 235, 215)', () => {
    const properties = [{
      key: 'background-color',
      value: 'rgb(250, 235, 215)'
    }];

    checkClass('newspaper', properties);
  }); 

  it('Deve possuir a propriedade `font-family` igual a "Times New Roman"', () => {
    const properties = [{
      key: 'font-family',
      value: 'Times New Roman',
      match: true
    }];

    checkClass('newspaper', properties);
  }); 

  it('Deve possuir a propriedade `font-weight` igual a 700', () => {
    const properties = [{
      key: 'font-weight',
      value: '700'
    }];

    checkClass('newspaper', properties);
  });
});

describe('Crie a classe `magazine1`', () => {
  it('Deve possuir a propriedade `background-color` igual a rgb(0, 128, 128)`', () => {
    const properties = [{
      key: 'background-color',
      value: 'rgb(0, 128, 128)'
    }];

    checkClass('magazine1', properties);
  });
  
  it('Deve possuir a propriedade `color` igual a rgb(255, 255, 255)`', () => {
    const properties = [{
      key: 'color',
      value: 'rgb(255, 255, 255)'
    }];

    checkClass('magazine1', properties);
  });

  it('Deve possuir a propriedade `font-family` igual a "Verdana"', () => {
    const properties = [{
      key: 'font-family',
      value: 'Verdana',
      match: true
    }];

    checkClass('magazine1', properties);
  });

  it('Deve possuir a propriedade `font-weight` igual a "900"', () => {
    const properties = [{
      key: 'font-weight',
      value: '900'
    }];

    checkClass('magazine1', properties);
  });

  it('Deve possuir a propriedade `text-transform` igual a "uppercase"`', () => {
    const properties = [{
      key: 'text-transform',
      value: 'uppercase'
    }];

    checkClass('magazine1', properties);
  });
});

describe('Crie a classe `magazine2`', () => {
  it('Deve possuir a propriedade `background-image` igual a "images/pink-pattern.png"', () => {
    const properties = [{
      key: 'background-image',
      value: 'images/pink-pattern.png',
      match: true
    }];
    
    checkClass('magazine2', properties);
  });

  it('Deve possuir a propriedade `color` igual a rgb(255, 0, 255)', () => {
    const properties = [{
      key: 'color',
      value: 'rgb(255, 0, 255)'
    }];
    
    checkClass('magazine2', properties);
  });

  it('Deve possuir a propriedade `font-family` igual a "Verdana"', () => {
    const properties = [{
      key: 'font-family',
      value: 'Verdana',
      match: true
    }];
    
    checkClass('magazine2', properties);
  });

  it('Deve possuir a propriedade `font-weight` igual a "900"', () => {
    const properties = [{
      key: 'font-weight',
      value: '900',
    }];
    
    checkClass('magazine2', properties);
  });
});

describe('Crie a classe `medium`', () => {
  it('Deve possuir a propriedade `font-size` igual a "20px"', () => {
    const properties = [{
      key: 'font-size',
      value: '20px'
    }];
    
    checkClass('medium', properties);
  });

  it('Deve possuir a propriedade `padding` igual a "8px"', () => {
    const properties = [{
      key: 'padding',
      value: '8px'
    }];
    
    checkClass('medium', properties);
  });
});

describe('Crie a classe `big`', () => {
  it('Deve possuir a propriedade `font-size` igual a "30px"', () => {
    const properties = [{
      key: 'font-size',
      value: '30px'
    }];
    
    checkClass('big', properties);
  });

  it('Deve possuir a propriedade `padding` igual a "10px"', () => {
    const properties = [{
      key: 'padding',
      value: '10px'
    }];
    
    checkClass('big', properties);
  });
});

describe('Crie a classe `reallybig`', () => {
  it('Deve possuir a propriedade `font-size` igual a "40px"', () => {
    const properties = [{
      key: 'font-size',
      value: '40px'
    }];
    
    checkClass('reallybig', properties);
  });

  it('Deve possuir a propriedade `padding` igual a "15px"', () => {
    const properties = [{
      key: 'padding',
      value: '15px'
    }];
    
    checkClass('reallybig', properties);
  });
});

describe('Crie a classe `rotateleft`', () => {
  it('Deve possuir a propriedade `transform` igual a "matrix(0.996195, -0.0871557, 0.0871557, 0.996195, 0, 0)"', () => {
    const properties =[{
      key: 'transform',
      value: 'matrix(0.996195, -0.0871557, 0.0871557, 0.996195, 0, 0)'
    }];

    checkClass('rotateleft', properties);
  });
});

describe('Crie a classe `rotateright`', () => {
  it('Deve possuir a propriedade `transform` igual a "matrix(0.996195, 0.0871557, -0.0871557, 0.996195, 0, 0)"', () => {
    const properties =[{
      key: 'transform',
      value: 'matrix(0.996195, 0.0871557, -0.0871557, 0.996195, 0, 0)'
    }];

    checkClass('rotateright', properties);
  });
});

describe('Crie a classe `skewleft`', () => {
  it('Deve possuir a propriedade `transform` igual a "matrix(1, 0, 0.176327, 1, 0, 0)"', () => {
    const properties =[{
      key: 'transform',
      value: 'matrix(1, 0, 0.176327, 1, 0, 0)'
    }];

    checkClass('skewleft', properties);
  });
});

describe('Crie a classe `skewright`', () => {
  it('Deve possuir a propriedade `transform` igual a "matrix(1, 0, -0.176327, 1, 0, 0)"', () => {
    const properties =[{
      key: 'transform',
      value: 'matrix(1, 0, -0.176327, 1, 0, 0)'
    }];

    checkClass('skewright', properties);
  });
});

describe('Adicione as classes de forma aleatória a fim de estilizar as palavras.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  const letterContent = 'essa é uma carta beeem grande com várias palavras que compõe uma carta que é beeem grande para que a possibilidade de um problema seja reduzida.';
  const first = [];
  const second = [];

  it('Ao criar uma carta deve possuir uma lista de classes aleatórias', () => {
    createLetter(letterContent);
    cy.get(LETTER_GENERATED_SPANS_SELECTOR).then(($el) => {
      $el.each((_index, span) => {
        const klasses = span.className.split(WORDS_SPLIT_CHARACTER);
        expect(ALLOWED_CLASSES).to.include.members(klasses);
        first.push(...klasses);
      });
    });
  });
    
    
  it('Ao criar uma segunda carta deve possuir uma lista de classes aleatórias', () => {
    createLetter(letterContent);
    cy.get(LETTER_GENERATED_SPANS_SELECTOR).then(($el) => {
      $el.each((_index, span) => {
        const klasses = span.className.split(WORDS_SPLIT_CHARACTER);
        expect(ALLOWED_CLASSES).to.include.members(klasses);
        second.push(...klasses);
      });
    });
  });
    
  it('As classes das duas cartas não podem ser exatamente iguais', () => { 
    expect(first).to.not.deep.equal(second);
  });
});

describe('Com uma carta misteriosa gerada, adicione a possibilidade de alterar o estilo de uma palavra específica ao clicar nela', () => {
  const letterContent = 'esta é uma carta';

  beforeEach(() => {  
    console.log("here");
    cy.visit('./index.html');
    createLetter(letterContent);
  });

  const contentList = letterContent.split(WORDS_SPLIT_CHARACTER);

  const first = [];
  const second = [];

  const wordIndex = Math.floor(Math.random() * contentList.length) + 1;
  const wordSelector = `${LETTER_GENERATED_SPANS_SELECTOR}:nth-child(${wordIndex})`;

  it('Ao clicar em uma carta deve gerar uma nova lista aleatória de classes', () => {
    cy.get(wordSelector).then(($el) => {
      const span = $el[0];
      const klasses = span.className.split(WORDS_SPLIT_CHARACTER);
      first.push(...klasses);
    })
  });

  it('Ao clicar novamente na mesma carta deve gerar uma nova lista aleatória de classes diferente da lista anterior', () => {
    cy.get(wordSelector).then(($el) => {
      const span = $el[0];
      const klasses = span.className.split(WORDS_SPLIT_CHARACTER);
      second.push(...klasses);
    });

    expect(first).to.not.deep.equal(second);
  });  
});

describe('Deve haver um parágrafo com o `id="carta-contador"` onde existirá um contador de palavras', () => {
  it('Existe um elemento p com o `id="carta-contador"`', () => {
    cy.get(LETTER_COUNTER_P_SELECTOR).should('exist');
  });

  it('Ao criar uma carta deve atualizar o p com o `id="carta-contador" com o número de palavras da carta (valor numérico).', () => {
    const letterContent1 = 'esta é uma carta com 7 palavras';
    const letter1Counter = letterContent1.split(WORDS_SPLIT_CHARACTER).length;
    createLetter(letterContent1);
    cy.get(LETTER_COUNTER_P_SELECTOR).should('have.text', letter1Counter.toString());

    const letterContent2 = 'esta é uma carta com 2 palavras a mais';
    const letter2Counter = letterContent2.split(WORDS_SPLIT_CHARACTER).length;
    createLetter(letterContent2);
    cy.get(LETTER_COUNTER_P_SELECTOR).should('have.text', letter2Counter.toString());
  });
});

