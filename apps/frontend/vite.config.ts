import tailwindcss from "@tailwindcss/vite"
import {TanStackRouterVite} from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import path from "path"
import {defineConfig} from "vite"

// https://vite.dev/config/
export default defineConfig({
    base: "/hn/",
    plugins: [TanStackRouterVite(), react(), tailwindcss()],
    resolve: {alias: {"@": path.resolve(__dirname, "./src")}}
})
