import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Metrics } from '../../themes';

function MapClusterMarker(props: any) {
  const { count } = props;

  const getCircleColor = (count: number, type = 'outer') => {
    if (count < 10) {
      if (type === 'outer') {
        return styles.circleSmall;
      } else {
        return styles.circleInnerSmall;
      }
    } else if (count < 100) {
      if (type === 'outer') {
        return styles.circleMedium;
      } else {
        return styles.circleInnerMedium;
      }
    } else {
      if (type === 'outer') {
        return styles.circleLarge;
      } else {
        return styles.circleInnerLarge;
      }
    }
  };

  return (
    <View style={[styles.circle, getCircleColor(count)]}>
      <View style={[styles.circleInner, getCircleColor(count, 'inner')]}>
        <Text allowFontScaling={false} style={styles.text}>
          {count}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 100 / 2
  },
  circleInner: {
    width: 30,
    height: 30,
    borderRadius: 100 / 2,
    paddingTop: 7
  },
  text: {
    color: 'rgb(0, 0, 0)',
    fontSize: Metrics.font.text,
    textAlign: 'center'
  },
  circleSmall: {
    backgroundColor: 'rgba(255, 214, 0, 0.6)'
  },
  circleInnerSmall: {
    backgroundColor: 'rgba(255, 214, 0, 1)'
  },
  circleMedium: {
    backgroundColor: 'rgba(255, 171, 0, 0.6)'
  },
  circleInnerMedium: {
    backgroundColor: 'rgba(255, 171, 0, 1)'
  },
  circleLarge: {
    backgroundColor: 'rgba(255, 109, 0, 0.6)'
  },
  circleInnerLarge: {
    backgroundColor: 'rgba(255, 109, 0, 1)'
  }
});

export default MapClusterMarker;
