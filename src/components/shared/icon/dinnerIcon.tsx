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
        viewBox={'0 0 24 24'}
        fill="none"
        ref={ref}
        {...props}
    >
        <path
            stroke="#5C5C5C"
            strokeWidth={2}
            d="M2.5 16.5a9.5 9.5 0 0 1 19 0v.167c0 .184-.15.333-.333.333H2.833a.333.333 0 0 1-.333-.333V16.5Z"
        />
        <rect
            width={0.75}
            height={5.037}
            x={11.625}
            y={1.875}
            stroke="#5C5C5C"
            strokeWidth={0.75}
            rx={0.375}
        />
        <rect
            width={21}
            height={1.5}
            x={1.5}
            y={21}
            fill="#5C5C5C"
            stroke="#5C5C5C"
            strokeWidth={0.5}
            rx={0.75}
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const DinnerIcon = memo(ForwardRef)