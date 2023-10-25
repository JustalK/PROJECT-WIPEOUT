import * as THREE from 'three'
import { CAMERA, COLOR, ENNEMY } from '../../../utils/constant'

export default class Ennemy {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.maxPositionX = this.camera.getFilmWidth() / 4
    this.minPositionX = -this.maxPositionX
    this.ennemy = null
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

  tick(delta) {
    this.ennemy.position.z += ENNEMY.SPEED * delta

    if (this.ennemy.position.z > CAMERA.POSITION_Z) {
      this.reset()
    }
  }

  getPositionZ() {
    return this.ennemy.position.z
  }
}
