import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 2.41279,
            height: "90%",
            width: "90%",
            marginBottom: "7%"
        }}
        viewBox="0 0 44 52"
        {...props}
    >
        <Path
            d="M2021.19 2157.84h-58.26l20.05-58.25h18.16l20.05 58.25Z"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "4.99px",
            }}
            transform="matrix(-.69778 0 0 -.48572 1411.846 1049.605)"
        />
        <Path
            d="M1955.95 2115.17h-12.73v8.67c0 1.75.67 3.43 1.87 4.67a6.269 6.269 0 0 0 4.5 1.93s0 0 0 0c1.69 0 3.31-.7 4.5-1.93a6.75 6.75 0 0 0 1.86-4.67v-8.67Z"
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: "3.3px",
            }}
            transform="matrix(.92427 0 0 .89188 -1780.114 -1850.15)"
        />
    </Svg>
)
export default SvgComponent
