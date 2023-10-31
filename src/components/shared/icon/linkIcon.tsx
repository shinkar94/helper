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
        stroke="#fff"
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeWidth={2}
            d="M9.165 17.65c-.24.224-.425.374-.615.484a3 3 0 0 1-3 0c-.342-.198-.67-.527-1.328-1.184-.658-.658-.987-.987-1.184-1.329a3 3 0 0 1 0-3c.197-.342.526-.67 1.184-1.328L7.05 8.464c.658-.657.986-.986 1.328-1.183a3 3 0 0 1 3 0c.342.197.671.526 1.329 1.183.657.658.986.987 1.184 1.329a3 3 0 0 1 0 3c-.11.19-.26.375-.483.615m-2.816-2.816c-.224.24-.374.425-.483.615a3 3 0 0 0 0 3c.197.342.526.671 1.184 1.329.657.657.986.986 1.328 1.183a3 3 0 0 0 3 0c.342-.197.67-.526 1.329-1.184l2.828-2.828c.658-.658.986-.986 1.184-1.328a3 3 0 0 0 0-3c-.198-.342-.526-.671-1.184-1.329-.658-.657-.986-.986-1.328-1.184a3 3 0 0 0-3 0c-.19.11-.376.26-.615.484"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const LinkIcon = memo(ForwardRef)
