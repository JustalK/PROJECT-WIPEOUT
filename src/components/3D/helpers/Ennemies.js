import { GAME, CAMERA } from '../../../utils/constant'
import Ennemy from './Ennemy'

export default class Ennemies {
  static ennemies = []

  constructor(world) {
    this.world = world
    Ennemies.ennemies = []
    this.numberEnnemies = 1
    this.currentLevel = world.getLevel()
  }

  increaseLevel() {
    if (Ennemies.ennemies.length === 0) {
      this.currentLevel++
      this.numberEnnemies++
    }
  }

  restart() {
    for (const e of Ennemies.ennemies) {
      e.restart()
    }
    Ennemies.ennemies = []
    this.numberEnnemies = 1
    this.currentLevel = this.world.getLevel()
  }

  tick(delta) {
    if (this.currentLevel !== this.world.getLevel()) {
      this.increaseLevel()
    } else if (!this.world.getIsReadyNewLevel()) {
      if (Ennemies.ennemies.length < this.numberEnnemies) {
        let addEnnemy = true
        for (const e of Ennemies.ennemies) {
          if (e.getPositionZ() < CAMERA.POSITION_Z / this.numberEnnemies) {
            addEnnemy = false
          }
        }
        if (addEnnemy) {
          Ennemies.ennemies.push(new Ennemy())
          Ennemies.ennemies[Ennemies.ennemies.length - 1].init()
        }
      }
    }
    for (const [index, e] of Ennemies.ennemies.entries()) {
      const rsl = e.tick(delta, this.world.getIsReadyNewLevel())
      if (rsl === GAME.DELETE_ENNEMY) {
        Ennemies.ennemies.splice(index, 1)
      }
      if (rsl === GAME.STOP) {
        this.world.stop()
      }
    }
  }

  static getNumberEnnemies() {
    return Ennemies.ennemies.length
  }
}
