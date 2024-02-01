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
        viewBox={'0 0 24 24'}
        fill="none"
        ref={ref}
        {...props}
    >
        <path
            stroke={color ? color : "#5C5C5C"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m23 7-7 5 7 5V7ZM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const VideoRecordIcon = memo(ForwardRef)
