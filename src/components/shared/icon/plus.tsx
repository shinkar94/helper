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
        viewBox="0 0 8 8"
        ref={ref}
        {...props}
    >
        <path
            fill="brown"
            fillRule="evenodd"
            d="M3 3V.833C3 .373 3.448 0 4 0s1 .373 1 .833V3h2.167C7.627 3 8 3.448 8 4s-.373 1-.833 1H5v2.167C5 7.627 4.552 8 4 8s-1-.373-1-.833V5H.833C.373 5 0 4.552 0 4s.373-1 .833-1H3z"
            clipRule="evenodd"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const Plus = memo(ForwardRef)
