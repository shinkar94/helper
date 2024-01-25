import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        width={800}
        height={800}
        fill="#fff"
        stroke="#fff"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
    >
        <g id="SVGRepo_iconCarrier">
            <defs>
                <style>
                    {
                        ".cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:1.91px}"
                    }
                </style>
            </defs>
            <path d="M7.23 1.5h9.54" className="cls-1" />
            <circle cx={12} cy={14.86} r={2.86} className="cls-1" />
            <path
                d="m7.87 17.25 1.65-.95M16.13 12.48l-1.65.95M16.13 17.25l-1.65-.95M7.87 12.48l1.65.95M12 10.09V12M12 19.64v-1.91M19.64 14.86a7.63 7.63 0 0 0-4.78-7.07V1.5H9.14v6.29a7.63 7.63 0 0 0 2.18 14.68h1.36a7.65 7.65 0 0 0 6.96-7.61Z"
                className="cls-1"
            />
        </g>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const TestingIcon = memo(ForwardRef)
