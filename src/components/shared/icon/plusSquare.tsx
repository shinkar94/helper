import { SVGProps, Ref, forwardRef, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg fill='none' height={800} ref={ref} viewBox='0 0 24 24' width={800} xmlns='http://www.w3.org/2000/svg' {...props}>
        <path clipRule='evenodd' d='M4 4h16v16H4V4Zm1.5 1.5v13h13v-13h-13Z' fill='white' fillRule='evenodd' />
        <path
            clipRule='evenodd'
            d='M11.25 11.25V8h1.5v3.25H16v1.5h-3.25V16h-1.5v-3.25H8v-1.5h3.25Z'
            fill='white'
            fillRule='evenodd'
        />
    </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export const PlusSquare = memo(ForwardRef);