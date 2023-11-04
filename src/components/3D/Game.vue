<template>
  <div ref="game" class="game">
    <div class="level">LEVEL: <span ref="levelHTML" class="level_value">0</span></div>
    <div class="bar">
      <div ref="percentage" class="percentage"></div>
    </div>
    <div ref="menu" class="menu">
      <div class="start" @click="startGame">Press SPACE to start</div>
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
let menu = ref(null)

onMounted(() => {
  const world = new World(levelHTML.value, percentage.value, menu.value)
  world.attachTo(game.value)
  world.init()

  const keyboard = new Keyboard()
  keyboard.init()

  const player = new Player(keyboard)
  player.init()

  const ennemies = new Ennemies(world)

  function update(delta) {
    if (world.getStatus() !== GAME.STOP) {
      player.tick(delta)
      ennemies.tick(delta)
      world.tick(delta)
    } else {
      if (keyboard.getNewGame()) {
        keyboard.restart()
        player.restart()
        world.restart()
        ennemies.restart()
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    update(world.getDelta())
    world.getRenderer().render(World.scene, World.camera)
  }

  const lines = new Lines()
  //lines.addLinePlayerMovement()
  //lines.addLinePlayerArea()

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
  transition: 0.05s all ease;
}
.menu {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000a1;
  backdrop-filter: blur(10px);
}
.start {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
  font-weight: 900;
}
.hidden {
  display: none;
}
</style>
