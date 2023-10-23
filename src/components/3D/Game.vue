<template>
  <div ref="game" class="game"></div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import * as THREE from 'three'
import { KEYBOARD_KEY, PLAYER } from '../../utils/constant'
import World from './helpers/world'
import Lines from './helpers/lines'
import Player from './helpers/player'

let game = ref(null)

onMounted(() => {
  const world = new World()
  world.attachTo(game.value)

  const player = new Player(world.getScene(), world.getCamera())
  player.init()

  const clock = new THREE.Clock()

  let velocity = 0
  let direction = null
  let previousDirection = null
  function movement(delta) {
    const cube = world.getScene().getObjectByName(PLAYER.NAME)

    let newVelocity = velocity
    if (velocity == 0 || previousDirection !== direction) {
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

    previousDirection = direction
  }

  function update(delta) {
    movement(delta)
  }

  function animate() {
    const delta = clock.getDelta()
    requestAnimationFrame(animate)
    update(delta)
    world.getRenderer().render(world.getScene(), world.getCamera())
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

  const lines = new Lines(world.getScene(), world.getCamera())
  lines.addLinePlayerMovement()
  lines.addLinePlayerArea()
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
