import React from 'react';
import { StyleSheet, View } from "react-native";
import Svg, {
	G,
	Path,
	Rect
} from 'react-native-svg';
import { Colors } from '../../themes';
import { ButtonMenu } from '../header/ButtonMenu';

export const NoDataSVG = ({ navigation }: any) => {
	return (
		<View style={styles.container}>
			<Svg width="40%" height="100%" viewBox="0 0 110 62" >
				<G>
					<G>
						<Path fill={Colors.noData} d="M1.814,57.43H6.64v1.196H0v-1.073l4.517-6.084H0.054v-1.196h6.323v1.026L1.814,57.43z M3.312,48.018
			l1.135-1.143h1.313v0.14l-1.984,1.892H2.856L0.896,47.03v-0.155h1.282L3.312,48.018z"/>
						<Path fill={Colors.noData} d="M13.464,58.626c-0.052-0.252-0.092-0.475-0.12-0.668c-0.028-0.192-0.045-0.387-0.05-0.583
			c-0.283,0.401-0.652,0.737-1.108,1.008c-0.456,0.27-0.946,0.405-1.471,0.405c-0.87,0-1.532-0.222-1.988-0.668
			c-0.456-0.444-0.683-1.059-0.683-1.841c0-0.798,0.322-1.422,0.969-1.873c0.646-0.449,1.521-0.675,2.629-0.675h1.652v-0.826
			c0-0.488-0.149-0.876-0.448-1.162c-0.299-0.286-0.721-0.429-1.266-0.429c-0.489,0-0.887,0.126-1.193,0.375
			c-0.306,0.25-0.459,0.55-0.459,0.899H8.477l-0.016-0.047c-0.031-0.606,0.256-1.163,0.861-1.667
			c0.604-0.504,1.386-0.757,2.343-0.757c0.947,0,1.708,0.241,2.285,0.722c0.576,0.481,0.865,1.176,0.865,2.081v4.022
			c0,0.299,0.016,0.586,0.046,0.864s0.087,0.551,0.17,0.818H13.464z M10.94,57.506c0.55,0,1.047-0.141,1.49-0.422
			c0.442-0.283,0.73-0.606,0.865-0.971v-1.355h-1.706c-0.613,0-1.103,0.154-1.471,0.463c-0.368,0.308-0.552,0.669-0.552,1.085
			c0,0.37,0.116,0.662,0.348,0.878S10.487,57.506,10.94,57.506z M12.245,47.045h1.776l0.015,0.047l-2.084,2.007h-1.135
			L12.245,47.045z"/>
						<Path fill={Colors.noData} d="M16.676,54.604c0-1.344,0.287-2.426,0.861-3.25c0.573-0.823,1.378-1.235,2.412-1.235
			c0.489,0,0.923,0.091,1.301,0.271s0.701,0.442,0.969,0.787v-4.594h1.521v12.044h-1.243L22.319,57.6
			c-0.273,0.392-0.607,0.687-1.003,0.888c-0.396,0.2-0.857,0.301-1.382,0.301c-1.019,0-1.817-0.368-2.394-1.108
			c-0.577-0.738-0.865-1.709-0.865-2.914V54.604z M18.197,54.766c0,0.845,0.172,1.52,0.518,2.026
			c0.344,0.508,0.88,0.761,1.606,0.761c0.452,0,0.833-0.103,1.143-0.309c0.309-0.206,0.561-0.494,0.756-0.865V52.48
			c-0.196-0.345-0.449-0.619-0.76-0.822c-0.312-0.203-0.687-0.305-1.124-0.305c-0.731,0-1.27,0.301-1.618,0.903
			c-0.347,0.603-0.521,1.385-0.521,2.347V54.766z"/>
						<Path fill={Colors.noData} d="M27.369,50.272l0.108,1.243c0.278-0.442,0.626-0.785,1.046-1.031c0.419-0.244,0.896-0.366,1.432-0.366
			c0.9,0,1.598,0.265,2.092,0.791c0.494,0.528,0.741,1.343,0.741,2.443v5.273h-1.521v-5.242c0-0.735-0.146-1.259-0.437-1.567
			c-0.29-0.309-0.734-0.463-1.332-0.463c-0.438,0-0.825,0.105-1.162,0.316c-0.337,0.211-0.606,0.5-0.807,0.864v6.092H26.01v-8.354
			H27.369z"/>
						<Path fill={Colors.noData} d="M38.463,58.788c-1.163,0-2.088-0.387-2.775-1.162c-0.687-0.774-1.031-1.779-1.031-3.015v-0.34
			c0-1.188,0.354-2.178,1.062-2.969c0.708-0.789,1.545-1.185,2.513-1.185c1.127,0,1.979,0.34,2.555,1.019
			c0.576,0.68,0.865,1.586,0.865,2.718v0.95h-5.42l-0.023,0.038c0.016,0.802,0.219,1.459,0.61,1.976
			c0.391,0.516,0.939,0.773,1.645,0.773c0.515,0,0.966-0.074,1.355-0.221s0.725-0.348,1.007-0.605l0.595,0.99
			c-0.298,0.295-0.692,0.54-1.181,0.736C39.75,58.689,39.158,58.788,38.463,58.788z M38.231,51.314c-0.51,0-0.945,0.215-1.305,0.643
			c-0.36,0.429-0.582,0.967-0.664,1.612l0.016,0.038h3.852v-0.199c0-0.596-0.159-1.093-0.479-1.493
			C39.333,51.516,38.859,51.314,38.231,51.314z M38.934,47.037h1.776l0.016,0.047l-2.084,2.008h-1.135L38.934,47.037z"/>
						<Path fill={Colors.noData} d="M48.723,57.43h4.826v1.196h-6.64v-1.073l4.516-6.084h-4.462v-1.196h6.323v1.026L48.723,57.43z" />
						<Path fill={Colors.noData} d="M60.373,58.626c-0.051-0.252-0.092-0.475-0.119-0.668c-0.028-0.192-0.045-0.387-0.051-0.583
			c-0.282,0.401-0.652,0.737-1.107,1.008c-0.455,0.27-0.945,0.405-1.471,0.405c-0.869,0-1.533-0.222-1.988-0.668
			c-0.455-0.444-0.683-1.059-0.683-1.841c0-0.798,0.323-1.422,0.969-1.873c0.646-0.449,1.521-0.675,2.628-0.675h1.652v-0.826
			c0-0.488-0.149-0.876-0.447-1.162c-0.299-0.286-0.721-0.429-1.266-0.429c-0.49,0-0.888,0.126-1.193,0.375
			c-0.307,0.25-0.459,0.55-0.459,0.899h-1.452l-0.015-0.047c-0.031-0.606,0.256-1.163,0.861-1.667
			c0.604-0.504,1.386-0.757,2.343-0.757c0.947,0,1.709,0.241,2.285,0.722c0.576,0.481,0.865,1.176,0.865,2.081v4.022
			c0,0.299,0.016,0.586,0.046,0.864c0.031,0.278,0.088,0.551,0.17,0.818H60.373z M57.849,57.506c0.552,0,1.048-0.141,1.49-0.422
			c0.442-0.283,0.73-0.606,0.864-0.971v-1.355h-1.706c-0.612,0-1.103,0.154-1.471,0.463c-0.367,0.308-0.552,0.669-0.552,1.085
			c0,0.37,0.115,0.662,0.348,0.878C57.054,57.399,57.396,57.506,57.849,57.506z M59.153,47.045h1.776l0.016,0.047l-2.085,2.007
			h-1.135L59.153,47.045z"/>
						<Path fill={Colors.noData} d="M65.368,57.43h4.825v1.196h-6.639v-1.073l4.516-6.084h-4.462v-1.196h6.323v1.026L65.368,57.43z" />
						<Path fill={Colors.noData} d="M73.243,50.272l0.108,1.243c0.277-0.442,0.626-0.785,1.046-1.031c0.42-0.244,0.896-0.366,1.433-0.366
			c0.9,0,1.598,0.265,2.092,0.791c0.494,0.528,0.741,1.343,0.741,2.443v5.273h-1.521v-5.242c0-0.735-0.146-1.259-0.437-1.567
			s-0.734-0.463-1.332-0.463c-0.437,0-0.825,0.105-1.162,0.316s-0.606,0.5-0.807,0.864v6.092h-1.521v-8.354H73.243z"/>
						<Path fill={Colors.noData} d="M86.005,58.626c-0.051-0.252-0.092-0.475-0.12-0.668c-0.027-0.192-0.045-0.387-0.05-0.583
			c-0.282,0.401-0.652,0.737-1.107,1.008c-0.456,0.27-0.946,0.405-1.471,0.405c-0.87,0-1.532-0.222-1.988-0.668
			c-0.456-0.444-0.683-1.059-0.683-1.841c0-0.798,0.322-1.422,0.969-1.873c0.645-0.449,1.521-0.675,2.629-0.675h1.651v-0.826
			c0-0.488-0.149-0.876-0.447-1.162s-0.722-0.429-1.267-0.429c-0.489,0-0.887,0.126-1.192,0.375c-0.306,0.25-0.46,0.55-0.46,0.899
			h-1.451l-0.016-0.047c-0.031-0.606,0.256-1.163,0.861-1.667s1.386-0.757,2.343-0.757c0.946,0,1.709,0.241,2.285,0.722
			c0.576,0.481,0.864,1.176,0.864,2.081v4.022c0,0.299,0.016,0.586,0.047,0.864s0.088,0.551,0.17,0.818H86.005z M83.48,57.506
			c0.551,0,1.047-0.141,1.49-0.422c0.443-0.283,0.73-0.606,0.864-0.971v-1.355h-1.706c-0.613,0-1.104,0.154-1.471,0.463
			c-0.367,0.308-0.552,0.669-0.552,1.085c0,0.37,0.116,0.662,0.347,0.878C82.686,57.399,83.027,57.506,83.48,57.506z"/>
						<Path fill={Colors.noData} d="M90.923,50.272l0.108,1.097c0.273-0.396,0.618-0.704,1.038-0.923c0.42-0.218,0.907-0.328,1.463-0.328
			s1.034,0.129,1.433,0.386c0.398,0.258,0.698,0.644,0.899,1.158c0.263-0.473,0.609-0.85,1.042-1.127
			c0.433-0.278,0.938-0.417,1.514-0.417c0.849,0,1.521,0.292,2.015,0.876c0.494,0.585,0.741,1.463,0.741,2.637v4.995h-1.521v-5.011
			c0-0.823-0.142-1.406-0.424-1.748c-0.283-0.342-0.706-0.514-1.267-0.514c-0.521,0-0.94,0.18-1.263,0.54
			c-0.32,0.361-0.51,0.816-0.566,1.366v0.063v5.304h-1.529v-5.011c0-0.781-0.146-1.354-0.436-1.718
			c-0.291-0.362-0.71-0.544-1.255-0.544c-0.464,0-0.845,0.096-1.143,0.285c-0.298,0.191-0.528,0.459-0.688,0.803v6.185h-1.521
			v-8.354H90.923z"/>
						<Path fill={Colors.noData} d="M105.939,55.53l0.27,1.05h0.047l2.053-6.308H110l-3.513,9.635c-0.212,0.562-0.514,1.05-0.907,1.467
			S104.654,62,103.986,62c-0.124,0-0.281-0.014-0.472-0.043c-0.19-0.027-0.337-0.055-0.44-0.081l0.155-1.196
			c-0.031-0.005,0.061,0,0.274,0.016c0.213,0.016,0.348,0.023,0.404,0.023c0.324,0,0.59-0.145,0.796-0.433
			c0.205-0.288,0.378-0.607,0.517-0.958l0.363-0.872l-3.104-8.184h1.698L105.939,55.53z"/>
					</G>
					<G>
						<Path fill={Colors.noData} d="M54.75,0c-11.046,0-20,8.955-20,20s8.954,20,20,20s20-8.955,20-20S65.796,0,54.75,0L54.75,0z" />
						<Path fill="#FFFFFF" d="M54.75,6c7.72,0,14,6.28,14,14s-6.28,14-14,14s-14-6.28-14-14S47.03,6,54.75,6" />

						<Rect x="51.251" y="1.944" transform="matrix(0.7072 0.707 -0.707 0.7072 30.1726 -32.8543)" fill={Colors.noData} width="7" height="36.11" />
					</G>
				</G>
			</Svg>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: "center"
	}
});