<template>
  <div ref="game" class="game">
    <div class="level">LEVEL: <span ref="levelHTML" class="level_value">0</span></div>
    <div class="bar">
      <div ref="percentage" class="percentage"></div>
    </div>
  </div>
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
let levelHTML = ref(null)
let percentage = ref(null)

onMounted(() => {
  const world = new World(levelHTML.value, percentage.value)
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
      world.tick()
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
.level {
  position: absolute;
  right: 10px;
  top: 30px;
  color: white;
  z-index: 100;
}
.bar {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 100px;
  height: 20px;
  border: 1px solid white;
}
.percentage {
  width: 80%;
  height: 20px;
  background-color: white;
  transition: 1s all ease;
}
</style>
