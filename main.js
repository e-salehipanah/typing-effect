const DEFAULT_EMPTY_ERASING = "erasing test!";
const DEFAULT_EMPTY_TYPING = "typing test!";

class TypingEffect {
  constructor() {
    this.setElements();
    this.setListeners();
  }

  setElements() {
    this.caption = document.querySelector("#caption");
    this.userCaption = document.querySelector("#user-caption");
    this.typeBtn = document.querySelector("#test-typing");
    this.eraseBtn = document.querySelector("#test-erasing");
  }

  setListeners = () => {
    if (this.typeBtn) {
      this.typeBtn.addEventListener("click", this.#typeHandler);
    }

    if (this.eraseBtn) {
      this.eraseBtn.addEventListener("click", this.#eraseHandler);
    }
  };

  #typeHandler = () => {
    const typeDelay = setTimeout(() => {
      if (this.caption.innerHTML) {
        this.caption.innerHTML = "";
      }
      const is_input_full = this.userCaption && this.userCaption.value;
      let text = is_input_full ? this.userCaption.value : DEFAULT_EMPTY_TYPING;

      this.#typeEffect(text);
      clearTimeout(typeDelay);
    }, 100);
  };

  #typeEffect = (text) => {
    let textChars = text.split("");

    const time = setInterval(() => {
      if (textChars.length) {
        this.caption.innerHTML += textChars.shift();
      } else {
        clearInterval(time);
      }
    }, 100);
  };

  #eraseHandler = () => {
    const eraseDelay = setTimeout(() => {
        const is_caption_full = this.caption && this.caption.innerHTML;
        if (!is_caption_full) {
          this.caption.innerHTML = DEFAULT_EMPTY_ERASING;
        }
    
        this.#eraseEffect();
        clearTimeout(eraseDelay)
    }, 100);
  };

  #eraseEffect = () => {
    const time = setInterval(() => {
      if (this.caption.innerHTML) {
        this.caption.innerHTML = this.caption.innerHTML.substring(0, this.caption.innerHTML.length - 2)
      } else {
        clearInterval(time);
      }
    }, 100);
  };
}

const typingEffect = new TypingEffect();
