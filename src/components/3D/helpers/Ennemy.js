import * as THREE from 'three'
import { COLOR } from '../../../utils/constant'

export default class Ennemy {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
  }

  init() {
    const geometry = new THREE.PlaneGeometry(this.camera.getFilmWidth() / 4, this.camera.getFilmHeight() / 4)
    const material = new THREE.MeshBasicMaterial({ color: COLOR.PINK, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(-this.camera.getFilmWidth() / 4, -this.camera.getFilmHeight() / 4, 0)
    this.scene.add(plane)
  }

  tick(delta) {

  }
}