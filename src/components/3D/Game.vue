<template>
  <div ref="game" class="game"></div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import * as THREE from 'three'
import { KEYBOARD_KEY, PLAYER } from '../../utils/constant'

let game = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(0, 0, 500)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
  game.value.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(PLAYER.SIZE, PLAYER.SIZE, PLAYER.SIZE)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  cube.name = PLAYER.NAME
  cube.position.set(0, -camera.getFilmHeight() / 2 + PLAYER.SIZE / 2, 480)
  scene.add(cube)
  drawLines(scene, camera)
  drawLines2(scene, camera)

  const clock = new THREE.Clock()

  let velocity = 0
  let direction = null
  function movement(delta) {
    const cube = scene.getObjectByName(PLAYER.NAME)

    let newVelocity = velocity
    if (velocity == 0) {
      newVelocity = PLAYER.IMPULSE
    }
    newVelocity += velocity * delta + PLAYER.ACCELERATION * Math.pow(delta, 2) * 0.5
    velocity = newVelocity

    switch (direction) {
      case KEYBOARD_KEY.LEFT:
        if (cube.position.x > -camera.getFilmWidth() / 2 + PLAYER.SIZE / 2) {
          cube.position.x -= newVelocity
        }
        break
      case KEYBOARD_KEY.UP:
        cube.position.z -= newVelocity
        break
      case KEYBOARD_KEY.RIGHT:
        if (cube.position.x < camera.getFilmWidth() / 2 - PLAYER.SIZE / 2) {
          cube.position.x += newVelocity
        }
        break
      case KEYBOARD_KEY.DOWN:
        cube.position.z += newVelocity
        break
      default:
        velocity = 0
    }
  }

  function update(delta) {
    movement(delta)
  }

  function animate() {
    const delta = clock.getDelta()
    requestAnimationFrame(animate)
    update(delta)
    renderer.render(scene, camera)
  }

  function drawLines(scene, camera) {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff })

    const points = []
    points.push(new THREE.Vector3(camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 500))
    points.push(new THREE.Vector3(camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 0))
    points.push(new THREE.Vector3(-camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 0))
    points.push(new THREE.Vector3(-camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 500))
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    scene.add(line)
  }

  function drawLines2(scene, camera) {
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

    const points = []
    points.push(
      new THREE.Vector3(
        -camera.getFilmWidth() / 2,
        -camera.getFilmHeight() / 2 + PLAYER.SIZE / 2,
        480
      )
    )
    points.push(
      new THREE.Vector3(
        camera.getFilmWidth() / 2,
        -camera.getFilmHeight() / 2 + PLAYER.SIZE / 2,
        480
      )
    )

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    scene.add(line)
  }

  function setupKeyControls() {
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case KEYBOARD_KEY.LEFT:
          direction = KEYBOARD_KEY.LEFT
          break
        case KEYBOARD_KEY.UP:
          direction = KEYBOARD_KEY.UP
          break
        case KEYBOARD_KEY.RIGHT:
          direction = KEYBOARD_KEY.RIGHT
          break
        case KEYBOARD_KEY.DOWN:
          direction = KEYBOARD_KEY.DOWN
          break
      }
    }
    document.onkeyup = function (e) {
      switch (e.keyCode) {
        case KEYBOARD_KEY.LEFT:
          if (direction === KEYBOARD_KEY.LEFT) {
            direction = null
          }
          break
        case KEYBOARD_KEY.UP:
          if (direction === KEYBOARD_KEY.UP) {
            direction = null
          }
          break
        case KEYBOARD_KEY.RIGHT:
          if (direction === KEYBOARD_KEY.RIGHT) {
            direction = null
          }
          break
        case KEYBOARD_KEY.DOWN:
          if (direction === KEYBOARD_KEY.DOWN) {
            direction = null
          }
          break
      }
    }
  }

  setupKeyControls()
  animate()
})
</script>

<style>
.game {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
