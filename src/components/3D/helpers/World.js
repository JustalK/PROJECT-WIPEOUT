import * as THREE from 'three'
import { CAMERA, GAME, HTML } from '../../../utils/constant'

export default class World {
  constructor(levelHTML, percentage) {
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

    this.clock = new THREE.Clock()
    this.status = GAME.START
    this.startTime = this.clock.getElapsedTime()
    this.level = 8
    this.levelHTML = levelHTML
    this.percentage = percentage
    this.setLevel(this.level)
  }

  tick() {
    this.percentage.style.width = `${((this.clock.getElapsedTime() - this.startTime) * 100) / 30}%`
  }

  setLevel(value) {
    this.levelHTML.innerHTML = HTML.SPACE.repeat(3 - value.toString().length) + value
  }

  stop() {
    this.status = GAME.STOP
  }

  restart() {
    this.status = GAME.START
    this.startTime = this.clock.getElapsedTime()
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

  getDelta() {
    return this.clock.getDelta()
  }

  getStatus() {
    return this.status
  }

  getLevel() {
    return this.level
  }
}
