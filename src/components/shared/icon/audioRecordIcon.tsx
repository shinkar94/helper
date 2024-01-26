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
        viewBox="-9.5 0 32 32"
        ref={ref}
        {...props}
    >
        <title>{"record"}</title>
        <path d="M2.656 11.25V8.281c0-1.906 1.719-3.5 3.906-3.5 2.156 0 3.906 1.594 3.906 3.5v2.969H2.655zm10.532.188v5.969c-1.281 3.5-5.063 4.031-5.063 4.031v3.969h4.156v1.781H.843v-1.781h4.188v-3.969S1.281 20.907 0 17.407v-5.969l1.531-.719v5.438S2 19.813 6.562 19.813s5.094-3.656 5.094-3.656v-5.438zm-2.719.843v2.688c0 1.906-1.75 3.5-3.906 3.5-2.188 0-3.906-1.594-3.906-3.5v-2.688h7.813z" />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const AudioRecordIcon = memo(ForwardRef)
