'use strict';

class Calculator {
  ///////// ELEMENTS
  keypad = document.querySelector('.keypad');
  screen = document.querySelector('.screen__operation__result');
  equal = document.querySelector('.keypad__btn--equal');
  clear = document.querySelector('.keypad__btn--clear');
  toggle = document.querySelector('.toggle');
  mobile = document.querySelector('.mobile');

  ///////// VARIABLES
  currentRes = '';
  previousRes = '';
  #notAllowed = ['%', '/', '*'];

  ///////// CLASS STRUCTOR

  constructor() {
    this.keypad.addEventListener('click', this._showScreen.bind(this));
    this.equal.addEventListener('click', this._calcResult.bind(this));
    this.clear.addEventListener('click', this._reset.bind(this));
    this.toggle.addEventListener('click', this._appMode.bind(this));
  }

  _showScreen(e) {
    const btn = e.target.closest('.keypad__btn');

    if (!btn) return;

    const { value } = btn.dataset;

    if (value !== '=' && value !== 'ac') {
      this.currentRes += value;
      this.screen.textContent = this.previousRes + this.currentRes;
    }

    // Check if first sign is not-allowed
    if (
      this.#notAllowed.includes((this.previousRes + this.currentRes).charAt(0))
    ) {
      return (this.screen.textContent = 'ERROR');
    }
  }

  _calcResult() {
    const answer = eval(this.previousRes + this.currentRes);
    this.screen.textContent = answer;
    this.previousRes = answer;
    this.currentRes = '';
  }

  _reset() {
    this.currentRes = '';
    this.previousRes = '';
    this.screen.textContent = '';
  }

  _appMode(e) {
    // Get target icon
    const icon = e.target.closest('.toggle__icon');
    if (!icon) return;

    // Remove active class for all toggle icons
    document
      .querySelectorAll('.toggle__icon')
      .forEach((icon) => icon.classList.remove('toggle__icon--active'));

    // Add active class for selected icon
    icon.classList.add('toggle__icon--active');

    // Get current icon mode
    const { mode } = icon.dataset;
    mode === 'light'
      ? this.mobile.classList.add('mobile--light')
      : this.mobile.classList.remove('mobile--light');
  }
}

class App {
  timerLable = document.querySelector('.mobile__time');

  constructor() {
    this._setTime();
  }

  _setTime() {
    const hour = new Date().getHours();
    const mins = new Date().getMinutes();

    this.timerLable.textContent = `${hour.toString().padStart(2, 0)} : ${mins
      .toString()
      .padStart(2, 0)}`;
  }
}

const app = new App();
const calculator = new Calculator();
