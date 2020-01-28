import EventManager from '../../dist/lib/bean-master/bean.min';
import Form from '../js/Form';

class QuizContainer {
  constructor() {
    this.createHtml();
  }


/**
 * Basic HTML Structure for the quiz
 */
  createHtml() {
    this.container = document.createElement('div');
    this.container.className = 'container';
    this.container.innerHTML = `
      <div class="quiz-container display-flex-center">
        <div class="question-text display-flex-center">What would you say cross-sells best when magazines and publications are selling a lot?</div>
        <ul id="questionContainer" class="display-flex-center"></ul> 
      </div>
    `;

    document.body.appendChild(this.container);
    this.createButtons();
  }

  /**
   * Creates the buttons for the quiz
   */
  createButtons() {
    let answers = ['Chocolates', 'Coffee', 'Snacks', 'Donuts'];
    let randomizedAnswers = this.shuffle(answers);
    let num = 0;
    let initLetter = '`';
    for (let i=0; i<randomizedAnswers.length; i++) {
      let letter = String.fromCharCode(initLetter.charCodeAt(0) + 1);
      initLetter = letter;
      let button = document.createElement('li');
      button.id = 'answer-btn';
      button.className = 'display-flex-center';
      button.innerText = letter + '.  ' + randomizedAnswers[i];
      if (randomizedAnswers[i] === 'Coffee') {
        let check = document.createElement('div');
        check.className = 'check hidden';
        button.appendChild(check);
      } else {
        let wrong = document.createElement('div');
        wrong.innerText = 'X';
        wrong.className = 'wrong hidden';
        button.appendChild(wrong);
      }
      document.querySelector('ul').appendChild(button);
    }
  }
  /**
   * Shuffles the array to display the order of the answer dynimically
   * @param {answers} array 
   */
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  showNextButton() {
    let nextButton = document.createElement('div');
    nextButton.className = 'nextButton';
    nextButton.innerText = 'NEXT';
    this.container.appendChild(nextButton);

    EventManager.on(nextButton, 'click touchstart', ()=> {
      this.hide();
      new Form();
    });
  }

  show() {
    document.querySelector('#questionContainer').classList.add('fadeInUp');
    document.querySelector('.question-text').classList.add('fadeInDown');
  }

  hide() {
    this.container.style.display = 'none';
  }
}

export default QuizContainer;