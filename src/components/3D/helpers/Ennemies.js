import { GAME, CAMERA } from '../../../utils/constant'
import Ennemy from './Ennemy'

export default class Ennemies {
  constructor(world) {
    this.world = world
    this.scene = world.getScene()
    this.camera = world.getCamera()
    this.ennemies = []
    this.numberEnnemies = 10
  }

  restart() {
    for (const e of this.ennemies) {
      e.restart()
    }
    this.ennemies = []
  }

  tick(delta) {
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
    for (const e of this.ennemies) {
      const rsl = e.tick(delta)
      if (rsl === GAME.STOP) {
        this.world.stop()
      }
    }
  }
}
