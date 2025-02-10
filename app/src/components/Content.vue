<script setup lang="ts">
import { computed, ref } from "vue";

const tps = 60;

const interval = ref<undefined | number>(undefined);
const lastFrameTime = ref(new Date(0));
const stopped = ref(true);
const timeElapsed = ref(new Date(0));

const tick = () => {
  const currentTime = new Date();
  if (stopped.value) {
    lastFrameTime.value = currentTime;
    return;
  }

  const delta = new Date(currentTime.getTime() - lastFrameTime.value.getTime());
  lastFrameTime.value = currentTime;

  // If more than an hour has elapsed
  timeElapsed.value = new Date(timeElapsed.value.getTime() + delta.getTime());
};

const start = () => {
  stopped.value = false;
  lastFrameTime.value = new Date();
  interval.value = window.setInterval(tick, 1000 / tps);
};

const stop = () => {
  stopped.value = true;
  window.clearInterval(interval.value);
  interval.value = undefined;
};

const toggle = () => {
  stopped.value ? start() : stop();
};

const reset = () => {
  timeElapsed.value = new Date(0);
  stop();
};

const displayTime = computed(() => {
  let components = [];

  // If more than an hour has elapsed
  if (timeElapsed.value.getTime() >= 3600000) {
    components.push(
      timeElapsed.value.getUTCHours().toString().padStart(2, "0")
    );
  }

  components = components.concat([
    timeElapsed.value.getUTCMinutes().toString().padStart(2, "0"),
    timeElapsed.value.getUTCSeconds().toString().padStart(2, "0"),
    timeElapsed.value.getUTCMilliseconds().toString().padStart(3, "0"),
  ]);

  return components.join(":");
});
</script>

<template>
  <div class="content">
    <div class="timer">
      {{ displayTime }}
    </div>
    <div class="controls">
      <button class="button" @click="toggle">
        {{ stopped ? "Start" : "Stop" }}
      </button>
      <button class="button" @click="reset">Reset</button>
    </div>
  </div>
</template>

<style scoped>
@import "rune-ui/content.css";
@import "rune-ui/button.css";

.content {
  /* padding-top: 8px; */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.timer {
  /* padding: 0 12px 12px; */
  text-align: center;
  flex-grow: 1;
}

.controls {
  display: flex;
  justify-content: center;
}

.button {
  flex-grow: 1;
  margin: 2px;
  color: #aed0e0;
}
</style>
