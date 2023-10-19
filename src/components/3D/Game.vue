<template>
  <div ref="game" class="game"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  cube.name = PLAYER.NAME
  cube.position.set(0, -camera.getFilmHeight() / 2, 480)
  scene.add(cube)
  drawLines(scene, camera)
  drawLines2(scene, camera)

  function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }

  function drawLines(scene, camera) {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff })

    const points = []
    points.push(new THREE.Vector3(camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 500))
    points.push(new THREE.Vector3(camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 0))
    points.push(new THREE.Vector3(-camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 0))
    points.push(new THREE.Vector3(-camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 500))
    console.log(camera.fov)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    scene.add(line)
  }

  function drawLines2(scene, camera) {
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

    const points = []
    points.push(new THREE.Vector3(-camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 480))
    points.push(new THREE.Vector3(camera.getFilmWidth() / 2, -camera.getFilmHeight() / 2, 480))

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    scene.add(line)
  }

  function setupKeyControls(scene, camera) {
    var cube = scene.getObjectByName(PLAYER.NAME)
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case KEYBOARD_KEY.LEFT:
          if (cube.position.x > -camera.getFilmWidth() / 2) {
            cube.position.x -= PLAYER.SPEED
          }
          break
        case KEYBOARD_KEY.UP:
          cube.position.z -= PLAYER.SPEED
          break
        case KEYBOARD_KEY.RIGHT:
          if (cube.position.x < camera.getFilmWidth() / 2) {
            cube.position.x += PLAYER.SPEED
          }
          break
        case KEYBOARD_KEY.DOWN:
          cube.position.z += PLAYER.SPEED
          break
      }
    }
  }

  setupKeyControls(scene, camera)
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
