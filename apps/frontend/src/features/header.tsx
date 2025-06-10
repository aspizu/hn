import {ModeToggle} from "@/components/mode-toggle"
import {cn} from "@/lib/utils"
import {Link} from "@tanstack/react-router"
import {useWindowScroll} from "@uidotdev/usehooks"

export function Header() {
    const [{y}] = useWindowScroll()
    const isScrolled = y && y > 0
    return (
        <header
            className={cn(
                "bg-background sticky top-0 flex items-center border-b p-2 transition-all",
                isScrolled ? "shadow" : "border-dashed"
            )}
        >
            <Link
                to="/"
                className="bg-muted mr-auto flex size-8 items-center justify-center text-xl font-semibold"
            >
                Y
            </Link>
            <ModeToggle />
        </header>
    )
}
