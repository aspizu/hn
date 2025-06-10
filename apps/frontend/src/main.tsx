import {ThemeProvider} from "@/components/theme-provider"
import {queryClient} from "@/lib/query"
import {routeTree} from "@/routeTree.gen"
import "@/styles/main.css"
import {QueryClientProvider} from "@tanstack/react-query"
import {RouterProvider, createRouter} from "@tanstack/react-router"
import {StrictMode} from "react"
import {createRoot} from "react-dom/client"

// @ts-expect-error types are not available
import "@fontsource-variable/inter"

const router = createRouter({routeTree})
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
)
