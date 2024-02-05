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
        viewBox="0 0 32 32"
        ref={ref}
        {...props}
    >
        <path d="m5.25 2.75-.563.531-1.406 1.406-.531.563.406.656 2.094 3.5.281.5H8.47l4 3.969c-3.574 3.59-8.121 8.152-8.281 8.313-1.567 1.566-1.57 4.132.03 5.625 1.563 1.542 4.11 1.582 5.595 0l.03-.032L16 21.594l6.188 6.218.093.063c1.57 1.48 4.067 1.5 5.532-.063v-.03h.03c1.532-1.567 1.548-4.114-.03-5.595l-.032-.03-5.218-5.188c3.511-.328 6.261-3.293 6.312-6.875h.031c.004-.02 0-.043 0-.063V10c.098-1.156-.152-2.262-.75-3.219L27.47 5.72l-4.657 4.656-1.406-1.469 4.75-4.75-1.375-.562A7.03 7.03 0 0 0 22 3c-3.844 0-7 3.156-7 7 0 .418.09.781.156 1.156-.437.438-.765.797-1.281 1.313L9.906 8.5V5.531l-.5-.281-3.5-2.094ZM22 5c.14 0 .238.082.375.094l-3.781 3.781.687.719 2.813 2.906.687.719L26.75 9.25c.02.23.184.398.156.656V10c0 2.754-2.246 5-5 5-.367 0-.812-.086-1.312-.188l-.532-.093-.375.375-11.28 11.312h-.032v.032c-.71.777-1.953.796-2.781-.032v-.031h-.032c-.777-.71-.796-1.953.032-2.781.379-.38 7.718-7.782 11.312-11.375l.407-.406-.157-.563A6.113 6.113 0 0 1 17 10c0-2.754 2.246-5 5-5Zm-16.438.25 2.344 1.438v1l-.218.218h-1L5.25 5.563Zm14.625 12.156 6.22 6.188v.031h.03c.778.71.797 1.953-.03 2.781h-.032v.032c-.71.777-1.953.796-2.781-.032l-6.188-6.218Z" />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const ToolsIcon = memo(ForwardRef)