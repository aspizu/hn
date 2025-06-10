import {Spinner} from "@/components/ui/spinner"
import {type ComponentProps} from "react"

export function FullscreenSpinner(props: ComponentProps<typeof Spinner>) {
    return (
        <div className="flex h-dvh items-center justify-center">
            <Spinner {...props} />
        </div>
    )
}
