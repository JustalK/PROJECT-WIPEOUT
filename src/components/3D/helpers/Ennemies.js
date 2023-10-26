import { GAME } from '../../../utils/constant'
import Ennemy from './Ennemy'

export default class Ennemies {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.ennemies = []
    this.numberEnnemies = 1
  }

  tick(delta) {
    if (this.ennemies.length < this.numberEnnemies) {
      let addEnnemy = true
      for (const e of this.ennemies) {
        if (e.getPositionZ() < 500 / this.numberEnnemies) {
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
        return GAME.STOP
      }
    }
  }
}
