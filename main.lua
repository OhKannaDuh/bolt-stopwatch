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

app:add_callback('reposition', function(event)
    local x, y, w, h = event:xywh()
    plugin.config.data.window.app.x = x
    plugin.config.data.window.app.y = y
    plugin.config.data.window.app.width = w
    plugin.config.data.window.app.height = h
    plugin:save_config()
end)

app:add_callback('after_close', function(event)
    plugin:save_config()
    plugin.bolt.close()
end)

plugin:start()
app:open()
