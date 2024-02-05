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
        viewBox="0 0 48 48"
        ref={ref}
        {...props}
    >
        <path fill="#fff" fillOpacity={0.01} d="M0 0h48v48H0z" />
        <path
            stroke="#F29E61"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M34 4h10v10m0 20v10H34m-20 0H4V34m0-20V4h10"
        />
        <path
            stroke="#F29E61"
            strokeWidth={4}
            d="M24 40c7.732 0 14-7.164 14-16 0-8.837-6.268-16-14-16s-14 7.163-14 16c0 8.836 6.268 16 14 16Z"
        />
        <path
            stroke="#F29E61"
            strokeLinecap="round"
            strokeWidth={4}
            d="M6 24.008 42 24M20.07 32.106c1.267.937 2.578 1.405 3.93 1.405 1.352 0 2.698-.468 4.038-1.405"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const FaceIDIcon = memo(ForwardRef)
