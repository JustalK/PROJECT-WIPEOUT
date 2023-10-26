<template>
  <div ref="game" class="game"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import World from './helpers/World'
import Lines from './helpers/Lines'
import Player from './helpers/Player'
import Keyboard from './helpers/Keyboard'
import Ennemies from './helpers/Ennemies'
import { GAME } from '../../utils/constant'

let game = ref(null)

onMounted(() => {
  const world = new World()
  world.attachTo(game.value)

  const keyboard = new Keyboard()
  keyboard.init()

  const player = new Player(world.getScene(), world.getCamera(), keyboard)
  player.init()

  const ennemies = new Ennemies(world)

  function update(delta) {
    if (world.getStatus() !== GAME.STOP) {
      player.tick(delta)
      ennemies.tick(delta)
    } else {
      if (keyboard.getNewGame()) {
        keyboard.restart()
        player.restart()
        ennemies.restart()
        world.restart()
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    update(world.getDelta())
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
