import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    new OrbitControls(World.camera, this.renderer.domElement)

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
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(0, 50, 200)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.top = 200
    directionalLight.shadow.camera.bottom = -200
    directionalLight.shadow.camera.left = -200
    directionalLight.shadow.camera.right = 200
    directionalLight.shadow.camera.near = 120
    directionalLight.shadow.camera.far = 400
    directionalLight.shadow.bias = 0.0001

    directionalLight.shadow.mapSize.width = window.innerWidth
    directionalLight.shadow.mapSize.height = window.innerHeight

    const targetObject = new THREE.Object3D()
    targetObject.position.set(0, 0, 480)
    World.scene.add(targetObject)

    directionalLight.target = targetObject
    World.scene.add(directionalLight)

    const helper = new THREE.CameraHelper(directionalLight.shadow.camera)
    World.scene.add(helper)

    const pilone = new THREE.Mesh(
      new THREE.BoxGeometry(100, 100, 100),
      new THREE.MeshLambertMaterial({ color: COLOR.RED })
    )
    pilone.position.set(-70, 30, 420)
    pilone.castShadow = true
    pilone.receiveShadow = true
    World.scene.add(pilone)

    const geometry = new THREE.PlaneGeometry(
      World.camera.getFilmWidth() * 500,
      World.camera.getFilmHeight() * 500
    )
    const material = new THREE.MeshPhysicalMaterial({
      color: COLOR.GREEN
    })

    const line = new THREE.Mesh(geometry, material)
    line.position.set(
      -World.camera.getFilmWidth() / 2 + World.camera.getFilmWidth() / 2,
      -World.camera.getFilmHeight() / 2 + 0.05,
      480
    )
    line.rotation.x = -Math.PI / 2
    line.castShadow = false
    line.receiveShadow = true
    World.scene.add(line)
    this.floor.push(line)
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
