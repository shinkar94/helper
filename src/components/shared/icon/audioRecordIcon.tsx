import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
interface SvgComponentProps extends SVGProps<SVGSVGElement> {
    color?: string;
}
const SvgComponent = ({ color, ...props }: SvgComponentProps, ref: Ref<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox={'0 0 24 24'}
        ref={ref}
        {...props}
    >
        <path
            stroke={color ? color : "#5C5C5C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3v0Z"
        />
        <path
            stroke={color ? color : "#5C5C5C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 10v2a7 7 0 1 1-14 0v-2M12 19v4M8 23h8"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const AudioRecordIcon = memo(ForwardRef)


