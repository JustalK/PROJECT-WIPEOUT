import * as THREE from 'three'
import { CAMERA, COLOR, ENNEMY, PLAYER, GAME } from '../../../utils/constant'

export default class Ennemy {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.maxPositionX = this.camera.getFilmWidth() / 4
    this.minPositionX = -this.maxPositionX
    this.maxPositionZ = PLAYER.POSITION_Z + PLAYER.SIZE / 2
    this.minPositionZ = PLAYER.POSITION_Z - PLAYER.SIZE / 2
    this.ennemy = null
    this.player = this.scene.getObjectByName(PLAYER.NAME)
  }

  restart() {
    this.scene.remove(this.ennemy)
  }

  init() {
    const geometry = new THREE.PlaneGeometry(
      this.camera.getFilmWidth() / 4,
      this.camera.getFilmHeight() / 4
    )
    const material = new THREE.MeshBasicMaterial({ color: COLOR.PINK, side: THREE.DoubleSide })
    this.ennemy = new THREE.Mesh(geometry, material)
    this.ennemy.name = ENNEMY.NAME
    this.ennemy.position.set(-this.getRandomPositionX(), -this.camera.getFilmHeight() / 4, 0)
    this.scene.add(this.ennemy)
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
      const min = this.ennemy.position.x - this.camera.getFilmWidth() / 8
      const max = this.ennemy.position.x + this.camera.getFilmWidth() / 8
      if (this.player.position.x <= max && this.player.position.x >= min) {
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
        this.scene.remove(this.ennemy)
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
