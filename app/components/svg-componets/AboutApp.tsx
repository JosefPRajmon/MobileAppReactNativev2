import * as React from "react"
import Svg, { G, ClipPath, Path } from "react-native-svg"
const SvgComponent = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
            margin: "10%",
            height: "70%",
            width: "70%"
        }}
        viewBox="0 0 200 200"
        {...props}
    >
        <G transform="translate(37.562 48.538) scale(1.46349)">
            <ClipPath id="a">
                <Path d="M0 0h85v70H0z" />
            </ClipPath>
            <G clipPath="url(#a)">
                <Path
                    d="M53.183 69.158a3.16 3.16 0 0 1-3.158-3.162v-9.371H3.163A3.16 3.16 0 0 1 0 53.463v-21.95a3.16 3.16 0 0 1 1.488-2.68L46.888.471A3.273 3.273 0 0 1 48.567 0h22.137a3.164 3.164 0 0 1 3.163 3.163v34.429h7.012a3.158 3.158 0 0 1 3.163 3.162v12.713a3.16 3.16 0 0 1-3.163 3.162h-7.012V66a3.164 3.164 0 0 1-3.163 3.163H53.183v-.005Zm-3.158-31.57V23.042L27.133 37.588h22.892Z"
                    style={{
                        fill: "#fff",
                        fillOpacity: 0.5,
                        fillRule: "nonzero",
                    }}
                />
                <Path
                    d="M77.717 37.588V50.3H67.546v12.533H50.025V50.3H0V28.354L45.404 0h22.138v37.588h10.175Zm-64.617 0h36.925V14.129L13.1 37.588Z"
                    style={{
                        fill: "#fff",
                        fillRule: "nonzero",
                    }}
                />
            </G>
        </G>
        <Path
            d="M5680.85 5027.36c0-8.58-3.41-16.8-9.47-22.86a32.344 32.344 0 0 0-22.86-9.47h-125.56c-8.58 0-16.8 3.41-22.86 9.47a32.327 32.327 0 0 0-9.47 22.86v125.56c0 8.57 3.41 16.79 9.47 22.86a32.317 32.317 0 0 0 22.86 9.46h125.56c8.57 0 16.8-3.4 22.86-9.46a32.362 32.362 0 0 0 9.47-22.86v-125.56Z"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: "9.3px",
            }}
            transform="translate(-5485.98 -4990.38)"
        />
    </Svg>
)
export default SvgComponent
