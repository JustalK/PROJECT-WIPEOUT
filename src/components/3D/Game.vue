<template>
  <div ref="game" class="game"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import World from './helpers/World'
import Ennemy from './helpers/Ennemy'
import Lines from './helpers/Lines'
import Player from './helpers/Player'
import Keyboard from './helpers/Keyboard'

let game = ref(null)

onMounted(() => {
  const world = new World()
  world.attachTo(game.value)

  const keyboard = new Keyboard()
  keyboard.init()

  const player = new Player(world.getScene(), world.getCamera(), keyboard)
  player.init()

  const ennemy = new Ennemy(world.getScene(), world.getCamera())
  ennemy.init()

  function update(delta) {
    player.tick(delta)
    ennemy.tick(delta)
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
