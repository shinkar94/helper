import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox={'0 0 16 16'}
        fill="none"
        ref={ref}
        {...props}
    >
        <path
            stroke="#5C5C5C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 12 6 8l4-4"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const ArrowLeftIcon = memo(ForwardRef)
