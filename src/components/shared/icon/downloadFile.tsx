import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={18}
        viewBox={'0 0 24 24'}
        fill="none"
        ref={ref}
        {...props}
    >
        <path
            stroke="#534F54"
            strokeLinecap="round"
            strokeWidth={1.3}
            d="M12.75 13.656a3.28 3.28 0 1 0 6.562 0 3.28 3.28 0 0 0-6.562 0Zm0 0-.617-.31a2.812 2.812 0 0 0-2.516 0l-.617.31M1.5 7.562h18.75m-16.875 0 .576-2.301c.51-2.047.767-3.07 1.53-3.666C6.244 1 7.298 1 9.408 1h2.934c2.11 0 3.164 0 3.927.595.764.597 1.019 1.62 1.53 3.666l.576 2.301M9 13.657a3.281 3.281 0 1 1-6.563 0 3.281 3.281 0 0 1 6.563 0Z"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const DownloadFile = memo(ForwardRef)