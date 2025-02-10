<script setup lang="ts">
import Toolbar from "./components/Toolbar.vue";
import Content from "./components/Content.vue";

import BoltBrowser from "./BoltBrowser.ts";

const plugin = new BoltBrowser();
</script>

<template>
  <Toolbar :plugin="plugin" />
  <Content :plugin="plugin" />
</template>

<style scoped></style>
