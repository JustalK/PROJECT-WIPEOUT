import { KEYBOARD_KEY } from '../../../utils/constant'

export default class Keyboard {
  constructor() {
    this.direction = null
  }

  init() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case KEYBOARD_KEY.LEFT:
          this.direction = KEYBOARD_KEY.LEFT
          break
        case KEYBOARD_KEY.UP:
          this.direction = KEYBOARD_KEY.UP
          break
        case KEYBOARD_KEY.RIGHT:
          this.direction = KEYBOARD_KEY.RIGHT
          break
        case KEYBOARD_KEY.DOWN:
          this.direction = KEYBOARD_KEY.DOWN
          break
      }
    }
    document.onkeyup = (e) => {
      switch (e.keyCode) {
        case KEYBOARD_KEY.LEFT:
          if (this.direction === KEYBOARD_KEY.LEFT) {
            this.direction = null
          }
          break
        case KEYBOARD_KEY.UP:
          if (this.direction === KEYBOARD_KEY.UP) {
            this.direction = null
          }
          break
        case KEYBOARD_KEY.RIGHT:
          if (this.direction === KEYBOARD_KEY.RIGHT) {
            this.direction = null
          }
          break
        case KEYBOARD_KEY.DOWN:
          if (this.direction === KEYBOARD_KEY.DOWN) {
            this.direction = null
          }
          break
      }
    }
  }

  getDirection() {
    return this.direction
  }
}
