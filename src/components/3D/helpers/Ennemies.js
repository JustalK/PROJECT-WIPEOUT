import { GAME, CAMERA } from '../../../utils/constant'
import Ennemy from './Ennemy'

export default class Ennemies {
  constructor(world) {
    this.world = world
    this.scene = world.getScene()
    this.camera = world.getCamera()
    this.ennemies = []
    this.numberEnnemies = 1
    this.currentLevel = world.getLevel()
  }

  increaseLevel() {
    if (this.ennemies.length === 0) {
      this.currentLevel++
      this.numberEnnemies++
    }
  }

  restart() {
    for (const e of this.ennemies) {
      e.restart()
    }
    this.ennemies = []
  }

  tick(delta) {
    if (this.currentLevel !== this.world.getLevel()) {
      this.increaseLevel()
    } else if (!this.world.getIsReadyNewLevel()) {
      if (this.ennemies.length < this.numberEnnemies) {
        let addEnnemy = true
        for (const e of this.ennemies) {
          if (e.getPositionZ() < CAMERA.POSITION_Z / this.numberEnnemies) {
            addEnnemy = false
          }
        }
        if (addEnnemy) {
          this.ennemies.push(new Ennemy(this.scene, this.camera))
          this.ennemies[this.ennemies.length - 1].init()
        }
      }
    }
    for (const [index, e] of this.ennemies.entries()) {
      const rsl = e.tick(delta, this.world.getIsReadyNewLevel())
      if (rsl === 'DELETE') {
        this.ennemies.splice(index, 1)
        console.log(this.ennemies)
      }
      if (rsl === GAME.STOP) {
        this.world.stop()
      }
    }
  }

  getNumberEnnemies() {
    return this.ennemies.length
  }
}
