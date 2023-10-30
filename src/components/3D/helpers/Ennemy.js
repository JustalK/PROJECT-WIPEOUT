import * as THREE from 'three'
import { CAMERA, COLOR, ENNEMY, PLAYER, GAME } from '../../../utils/constant'
import World from './World'

export default class Ennemy {
  constructor() {
    this.maxPositionX = World.camera.getFilmWidth() / 2
    this.minPositionX = -this.maxPositionX
    this.maxPositionZ = PLAYER.POSITION_Z + PLAYER.SIZE / 2
    this.minPositionZ = PLAYER.POSITION_Z - PLAYER.SIZE / 2
    this.ennemy = null
    this.player = World.scene.getObjectByName(PLAYER.NAME)
  }

  restart() {
    World.scene.remove(this.ennemy)
  }

  init() {
    const geometry = new THREE.PlaneGeometry(
      World.camera.getFilmWidth() / 4,
      World.camera.getFilmHeight() / 2
    )
    const material = new THREE.MeshBasicMaterial({ color: COLOR.PINK, side: THREE.DoubleSide })
    this.ennemy = new THREE.Mesh(geometry, material)
    this.ennemy.name = ENNEMY.NAME
    this.ennemy.position.set(
      -this.getRandomPositionX(),
      -World.camera.getFilmHeight() / 2 + World.camera.getFilmWidth() / 16,
      0
    )
    World.scene.add(this.ennemy)
  }

  getRandomPositionX() {
    return Math.floor(
      Math.random() * (this.maxPositionX - this.minPositionX + 1) + this.minPositionX
    )
  }

  reset() {
    this.ennemy.position.z = 0
    this.ennemy.position.x = this.getRandomPositionX()
  }

  isPlayerKilled() {
    if (this.ennemy.position.z > this.minPositionZ && this.ennemy.position.z < this.maxPositionZ) {
      const min = this.ennemy.position.x - World.camera.getFilmWidth() / 8
      const max = this.ennemy.position.x + World.camera.getFilmWidth() / 8
      if (this.player.position.x <= max && this.player.position.x >= min) {
        this.ennemy.position.z = PLAYER.POSITION_Z
        return true
      }
    }
    return false
  }

  tick(delta, isNewLevel) {
    this.ennemy.position.z += ENNEMY.SPEED * delta

    if (this.isPlayerKilled()) {
      return GAME.STOP
    }

    if (this.ennemy.position.z > CAMERA.POSITION_Z) {
      if (isNewLevel) {
        World.scene.remove(this.ennemy)
        return GAME.DELETE_ENNEMY
      } else {
        this.reset()
      }
    }
  }

  getPositionZ() {
    return this.ennemy.position.z
  }
}
