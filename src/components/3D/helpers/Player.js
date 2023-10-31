import * as THREE from 'three'
import { PLAYER, COLOR, KEYBOARD_KEY } from '../../../utils/constant'
import World from './World'

export default class Player {
  constructor(keyboard) {
    this.keyboard = keyboard
    this.previousDirection = null
    this.velocity = 0
    this.halfHeight = World.camera.getFilmHeight() / 2
    this.halfWidth = World.camera.getFilmWidth() / 2
    this.halfSizePlayer = PLAYER.SIZE / 2
  }

  init() {
    const geometry = new THREE.BoxGeometry(PLAYER.SIZE, PLAYER.SIZE, PLAYER.SIZE)
    const material = new THREE.MeshBasicMaterial({ color: COLOR.GREEN })
    const cube = new THREE.Mesh(geometry, material)
    cube.name = PLAYER.NAME
    cube.position.set(PLAYER.POSITION_X, -this.halfHeight + this.halfSizePlayer, PLAYER.POSITION_Z)
    World.scene.add(cube)
  }

  restart() {
    const cube = World.scene.getObjectByName(PLAYER.NAME)
    cube.position.set(PLAYER.POSITION_X, -this.halfHeight + this.halfSizePlayer, PLAYER.POSITION_Z)
  }

  tick(delta) {
    const cube = World.scene.getObjectByName(PLAYER.NAME)

    let newVelocity = this.velocity
    if (this.velocity == 0 || this.previousDirection !== this.keyboard.getDirection()) {
      newVelocity = PLAYER.IMPULSE
    }
    newVelocity += this.velocity * delta + PLAYER.ACCELERATION * Math.pow(delta, 2) * 0.5
    this.velocity = newVelocity

    switch (this.keyboard.getDirection()) {
      case KEYBOARD_KEY.LEFT:
        if (cube.position.x - newVelocity > -this.halfWidth + this.halfSizePlayer) {
          cube.position.x -= newVelocity
        } else {
          cube.position.x = -this.halfWidth + this.halfSizePlayer
        }
        break
      case KEYBOARD_KEY.UP:
        cube.position.z -= newVelocity
        break
      case KEYBOARD_KEY.RIGHT:
        if (cube.position.x + newVelocity < this.halfWidth - this.halfSizePlayer) {
          cube.position.x += newVelocity
        } else {
          cube.position.x = this.halfWidth - this.halfSizePlayer
        }
        break
      case KEYBOARD_KEY.DOWN:
        cube.position.z += newVelocity
        break
      default:
        this.velocity = 0
    }

    this.previousDirection = this.keyboard.getDirection()
  }
}
