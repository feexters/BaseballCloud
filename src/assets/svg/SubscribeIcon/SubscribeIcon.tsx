import * as React from "react"

function SubscribeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#99acba"
        d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593C14.365 20.679 13.198 21.812 12 23 5.57 16.619 0 11.853 0 7.192 0 .423 8.852-1.154 12 4.248 15.125-1.114 24 .4 24 7.192c0 .746-.156 1.496-.423 2.253A6.466 6.466 0 0019.5 8a6.508 6.508 0 00-6.5 6.5 6.49 6.49 0 002.473 5.093z"
      />
    </svg>
  )
}

export default SubscribeIcon