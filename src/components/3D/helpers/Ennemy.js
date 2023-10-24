import * as THREE from 'three'
import { CAMERA, COLOR, ENNEMY } from '../../../utils/constant'

export default class Ennemy {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.maxPositionX = this.camera.getFilmWidth() / 4
    this.minPositionX = -this.maxPositionX
  }

  init() {
    const geometry = new THREE.PlaneGeometry(this.camera.getFilmWidth() / 4, this.camera.getFilmHeight() / 4)
    const material = new THREE.MeshBasicMaterial({ color: COLOR.PINK, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, material)
    plane.name = ENNEMY.NAME
    plane.position.set(-this.getRandomPositionX(), -this.camera.getFilmHeight() / 4, 0)
    this.scene.add(plane)
  }

  getRandomPositionX() {
    return Math.floor(Math.random() * (this.maxPositionX - this.minPositionX + 1) + this.minPositionX)
  }

  reset() {
    const plane = this.scene.getObjectByName(ENNEMY.NAME)
    plane.position.z = 0
    plane.position.x = this.getRandomPositionX()
  }

  tick(delta) {
    const plane = this.scene.getObjectByName(ENNEMY.NAME)
    plane.position.z += ENNEMY.SPEED * delta 

    if (plane.position.z > CAMERA.POSITION_Z) {
        this.reset()
    }
  }
}