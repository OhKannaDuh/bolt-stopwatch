require('sloth.library')

local plugin = Plugin()
plugin.bolt.checkversion(1, 0)

plugin:load_config({
    window = {
        app = {
            showdevtools = false,
            y = 0,
            x = 0,
            height = 70,
            width = 150
        }
    }
})

local app = EmbeddedBrowser(plugin, {
    x = plugin.config.data.window.app.x,
    y = plugin.config.data.window.app.y,
    width = plugin.config.data.window.app.width,
    height = plugin.config.data.window.app.height,
    showdevtools = plugin.config.data.window.app.showdevtools,
    path = 'plugin://app/dist/index.html'
})

plugin:save_config()

plugin:start()
app:open()
