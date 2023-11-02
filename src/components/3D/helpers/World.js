import * as THREE from 'three'
import Ennemies from './Ennemies'
import { CAMERA, GAME, HTML, COLOR, ENNEMY } from '../../../utils/constant'

export default class World {
  static scene = null
  static camera = null
  constructor(levelHTML, percentage, menu) {
    World.scene = new THREE.Scene()
    World.scene.background = new THREE.Color(COLOR.WHITE)
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
    this.status = GAME.STOP
    this.startTime = this.clock.getElapsedTime()
    this.isReadyNewLevel = false
    this.level = 1
    this.levelHTML = levelHTML
    this.menu = menu
    this.percentage = percentage
    this.setLevel(this.level)
    this.floor = []
  }

  tick(delta) {
    this.setPercentage()
    if (this.clock.getElapsedTime() - this.startTime >= GAME.LEVEL_SPEED * this.level) {
      this.isReadyNewLevel = true
      if (this.level && Ennemies.getNumberEnnemies() === 0) {
        this.increaseLevel()
      }
    }
    for (const line of this.floor) {
      line.position.z += ENNEMY.SPEED * delta
      if (line.position.z > 500) {
        line.position.z = line.position.z - 500
      }
    }
  }

  init() {
    const geometry = new THREE.PlaneGeometry(
      World.camera.getFilmWidth() / 4,
      World.camera.getFilmHeight() / 4
    )
    const material = new THREE.MeshBasicMaterial({
      color: COLOR.DARK_BLUE,
      side: THREE.DoubleSide,
      wireframe: true
    })

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 113; j++) {
        const line = new THREE.Mesh(geometry, material)
        line.position.set(
          -World.camera.getFilmWidth() / 2 + ((i * 2 + 1) * World.camera.getFilmWidth()) / 8,
          -World.camera.getFilmHeight() / 2 + 0.05,
          490 - (j * World.camera.getFilmHeight()) / 4
        )
        line.rotation.x = -Math.PI / 2
        World.scene.add(line)
        this.floor.push(line)
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
    this.menu.classList.add('hidden')
    this.status = GAME.START
    this.level = 1
    this.startTime = this.clock.getElapsedTime()
    this.setLevel(this.level)
    this.setPercentage()
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
