const doctorButton = document.getElementById('button-doctor');
const coachButton = document.getElementById('button-coach');
const appButton = document.getElementById('button-app');
const medicationButton = document.getElementById('button-medication');
const communityButton = document.getElementById('button-community');

const doctorCard = document.getElementById('card-doctor');
const coachCard = document.getElementById('card-coach');
const appCard = document.getElementById('card-app');
const medicationCard = document.getElementById('card-medication');
const communityCard = document.getElementById('card-community');

const cards = document.querySelectorAll('.body__card');
const buttons = document.querySelectorAll('.info__button');
const cardsContainer = document.querySelector('.body');

const cardsContainerPaddingTop = 150;
let isScrolling = false;

const mediaQuery = window.matchMedia("(max-width: 1024px)");

const buttonClickHandle = (cardToScroll, clickedButton, modifier) => {
  if (mediaQuery.matches) {
    buttons.forEach(btn => btn.classList.add('info__button--disabled'));
    cards.forEach(card => card.id.includes(modifier)
        ? card.classList.remove('card-hidden')
        : card.classList.add('card-hidden')
      );

    clickedButton.classList.remove('info__button--disabled');

    cardsContainer.className = 'body';
    cardsContainer.classList.add(`body--${modifier}`);
  } else {
    isScrolling = true;

    cardsContainer.scrollTo({
      top: cardToScroll.offsetTop - cardsContainerPaddingTop + 5,
      behavior: 'smooth'
    });

    buttons.forEach(btn => btn.classList.add('info__button--disabled'));

    clickedButton.classList.remove('info__button--disabled');

    cardsContainer.className = 'body';
    cardsContainer.classList.add(`body--${modifier}`);

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
};

doctorButton.addEventListener(
  'click',
  () => buttonClickHandle(doctorCard, doctorButton, 'doctor'),
);

coachButton.addEventListener(
  'click',
  () => buttonClickHandle(coachCard, coachButton, 'coach'),
);

appButton.addEventListener(
  'click',
  () => buttonClickHandle(appCard, appButton, 'app'),
);

medicationButton.addEventListener(
  'click',
  () => buttonClickHandle(medicationCard, medicationButton, 'medication'),
);

communityButton.addEventListener(
  'click',
  () => buttonClickHandle(communityCard, communityButton, 'community'),
);

cardsContainer.addEventListener('scroll', () => {
  if (isScrolling) return;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardTop = rect.top;
    const cardBottom = rect.bottom;

    if (cardTop >= 0 && cardBottom <= window.innerHeight) {
      cardsContainer.className = 'body';

      const classModifier = card.id.split('-')[1];

      cardsContainer.classList.add(`body--${classModifier}`);

      buttons.forEach(button => button.id.includes(classModifier)
        ? button.classList.remove('info__button--disabled')
        : button.classList.add('info__button--disabled')
      );
    }
  });
});
