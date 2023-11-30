import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
        }}
        viewBox="0 0 142 125"
        {...props}
    >
        <Path
            d="M47.113 33.677H6.25a6.252 6.252 0 0 1-6.252-6.251V6.225A6.252 6.252 0 0 1 6.25-.027h94.232a6.252 6.252 0 0 1 6.252 6.252v21.201a6.252 6.252 0 0 1-6.252 6.251H59.621v10.408h73.707a6.252 6.252 0 0 1 6.252 6.251v21.202a6.252 6.252 0 0 1-6.252 6.251H92.462v10.408h40.866a6.252 6.252 0 0 1 6.252 6.251v21.201a6.252 6.252 0 0 1-6.252 6.252H39.095a6.252 6.252 0 0 1-6.252-6.252V94.448a6.252 6.252 0 0 1 6.252-6.251h40.869V77.789H39.095a6.252 6.252 0 0 1-6.252-6.251V50.336a6.252 6.252 0 0 1 6.252-6.251h8.018V33.677Zm6.254-12.505 40.864.002v-8.698h-81.73v8.698l40.866-.002Zm33.235 44.114h40.474v-8.698H45.347v8.698h40.477a6.267 6.267 0 0 1 .778 0Zm40.474 35.414H45.347v8.698h81.729V100.7Z"
            style={{
                fill: "#fff",
            }}
        />
    </Svg>
)
export default SvgComponent
