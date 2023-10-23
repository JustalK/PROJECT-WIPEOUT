import * as THREE from 'three'
import { PLAYER, COLOR, CAMERA } from '../../../utils/constant'

export default class World {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      CAMERA.FOV,
      window.innerWidth / window.innerHeight,
      0.1,
      CAMERA.POSITION_Z
    )
    this.camera.position.set(CAMERA.POSITION_X, CAMERA.POSITION_Y, CAMERA.POSITION_Z)
    this.camera.lookAt(CAMERA.TARGET_POSITION_X, CAMERA.TARGET_POSITION_Y, CAMERA.TARGET_POSITION_Z)
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
  }

  attachTo(element) {
    element.appendChild(this.renderer.domElement)
  }

  getCamera() {
    return this.camera
  }

  getScene() {
    return this.scene
  }

  getRenderer() {
    return this.renderer
  }
}
