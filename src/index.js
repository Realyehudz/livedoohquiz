import './css/main.css';
import './css/splashSreen.css';
import EventManager from '../dist/lib/bean-master/bean.min';
import SplashScreen from './js/SplashScreen';
import QuizContainer from './js/QuizContainer';
import Form from './js/Form';

let quizContainer = new QuizContainer();
new SplashScreen(quizContainer);

/**
 * Basic Quiz button functionality
 */

 let buttons = document.querySelectorAll('#answer-btn');
 
// Loops through the buttons array
 for (let i=0; i < buttons.length; i++) {
  // Get the correct answer
  let correctAnswer = document.querySelector('.check').parentElement;

  // Add the click-tap event to the buttons
  EventManager.on(buttons[i], 'click touchStart', ()=> {

    // User clicked on the correct answer
    if (buttons[i].innerText.includes('Coffee')) {
      buttons[i].classList.add('correct-answer', 'bounce');
      document.querySelector('.check').classList.remove('hidden');
    } else {

      // user clicked on the wrong answer
      buttons[i].classList.add('incorrect-answer', 'shake');
      let wrongChecks = document.querySelectorAll('.wrong');
      for (let i=0; i<wrongChecks.length; i++) {
        wrongChecks[i].classList.remove('hidden');
      }

      // shows the correct answers after clicking on the wrong answer
      setTimeout(()=> {
        correctAnswer.classList.add('correct-answer', 'bounce');
        document.querySelector('.check').classList.remove('hidden');
      }, 1000);
    }

    // Disables the buttons
    for (let i=0; i < buttons.length; i++) {
      buttons[i].classList.add('disable-click');
    }

    setTimeout(()=> {
      quizContainer.showNextButton();
      // new Form();
    }, 2000);
  });
 }