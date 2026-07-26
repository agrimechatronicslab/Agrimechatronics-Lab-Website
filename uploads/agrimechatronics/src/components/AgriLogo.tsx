import { CSSProperties } from "react";

interface AgriLogoProps {
  className?: string;
  style?: CSSProperties;
}

export default function AgriLogo({ className = "h-12", style }: AgriLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} style={style}>
      {/* High-fidelity Vector Representation of the Agri Mechatronics Logo */}
      <svg
        viewBox="0 0 512 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Main "Agri" wordmark */}
        <g id="Agri">
          {/* Stylized Tech 'A' with circuit line & dot */}
          <path
            d="M50 160L90 40H120L160 160H130L118 120H82L70 160H50Z"
            fill="#0016FF"
          />
          {/* White circuit line in 'A' */}
          <path
            d="M87 90L72 140"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Circuit connection point node */}
          <circle cx="71" cy="144" r="5" fill="white" />
          
          {/* Two Vibrant Green Leaves sprouting out between A and g */}
          {/* Leaf 1 (Big leaf) */}
          <path
            d="M135 70C130 50 145 25 165 20C175 35 170 60 150 70C145 72 138 72 135 70Z"
            fill="#32B83E"
          />
          <path
            d="M135 70C145 55 158 40 165 20"
            stroke="#195C1F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Leaf 2 (Small leaf, tilted right) */}
          <path
            d="M165 72C165 60 178 48 192 50C195 62 185 75 172 78C168 79 166 76 165 72Z"
            fill="#32B83E"
          />
          <path
            d="M165 72C172 65 182 58 192 50"
            stroke="#195C1F"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Elegant Rounded 'g' */}
          <path
            d="M210 100C210 75 230 65 255 65C280 65 285 80 285 100V135C285 155 270 165 245 165C220 165 210 155 210 135H235C235 145 242 148 248 148C258 148 260 142 260 135V130C250 134 240 135 235 135C215 135 210 120 210 100ZM260 98C260 90 255 83 245 83C235 83 235 90 235 98C235 106 235 113 245 113C255 113 260 106 260 98Z"
            fill="#0016FF"
          />

          {/* Rounded lowercase styled 'r' */}
          <path
            d="M305 75h25v12c5-8 12-14 22-14v22c-12 0-22 10-22 25v40h-25V75z"
            fill="#0016FF"
          />

          {/* High-tech mechatronic gear 'i' */}
          <path
            d="M370 75H392V160H370V75Z"
            fill="#0016FF"
          />
          {/* Gear teeth details on the side of 'i' as visual in the logo image */}
          <path
            d="M392 90C396 90 398 92 398 94C398 96 396 98 392 98M392 115C396 115 398 117 398 119C398 121 396 123 392 123M392 140C396 140 398 142 398 144C398 146 396 148 392 148"
            stroke="#0016FF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="381" cy="55" r="10" fill="#0016FF" />
          {/* Gear indent in 'i' dot */}
          <circle cx="381" cy="55" r="4" fill="black" />
        </g>

        {/* Bold geometric modern "MECHATRONICS" wordmark */}
        <text
          x="44"
          y="215"
          fill="#0016FF"
          fontFamily="'Barlow', 'Inter', sans-serif"
          fontSize="52"
          fontWeight="900"
          letterSpacing="1"
        >
          MECHATRONICS
        </text>
      </svg>
    </div>
  );
}
