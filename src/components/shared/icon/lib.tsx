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
        viewBox="0 0 512 512"
        ref={ref}
        {...props}
    >
        <circle cx={99.4} cy={111.3} r={21.7} />
        <path d="m499.5 348.2-132-321.4c-4.3-10.4-16.2-15.4-26.6-11.1L224.4 63.4c-13.6 5.9-13.9 20.4-11.2 26.6l132 321.4c7.5 16.1 23.4 12.9 26.6 11.1l116.4-47.6c14.9-6.6 13.7-20.5 11.3-26.7zM258.8 93.4l78.6-32.2 42.5 103.4-78.6 32.2-42.5-103.4zM375.3 377l-58.5-142.4 78.6-32.2 58.5 142.4-78.6 32.2z" />
        <circle cx={318.4} cy={126.8} r={21.7} />
        <path d="M167.4 11h-136C20.1 11 11 20.1 11 31.4v375.4c0 11.3 9.1 20.4 20.4 20.4h136c11.3 0 20.4-9.1 20.4-20.4V31.4c0-11.3-9.1-20.4-20.4-20.4zM147 386.4H51.8V216.8H147v169.6zm0-210.4H51.8V51.8H147V176zM480.6 501H31.4c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h449.2c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4z" />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const LibIcon = memo(ForwardRef)