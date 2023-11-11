import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        fill="none"
        transform="rotate(180)"
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
    >
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M12 7a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L12 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414l7-7A1 1 0 0 1 12 7Z"
            clipRule="evenodd"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const DownIcon = memo(ForwardRef)
