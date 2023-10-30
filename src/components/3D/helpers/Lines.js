import * as THREE from 'three'
import { PLAYER, CAMERA, COLOR } from '../../../utils/constant'
import World from './World'

export default class Lines {
  constructor() {
    this.halfWidth = World.camera.getFilmWidth() / 2
    this.halfHeight = World.camera.getFilmHeight() / 2
    this.halfSizePlayer = PLAYER.SIZE / 2
  }

  /**
   * Create the lines to see the movement of the player
   */
  addLinePlayerMovement() {
    const height = -this.halfHeight + this.halfSizePlayer
    const points = []
    points.push(new THREE.Vector3(-this.halfWidth, height, PLAYER.POSITION_Z))
    points.push(new THREE.Vector3(this.halfWidth, height, PLAYER.POSITION_Z))

    this._drawLines(points, COLOR.RED)
  }

  /**
   * Create the lines to see the area where the player can move
   */
  addLinePlayerArea() {
    const points = []
    points.push(new THREE.Vector3(this.halfWidth, -this.halfHeight, CAMERA.POSITION_Z))
    points.push(new THREE.Vector3(this.halfWidth, -this.halfHeight, CAMERA.TARGET_POSITION_Z))
    points.push(new THREE.Vector3(-this.halfWidth, -this.halfHeight, CAMERA.TARGET_POSITION_Z))
    points.push(new THREE.Vector3(-this.halfWidth, -this.halfHeight, CAMERA.POSITION_Z))

    this._drawLines(points, COLOR.BLUE)
  }

  /**
   * Draw the lines on the canvas
   * @param {Array<Vector3>} points The array of vectors
   * @param {Number} color The color of the lines to draw
   */
  _drawLines(points, color) {
    const material = new THREE.LineBasicMaterial({ color })
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    World.scene.add(line)
  }
}
