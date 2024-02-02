import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
interface SvgComponentProps extends SVGProps<SVGSVGElement> {
    color?: string;
    secondColor?: string
}
const SvgComponent = ({ color,secondColor, ...props }: SvgComponentProps, ref: Ref<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        fill="none"
        stroke={secondColor ? secondColor : "#fff"}
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
    >
        <g fill={color ? color : "#fff"} fillRule="evenodd" clipRule="evenodd">
            <path d="M12 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-1.993a3.007 3.007 0 1 1 0-6.014 3.007 3.007 0 0 1 0 6.014Z" />
            <path d="M9.562 2a3 3 0 0 0-2.91 2.272L6.218 6H4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-2.22l-.431-1.728A3 3 0 0 0 14.439 2H9.561Zm-.97 2.757A1 1 0 0 1 9.561 4h4.876a1 1 0 0 1 .97.757l.433 1.728A2 2 0 0 0 17.78 8H20a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2.22a2 2 0 0 0 1.94-1.515l.431-1.728Z" />
        </g>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const PhotoIcon = memo(ForwardRef)
