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
    this.isReadyNewLevel = false
    this.level = 1
    this.levelHTML = levelHTML
    this.percentage = percentage
    this.setLevel(this.level)
  }

  tick(numberEnnemies) {
    this.setPercentage()
    if (this.clock.getElapsedTime() - this.startTime >= 2 * this.level) {
      this.isReadyNewLevel = true
      if (this.level && numberEnnemies === 0) {
        this.increaseLevel()
      }
    }
  }

  increaseLevel() {
    this.isReadyNewLevel = false
    this.level++
    this.setLevel(this.level)
    this.startTime = this.clock.getElapsedTime()
  }

  setLevel(value) {
    this.levelHTML.innerHTML = HTML.SPACE.repeat(3 - value.toString().length) + value
  }

  setPercentage() {
    this.percentage.style.width = `${Math.min(
      ((this.clock.getElapsedTime() - this.startTime) * 100) / (2 * this.level),
      100
    )}%`
  }

  stop() {
    this.status = GAME.STOP
  }

  restart() {
    this.status = GAME.START
    this.level = 0
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

  getIsReadyNewLevel() {
    return this.isReadyNewLevel
  }
}
