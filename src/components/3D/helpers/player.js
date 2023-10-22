import * as THREE from 'three'
import { PLAYER, COLOR } from '../../../utils/constant'

export default class Player {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.halfHeight = camera.getFilmHeight() / 2
    this.halfSizePlayer = PLAYER.SIZE / 2
  }

  init() {
    const geometry = new THREE.BoxGeometry(PLAYER.SIZE, PLAYER.SIZE, PLAYER.SIZE)
    const material = new THREE.MeshBasicMaterial({ color: COLOR.GREEN })
    const cube = new THREE.Mesh(geometry, material)
    cube.name = PLAYER.NAME
    cube.position.set(PLAYER.POSITION_X, -this.halfHeight + this.halfSizePlayer, PLAYER.POSITION_Z)
    this.scene.add(cube)
  }
}
