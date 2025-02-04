const { createApp, ref } = Vue;

const tps = 60;

const plugin = new BoltBrowser();
const app = createApp({
  data: () => {
    return {
      plugin: ref(plugin),
      interval: ref(null),
      lastFrameTime: ref(new Date(0)),
      stopped: ref(true),
      timeElapsed: ref(new Date(0)),
    };
  },
  methods: {
    tick() {
      const currentTime = new Date();
      if (this.stopped) {
        this.lastFrameTime = currentTime;
        return;
      }

      const delta = new Date(currentTime - this.lastFrameTime);
      this.lastFrameTime = currentTime;

      this.timeElapsed = new Date(this.timeElapsed.getTime() + delta.getTime());
    },
    start() {
      this.stopped = false;
      this.lastFrameTime = new Date();
      this.interval = window.setInterval(this.tick, 1000 / tps);
    },
    stop() {
      this.stopped = true;
      window.clearInterval(this.interval);
      this.interval = null;
    },
    toggle() {
      this.stopped ? this.start() : this.stop();
    },
    reset() {
      this.timeElapsed = new Date(0);
      this.stop();
    },
  },
  computed: {
    displayTime() {
      let components = [];
      if (this.timeElapsed.getTime() >= 3600000) {
        // If more than an hour has elapsed
        components.push(
          this.timeElapsed.getUTCHours().toString().padStart(2, "0")
        );
      }

      components = components.concat([
        this.timeElapsed.getUTCMinutes().toString().padStart(2, "0"),
        this.timeElapsed.getUTCSeconds().toString().padStart(2, "0"),
        this.timeElapsed.getUTCMilliseconds().toString().padStart(3, "0"),
      ]);

      return components.join(":");
    },
  },
}).mount("#app");
