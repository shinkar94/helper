import { SVGProps, Ref, forwardRef, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg height={800} ref={ref} viewBox='0 0 24 24' width={800} xmlns='http://www.w3.org/2000/svg' {...props}>
        <path d='M0 0h24v24H0z' fill='none' />
        <path
            d='M17 8h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2v2H5v9h14v-9h-2V8zM6.5 5.5l1.414 1.414L11 3.828V14h2V3.828l3.086 3.086L17.5 5.5 12 0 6.5 5.5z'
            fill='white'
        />
    </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export const Share = memo(ForwardRef);