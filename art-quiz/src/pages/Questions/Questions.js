import QuestionsHtml from './Questions.html';

export class Questions {
  constructor() {
    this.currentQuestion = 0;
    this.localImgMap = JSON.parse(localStorage.getItem('imgMap'));
  }

  async render () {
    return QuestionsHtml;
  }

  async createImg () {
    const newImg = new Image();
    newImg.src = `../../assets/img/full-img/${this.localImgMap[localStorage.categorie][this.currentQuestion].imageNum}full.jpg`;
    newImg.alt = this.localImgMap[localStorage.categorie][this.currentQuestion].imageNum;
    const imgContainer = document.querySelector('.questions__img');
    imgContainer.replaceChild(newImg, imgContainer.firstChild);
  }

  async createAnswer () {
    const buttonsAnswer = document.querySelectorAll('.questions__btn');
    let arrAnswers = [];
    
    arrAnswers.push(this.localImgMap[localStorage.categorie][this.currentQuestion].author);
    for (let i = 0; arrAnswers.length < 4; i++) {
      if (arrAnswers[0] !== this.localImgMap[Math.floor(Math.random() * 12)][Math.floor(Math.random() * 10)].author) {
        arrAnswers.push(this.localImgMap[Math.floor(Math.random() * 12)][Math.floor(Math.random() * 10)].author)
      }
    }
  
    arrAnswers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < buttonsAnswer.length; i++) {
      buttonsAnswer[i].textContent = arrAnswers[i];
    }
  }

  async checkAnswer () {
    const questionsButtons = document.querySelector('.questions__btns');
    const answerIcon = document.querySelector('.answer__icon');

    questionsButtons.addEventListener('click', event => {
      let btnTarget = event.target.closest('.questions__btn');
      console.log(btnTarget.textContent)
      if (btnTarget) {
        if (btnTarget.textContent !== this.localImgMap[localStorage.categorie][this.currentQuestion].author) {
          answerIcon.classList.add('wrong')
        }
        if (this.currentQuestion === 9) {
          this.currentQuestion = 0;
        } else {
          this.currentQuestion++;
        }
        this.finishAnswer()
      } 
    }, { once: true })
  }

  async finishAnswer () {
    const btnNext = document.querySelector('.answer__btn');
    const resultQuestion = document.querySelector('.answer');
    const answerIcon = document.querySelector('.answer__icon');

    resultQuestion.classList.add('show');
    btnNext.addEventListener('click', () => {
      resultQuestion.classList.remove('show');
      answerIcon.classList.remove('wrong')
      this.after_render();
    })
  }

  async after_render () {
    const btnSetting = document.querySelector('.header__btn')
    const btnSetClose = document.querySelector('.questions__btn-close');

    await this.createImg();
    await this.createAnswer();
    await this.checkAnswer();

    btnSetting.classList.add('hide');
    window.addEventListener('hashchange', () => {
      this.currentQuestion = 0;
    });
    btnSetClose.addEventListener('click', () => {
      window.location.hash = '/';
    })
  };
}
