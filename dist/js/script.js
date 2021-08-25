const feedbackSlider = new Swiper('.feedback__slider', {
  loop: true,

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.mobile-slider__btn_next',
        prevEl: '.mobile-slider__btn_prev',
      },
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    }
  },
  pagination: {
    el: '.slider-pagination',
    clickable: true
  }
});
const mobileSlider = new Swiper('.mobile-slider', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: '.slider-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.mobile-slider__btn_next',
    prevEl: '.mobile-slider__btn_prev',
  },
});


const btnSpoiler = document.querySelectorAll('.questions__question');

btnSpoiler.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.target.classList.toggle('active');
    e.target.nextSibling.classList.toggle('active');
  })
})


const btnBurger = document.querySelector('.burger'),
  menu = document.querySelector('.header__menu');

btnBurger.addEventListener('click', () => {
  btnBurger.classList.toggle('active');
  menu.classList.toggle('active');
  document.body.classList.toggle('lock');
})





const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        btnBurger.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('lock');
        const id = smoothLink.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

maskPhone('[name="number"]')