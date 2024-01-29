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
        <g fill="#5C5C5C" clipPath="url(#a)">
            <path d="M21.333 5.334H2.667a1.333 1.333 0 0 0-1.334 1.333v10.667a1.333 1.333 0 0 0 1.334 1.333h18.666a1.334 1.334 0 0 0 1.334-1.333V6.667a1.334 1.334 0 0 0-1.334-1.333Zm0 12H2.667V6.667h18.666v10.667Z" />
            <path d="M4.667 8.666H6v1.333H4.667V8.666ZM7.333 8.666h1.334v1.333H7.333V8.666ZM10 8.666h1.333v1.333H10V8.666ZM12.667 8.666H14v1.333h-1.333V8.666ZM15.333 8.666h1.334v1.333h-1.334V8.666ZM18 8.666h1.333v1.333H18V8.666ZM4.667 11.334H6v1.333H4.667v-1.333ZM7.333 11.334h1.334v1.333H7.333v-1.333ZM10 11.334h1.333v1.333H10v-1.333ZM12.667 11.334H14v1.333h-1.333v-1.333ZM15.333 11.334h1.334v1.333h-1.334v-1.333ZM18 11.334h1.333v1.333H18v-1.333ZM18 14.666h1.293v1.333H18v-1.333ZM4.667 14.666H6v1.333H4.667v-1.333ZM7.42 14.666h9.167v1.333H7.42v-1.333Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const KeyBoard = memo(ForwardRef)