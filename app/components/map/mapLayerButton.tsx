import React from 'react';
import { StyleSheet } from 'react-native';
import { ActionSheet, Button } from 'native-base';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { translate } from '../../services/translate.service';
import { getLayersNames, getLayers } from '../../services/mapLayers.service';
import { Colors, AppStyles } from '../../themes';

export default function MapButton(props: any) {
  const { containerStyle, onLayerSelected } = props;

  const toggleLayersPicker = () => {
    let layersNames = getLayersNames();
    layersNames.push(translate.get('btn-cancel'));

    ActionSheet.show(
      {
        options: layersNames,
        cancelButtonIndex: layersNames.length - 1,
        title: translate.get('map-layer-select')
      },
      (buttonIndex) => {
        if (buttonIndex !== layersNames.length - 1) {
          // not cancel button
          const layers = getLayers();
          onLayerSelected(layers[buttonIndex].code);
        }
      }
    );
  }

  return (
    <Button
      onPress={() => toggleLayersPicker()}
      rounded
      style={[styles.buttonStyle, containerStyle]}>
      <Icon
        iconStyle={styles.iconStyle}
        name="layers"
        color={Colors.mainButton.icon}
        type="ionicon"
        size={25}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: "center",
    backgroundColor: Colors.mainButton.background,
    borderRadius: 40,
    width: 40,
    height: 40
  },
  iconStyle: {
    backgroundColor: Colors.mainButton.background,
    color: Colors.mainButton.icon,
    fontSize: 25
  }
})
