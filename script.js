'use strict';

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

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
/////////// Menu Fade Animation
/* 
nav.addEventListener('mouseover', function (e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout',function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});
 */
/* const handleHover = function(e, opacity){ */
const handleHover = function(e){
  
  if(e.target.classList.contains('nav__link')){
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      /* if (el !== link) el.style.opacity = opacity; */
      if (el !== link) el.style.opacity = this;
    });
    /* logo.style.opacity = opacity; */
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));

/* nav.addEventListener('mouseover',function(e){
  handleHover(e, 0.5);
}); */

nav.addEventListener('mouseout', handleHover.bind(1));

/* nav.addEventListener('mouseout',function(e){
  handleHover(e, 1);
}); */

////////////////////////////////////////////////////
/////////// Sticky Navigation

/* const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function(){

if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
else nav.classList.remove('sticky');


}); */


//// Sticky navigation : Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver 
(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: '-90px',
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////////////////////////////////////////
/////////// Reveal Section

const revealSection = function(entries, observer) {
  const [entry] = entries;
  // console.log(entries);

  if(!entry.isIntersecting) return;  
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};



const sectionObserver = new IntersectionObserver(revealSection , {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});


////////////////////////////////////////////////////
/////////// Lazy Image Loading

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');

  });

  observer.unobserve(entry.target);
  
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
} );

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////
/////////// Slider

const slider = function(){
  const slides = document.querySelectorAll('.slide');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow  = 'visible';


  //Functions
  const createDots = function() {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // createDots();
  
  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }

  // activateDot(0);

  const goToSlide = function(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // goToSlide(0);

  const nextSlide = function() {
    if(curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };



  const prevSlide = function(){
    if(curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
  goToSlide(curSlide);
  activateDot(curSlide);
  };

  const init = function(){
    goToSlide(0);
    createDots();
    activateDot(0);
  
  }

  init();

// Event Handler 
  btnRight.addEventListener('click',nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click',function(e){
    if (e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(curSlide);
    }
  });
};

slider();

////////////////////////////////////////////////////
/* 
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');


const allSelections = document.quer
ySelectorAll('.section');
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