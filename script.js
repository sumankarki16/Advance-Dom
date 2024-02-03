'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


///////////////////////////////////////
// Modal window



const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


////////////////////////////////////////////////////
////////////////////////////////////////////////////



//// Button Scrolling //////////////

btnScrollTo.addEventListener('click',function(e){
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('current scroll (X/Y)',window.scrollX,window.scrollY);


  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);
/* 
  window.scrollTo({
    left: s1coords.left + window.scrollX, 
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
 */

  section1.scrollIntoView({behavior: 'smooth'});

});

////////////////////////////////////////////////////
////////////////////////////////////////////////////
/////////// Page Navigation
/* 
document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click',function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  });
});
 */

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

////////////////////////////////////////////////////
/////////// Tabbed Component

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;
  
  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'))
  
  //Active Tab
  clicked.classList.add('operations__tab--active');

  //Activate Content Area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});



////////////////////////////////////////////////////
/* 
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');


const allSelections = document.querySelectorAll('.section');
console.log(allSelections);


// creating and inserting elements

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use some functionality';

message.innerHTML = 'We use cookied for improved functionality amd analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);

//header.append(message.cloneNode(true));

document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
});


// Style

message.style.backgroundColor = '#37383d';
message.style.width = '105%';
 */

