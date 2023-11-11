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
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
    >
        <g
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            clipPath="url(#a)"
        >
            <path d="M16 3H4v13" />
            <path d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V7Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const StaticCopyIcon = memo(ForwardRef)