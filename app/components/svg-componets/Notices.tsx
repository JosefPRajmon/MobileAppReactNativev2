import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const SvgComponent = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 1.5,
            margin: "10%",
            height: "70%",
            width: "70%"
        }}
        viewBox="0 0 242 213"
        {...props}
    >
        <Path
            d="m642.236 548.128 41.464 59.774H520.421l27.524-59.774h25.971"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "6.54px",
            }}
            transform="translate(-735.89 -657.37) scale(1.42295)"
        />
        <Path
            d="M624.771 398.31s-36.452 49.269-36.452 70.384c0 20.119 16.333 36.452 36.452 36.452 20.118 0 36.452-16.333 36.452-36.452 0-21.115-36.452-70.384-36.452-70.384Z"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "6.54px",
            }}
            transform="rotate(-180 507.56 361.725) scale(1.42295)"
        />
        <Circle
            cx={617.548}
            cy={413.281}
            r={14.026}
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "6.54px",
            }}
            transform="translate(-752.63 -530.179) scale(1.42295)"
        />
        <Path
            d="m540.649 563.975 42.457 18.713 8.651 25.214M587.477 595.427l42.623-9.488L654.633 566"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "6.54px",
            }}
            transform="translate(-735.89 -657.37) scale(1.42295)"
        />
        <Path
            d="m636.528 580.714 18.105 14.713-.679 12.475"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "6.54px",
            }}
            transform="translate(-735.89 -657.37) scale(1.42295)"
        />
    </Svg>
)
export default SvgComponent
