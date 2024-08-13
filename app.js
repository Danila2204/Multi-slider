// Утилиты | Utilites
function shiftArray(array, value = 0) {
  let oldArray = array;
  let newArray = [];

  if (!(value % oldArray.length) || !value) return oldArray;

  for (let i = 0; i < oldArray.length; i++) {    
    if (value < 0 ) {
      if ((value % oldArray.length) + i < 0) {
        newArray[oldArray.length + (value % oldArray.length + i)] = oldArray[i];
      }
      else newArray[i + (value % oldArray.length)] = oldArray[i];
    }
    else newArray[(i + value) % oldArray.length] = oldArray[i];
  }

  return newArray;
}

class MultiSlider {
  featuresOptions = [
    {
      option: "transition",
      ending: "s"
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

    for (let i = 0; i < this.slides.length; i++) {
      if (this.slides[i].nodeName === "IMG") {
        this.baseImages.push(this.slides[i].getAttribute("src"));
      } else {
        this.baseImages.push(getComputedStyle(this.slides[i]).getPropertyValue("background-image").slice(4, -1).replace(/["']/g, ""))
      }
    }

    // Установка свойств из объекта option
    for (let i = 0; i < this.slides.length; i++) {
      this.featuresOptions.forEach(value => {        
        this.slides[i].style[value.option] = this.options[value.option] + value.ending;
      })
    }
    
    // Инициализация главного слайда
    if (!this.options.mainSlide) this.mainSlide = Math.round(this.slides.length / 2);
    else this.mainSlide = this.options.mainSlide;

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].addEventListener("click", () => {
        this.#move(i);
      })
    } 
  }

  #move(number) {
    let value = this.mainSlide - number;
    this.baseImages = shiftArray(this.baseImages, value);

    for (let j = 0; j < this.slides.length; j++) {
      if (this.slides[j].nodeName === "IMG") {        
        this.slides[j].setAttribute("src", this.baseImages[j]);
      } else {
        this.slides[j].style.backgroundImage = `url(${this.baseImages[j]})`;
      }
    }
  }
}