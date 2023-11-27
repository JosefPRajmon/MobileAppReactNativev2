import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const SvgComponent = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
            margin: "10%",
            height: "70%",
            width: "70%"
        }}
        viewBox="0 0 211 207"
        {...props}
    >
        <Path
            d="M816.136 299.358H735.82l16.941-41.419c1.91-4.669 6.135-7.672 10.794-7.672h24.846c4.659 0 8.884 3.003 10.794 7.672l16.941 41.419Z"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "4.94px",
            }}
            transform="matrix(1.96794 0 0 1.79126 -1421.656 -374.496)"
        />
        <Path
            d="M710.458 298.577c0-1.405-.408-2.753-1.133-3.746-.725-.994-1.709-1.552-2.735-1.552h-99.757c-1.026 0-2.009.558-2.735 1.552-.725.993-1.133 2.341-1.133 3.746v25.68h107.493v-25.68Z"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "5.91px",
                strokeLinecap: "round",
                strokeMiterlimit: 1.5,
            }}
            transform="matrix(1.79612 0 0 1.3111 -1074.116 -222.786)"
        />
        <Path
            d="M639.038 194.966h5.488v21.393h-5.488z"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "2.56px",
            }}
            transform="matrix(4.96321 0 0 1.3398 -3079.879 -218.292)"
        />
        <Circle
            cx={727.584}
            cy={220.293}
            r={18.812}
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "7.42px",
            }}
            transform="matrix(1.25317 0 0 1.25317 -806.374 -158.303)"
        />
        <Path
            d="M833.564 222.469a9.243 9.243 0 0 1 5.929 1.621 47.102 47.102 0 0 1 4.432 3.542c6.811 6.186 10.895 14.075 10.895 22.662v2.216a2.068 2.068 0 0 1-2.07 2.07h-22.911a1.967 1.967 0 0 1-1.967-1.967v-7.633a4.127 4.127 0 0 0-3.482-4.076 121.14 121.14 0 0 0-18.25-1.397c-6.05 0-11.953.469-17.556 1.295a4.913 4.913 0 0 0-4.172 4.857c-.004 2.226-.004 4.877-.004 6.708a2.213 2.213 0 0 1-2.213 2.213H759.53a2.07 2.07 0 0 1-2.07-2.07v-2.216c0-8.587 4.084-16.476 10.895-22.662a44.395 44.395 0 0 1 5.774-4.42 5.362 5.362 0 0 1 3.294-.83c8.61.632 18.373.992 28.717.992 9.829 0 19.134-.325 27.424-.905Z"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "4.49px",
            }}
            transform="translate(-1563.267 -455.388) scale(2.06997)"
        />
    </Svg>
)
export default SvgComponent
