<script setup lang="ts">
import BoltBrowser from "../BoltBrowser.ts";

defineProps<{
  plugin: BoltBrowser;
}>();
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-divet" @mousedown.prevent="plugin.resize()"></div>
    <div class="toolbar-main" @mousedown.prevent="plugin.reposition()"></div>
    <div class="toolbar-close" @mousedown.prevent="plugin.close()"></div>
  </div>
</template>

<style scoped>
@import "rune-ui/toolbar.css";
</style>
