// Utilites || Утилиты
function shiftArray(array, value = 0) {
  let oldArray = array;
  let newArray = [];

  if (Math.abs(value) >= array.length) return oldArray;

  for (let i = 0; i < oldArray.length; i++) {    
    if (i + value >= oldArray.length) newArray[i + value - oldArray.length] = oldArray[i];
    else if (i + value < 0) newArray[oldArray.length - i + value] = oldArray[i];
    else {
      newArray[i + value] = oldArray[i];
    }
  }

  return newArray;
}

// Functional || Функционал
class MultiSlider {
  featuresOptions = [
    {
      option: "transition",
      ending: "s"
    },
    {
      option: "zIndex"
    }
  ]

  constructor(slides, options = {}) {
    this.options = options;
    this.slides = slides;
    this.baseImages = [];
    this.mainSlide = undefined;

    this.#init();
  }

  #init() {
    this.featuresOptions.forEach(value => value.ending ??= "");

    // Установка свойств из объекта option
    for (let i = 0; i < this.slides.length; i++) {
      this.featuresOptions.forEach(value => {        
        this.slides[i].style[value.option] = this.options[value.option] + value.ending;
      })
    }
    
    // Инициализация главного слайда
    if (!this.options.mainSlide) this.mainSlide = Math.round(this.slides.length / 2);
    else this.mainSlide = this.options.mainSlide;
  }
}