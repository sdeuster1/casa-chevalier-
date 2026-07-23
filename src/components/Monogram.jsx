export default function Monogram({ color = 'currentColor', size = 60, className = '' }) {
  return (
    <svg
      viewBox="80 390 2090 1790"
      width={size}
      height={size * 1790 / 2090}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="matrix(1 0 0 -1 0 2250)">
        <path
          d="M 765 690 C 615 847.5 345 817.5 255 600 C 142.5 337.5 367.5 135 615 195 C 810 240 997.5 412.5 1125 615 C 1245 810 1252.5 1012.5 1132.5 1230 C 997.5 1477.5 802.5 1665 615 1717.5 C 360 1792.5 142.5 1582.5 255 1320 C 345 1102.5 615 1072.5 765 1230"
          stroke={color}
          strokeWidth="45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 1485 690 C 1635 847.5 1905 817.5 1995 600 C 2107.5 337.5 1882.5 135 1635 195 C 1440 240 1252.5 412.5 1125 615 C 1005 810 997.5 1012.5 1117.5 1230 C 1252.5 1477.5 1447.5 1665 1635 1717.5 C 1890 1792.5 2107.5 1582.5 1995 1320 C 1905 1102.5 1635 1072.5 1485 1230"
          stroke={color}
          strokeWidth="45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
