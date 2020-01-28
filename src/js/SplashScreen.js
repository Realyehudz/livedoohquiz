import EventManager from '../../dist/lib/bean-master/bean.min';

class SplashSreen {
  constructor(quizContainer) {
    this.quizContainer = quizContainer;
    this.createHtml();
    this.setupEvents();
  }

  createHtml() {
    this.container = document.createElement('div');
    this.container.className = 'splashScreenContainer display-flex-center';
    this.container.innerHTML = `
      <div class="logo samsungLogo"></div>
      <div class="logo tizenLogo"></div>
      <div class="logo livedoohLogo"></div>
      <div class="start-btn">Start</div>
    `;
    document.body.appendChild(this.container);
  }

  setupEvents() {
    let startBtn = document.querySelector('.start-btn');
    EventManager.on(startBtn, 'click touchstart', ()=> {
      setTimeout(()=> {
        this.container.style.display = 'none';
        this.quizContainer.show();
      }, 500);
    });
  }
}

export default SplashSreen;