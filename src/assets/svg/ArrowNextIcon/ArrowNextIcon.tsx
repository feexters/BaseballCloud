import * as React from "react";

function ArrowNextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={44}
      height={44}
      viewBox="0 0 44 44"
      {...props}
    >
      <defs>
        <filter
          id="prefix__a"
          width="134.7%"
          height="134.7%"
          x="-17.4%"
          y="-17.4%"
          filterUnits="objectBoundingBox"
        >
          <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation={2}
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0.282352941 0 0 0 0 0.733333333 0 0 0 0 1 0 0 0 0.8 0"
          />
        </filter>
        <path
          id="prefix__b"
          d="M18 .72C27.544.72 35.28 8.456 35.28 18c0 9.545-7.736 17.28-17.28 17.28S.72 27.545.72 18C.72 8.456 8.456.72 18 .72z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero" transform="translate(4 4)">
          <use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
          <use fill="#48BBFF" fillRule="evenodd" xlinkHref="#prefix__b" />
        </g>
        <path
          fill="#FFF"
          d="M23.8 22l-4.144-4.51a.921.921 0 010-1.293.9.9 0 011.278 0l5.053 5.155a.92.92 0 010 1.29l-5.053 5.156a.896.896 0 01-1.278 0 .92.92 0 010-1.29L23.8 22z"
        />
      </g>
    </svg>
  );
}

export default ArrowNextIcon;
