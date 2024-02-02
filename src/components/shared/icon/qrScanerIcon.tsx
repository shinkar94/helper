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
        stroke="#000"
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
    >
        <path
            stroke="#F29E61"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.556 4H5a1 1 0 0 0-1 1v2.556M16.444 4H19a1 1 0 0 1 1 1v2.556m0 8.888V19a1 1 0 0 1-1 1h-2.556m-8.888 0H5a1 1 0 0 1-1-1v-2.556m1.778-3.555h.889m1.777 0h.89M5.777 11h4.333a1 1 0 0 0 1-1V5.778m1.778 0v5.333M16.444 11h1.778m-3.555 0h.444m-1.333 1.889h1.333m1.889 0h1.222m0 2.111h-2.666m0 1.889v1.333M13.778 15v3.222m-1.778 0V12.89h-.889m-.889 1.778v3.555m8-.444v0a.444.444 0 0 0-.444-.445v0a.444.444 0 0 0-.445.445v0c0 .245.2.444.445.444v0a.444.444 0 0 0 .444-.444Zm0-11v1.555a1 1 0 0 1-1 1h-1.555a1 1 0 0 1-1-1V6.778a1 1 0 0 1 1-1h1.555a1 1 0 0 1 1 1ZM6.778 9.333h1.555a1 1 0 0 0 1-1V6.778a1 1 0 0 0-1-1H6.778a1 1 0 0 0-1 1v1.555a1 1 0 0 0 1 1Zm.666 8.89h-.666a1 1 0 0 1-1-1v-1.556a1 1 0 0 1 1-1h.666a1 1 0 0 1 1 1v1.555a1 1 0 0 1-1 1Z"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const QrScannerIcon = memo(ForwardRef)

