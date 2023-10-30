import * as THREE from 'three'
import Ennemies from './Ennemies'
import { CAMERA, GAME, HTML } from '../../../utils/constant'

export default class World {
  static scene = null
  static camera = null
  constructor(levelHTML, percentage) {
    World.scene = new THREE.Scene()
    World.camera = new THREE.PerspectiveCamera(
      CAMERA.FOV,
      window.innerWidth / window.innerHeight,
      0.1,
      CAMERA.POSITION_Z
    )
    World.camera.position.set(CAMERA.POSITION_X, CAMERA.POSITION_Y, CAMERA.POSITION_Z)
    World.camera.lookAt(
      CAMERA.TARGET_POSITION_X,
      CAMERA.TARGET_POSITION_Y,
      CAMERA.TARGET_POSITION_Z
    )
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

  tick() {
    this.setPercentage()
    if (this.clock.getElapsedTime() - this.startTime >= GAME.LEVEL_SPEED * this.level) {
      this.isReadyNewLevel = true
      if (this.level && Ennemies.getNumberEnnemies() === 0) {
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
      ((this.clock.getElapsedTime() - this.startTime) * HTML.MAX_WIDTH) /
        (GAME.LEVEL_SPEED * this.level),
      HTML.MAX_WIDTH
    )}%`
  }

  stop() {
    this.status = GAME.STOP
  }

  restart() {
    this.status = GAME.START
    this.level = 0
    this.startTime = this.clock.getElapsedTime()
    this.isReadyNewLevel = false
  }

  attachTo(element) {
    element.appendChild(this.renderer.domElement)
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
