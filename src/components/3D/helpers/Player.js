import * as THREE from 'three'
import { PLAYER, COLOR, KEYBOARD_KEY } from '../../../utils/constant'
import World from './World'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
export default class Player {
  constructor(keyboard) {
    this.keyboard = keyboard
    this.previousDirection = null
    this.previousPositionX = 0
    this.rotation = 0
    this.velocity = 0
    this.halfHeight = World.camera.getFilmHeight() / 2
    this.halfWidth = World.camera.getFilmWidth() / 2
    this.halfSizePlayer = PLAYER.SIZE / 2
  }

  init() {
    /**
    const loader = new GLTFLoader()

    loader.load(
      'spaceship.glb',
      function (gltf) {
        const spaceship = gltf.scene
        spaceship.position.set(0, 0, 498)
        spaceship.scale.set(0.1, 0.1, 0.1)
        World.scene.add(spaceship)
      },
      undefined,
      function (error) {
        console.error(error)
      }
    )
    **/
    const geometry = new THREE.BoxGeometry(PLAYER.SIZE, PLAYER.SIZE, PLAYER.SIZE)
    const material = new THREE.MeshBasicMaterial({ color: COLOR.GREEN })
    const cube = new THREE.Mesh(geometry, material)
    cube.name = PLAYER.NAME
    cube.position.set(PLAYER.POSITION_X, -this.halfHeight + this.halfSizePlayer, PLAYER.POSITION_Z)
    World.scene.add(cube)
  }

  restart() {
    const cube = World.scene.getObjectByName(PLAYER.NAME)
    cube.position.set(PLAYER.POSITION_X, -this.halfHeight + this.halfSizePlayer, PLAYER.POSITION_Z)
  }

  tick(delta) {
    const cube = World.scene.getObjectByName(PLAYER.NAME)

    let newVelocity = this.velocity
    if (this.velocity == 0 || this.previousDirection !== this.keyboard.getDirection()) {
      newVelocity = PLAYER.IMPULSE
    }
    newVelocity += this.velocity * delta + PLAYER.ACCELERATION * Math.pow(delta, 2) * 0.5
    this.velocity = newVelocity

    switch (this.keyboard.getDirection()) {
      case KEYBOARD_KEY.LEFT:
        if (cube.position.x - newVelocity > -this.halfWidth + this.halfSizePlayer) {
          cube.position.x -= newVelocity
        } else {
          cube.position.x = -this.halfWidth + this.halfSizePlayer
        }
        if (
          cube.rotation.z < Math.PI / 6 &&
          Math.abs(this.previousPositionX - cube.position.x) !== 0
        ) {
          cube.rotation.z = Math.min(Math.PI / 6, cube.rotation.z + 0.1)
        }
        break
      case KEYBOARD_KEY.RIGHT:
        if (cube.position.x + newVelocity < this.halfWidth - this.halfSizePlayer) {
          cube.position.x += newVelocity
        } else {
          cube.position.x = this.halfWidth - this.halfSizePlayer
        }
        if (
          cube.rotation.z > -Math.PI / 6 &&
          Math.abs(this.previousPositionX - cube.position.x) !== 0
        ) {
          cube.rotation.z = Math.max(-Math.PI / 6, cube.rotation.z - 0.1)
        }
        break
      default:
        this.velocity = 0
    }

    if (Math.abs(this.previousPositionX - cube.position.x) === 0 && cube.rotation.z !== 0) {
      if (cube.rotation.z < 0) {
        cube.rotation.z = Math.max(0, cube.rotation.z + 0.1)
      } else {
        cube.rotation.z = Math.min(0, cube.rotation.z - 0.1)
      }
    }

    this.previousPositionX = cube.position.x
    this.previousDirection = this.keyboard.getDirection()
  }
}
