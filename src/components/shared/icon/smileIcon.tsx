import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox={'0 0 24 24'}
        ref={ref}
        {...props}
    >
        <path
            stroke="#5C5C5C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        />
        <path
            stroke="#5C5C5C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const SmileIcon = memo(ForwardRef)