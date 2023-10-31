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
        fill="#fff"
        stroke="#fff"
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
    >
        <path d="M2 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1Zm1-6h4v4H3Zm20 2a1 1 0 0 1-1 1H12a1 1 0 0 1 0-2h10a1 1 0 0 1 1 1Zm0 10a1 1 0 0 1-1 1H12a1 1 0 0 1 0-2h10a1 1 0 0 1 1 1ZM8.207 15.207 6.414 17l1.793 1.793a1 1 0 1 1-1.414 1.414L5 18.414l-1.793 1.793a1 1 0 0 1-1.414-1.414L3.586 17l-1.793-1.793a1 1 0 0 1 1.414-1.414L5 15.586l1.793-1.793a1 1 0 0 1 1.414 1.414Z" />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const TodoIcon = memo(ForwardRef)