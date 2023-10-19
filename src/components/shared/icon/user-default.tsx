import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={800}
        height={800}
        fill="#fe3939"
        stroke="#fe3939"
        viewBox="0 0 512 512"
        ref={ref}
        {...props}
    >
        <circle
            cx={256}
            cy={256}
            r={256}
            style={{
                fill: "#1266a5",
            }}
        />
        <circle
            cx={256}
            cy={115.264}
            r={41.248}
            style={{
                fill: "#fff",
            }}
        />
        <path
            d="m254.048 252.4-39.856-86.416s-41.808.56-41.808 39.024V252.4h81.664zM257.952 252.4l39.856-86.416s41.808.56 41.808 39.024V252.4h-81.664z"
            style={{
                fill: "#fff",
            }}
        />
        <path d="M256 167.52h-27.328L256 228.016l27.328-60.496z" />
        <path
            d="M156.768 406.88v-74.656h36.688c10.432 0 17.728 2.288 21.904 6.848s6.272 12.544 6.272 23.952c0 18.624-1.664 30.592-5.024 35.904-3.36 5.296-10.928 7.952-22.704 7.952h-37.136zm14.16-11.92h20.192c6.784 0 11.168-1.568 13.152-4.672 1.984-3.12 2.976-10 2.976-20.656 0-11.008-.896-18-2.672-20.992s-5.984-4.464-12.576-4.464h-21.056v50.784h-.016zM244.64 344.16v19.248h35.008v10.432H244.64v21.104h37.248v11.92H230.48v-74.656h51.056v11.936H244.64v.016zM340.256 332.224h14.992l-24.064 74.656h-21.76l-23.84-74.656h14.704l14 42.288c1.312 4.048 3.264 10.832 5.856 20.336h.384l1.408-5.088c1.744-6.336 3.248-11.408 4.496-15.184l13.824-42.352z"
            style={{
                fill: "#fff",
            }}
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const UserDefault = memo(ForwardRef)