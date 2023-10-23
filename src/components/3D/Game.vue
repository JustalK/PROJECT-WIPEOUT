<template>
  <div ref="game" class="game"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import World from './helpers/world'
import Lines from './helpers/lines'
import Player from './helpers/player'
import Keyboard from './helpers/keyboard'

let game = ref(null)

onMounted(() => {
  const world = new World()
  world.attachTo(game.value)

  const keyboard = new Keyboard()
  keyboard.init()

  const player = new Player(world.getScene(), world.getCamera(), keyboard)
  player.init()

  const clock = new THREE.Clock()

  function update(delta) {
    player.tick(delta)
  }

  function animate() {
    const delta = clock.getDelta()
    requestAnimationFrame(animate)
    update(delta)
    world.getRenderer().render(world.getScene(), world.getCamera())
  }

  const lines = new Lines(world.getScene(), world.getCamera())
  lines.addLinePlayerMovement()
  lines.addLinePlayerArea()

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
