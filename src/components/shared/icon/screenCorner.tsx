import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={42}
        height={43}
        fill="none"
        ref={ref}
        {...props}
    >
        <path
            stroke="#F29E61"
            strokeWidth={4}
            d="M40 42.292V18c0-8.837-7.16-16-15.996-16H.48"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const ScreenCornerIcon = memo(ForwardRef)