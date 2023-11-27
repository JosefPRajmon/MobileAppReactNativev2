import React from 'react';
import { View } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { AppStyles, Colors, Metrics } from '../../themes';
import { Button, Toast } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { hideReadedItems } from '../../store/actions/ModulesActions';
import { translate } from '../../services/translate.service';

export function ItemsVisibilityButton(props: any) {
    const dispatch = useDispatch();
    const { moduleID } = props;
    const readedItemsHidden = useSelector((state: any) => state.modules[moduleID]?.readedItemsHidden)

    const toggleVisibility = async () => {
        const isHidden: boolean = readedItemsHidden ? false : true;
        Toast.show({
            text: isHidden ? translate.get("toast-items-visibled") : translate.get("toast-items-invisibled"),
            type: "success",
            buttonText: "Ok",
            duration: 3000
        });
        dispatch(hideReadedItems(moduleID, isHidden));
    }

    return (
        <View style={AppStyles.headerButton}>
            <Button
                transparent
                onPress={toggleVisibility}>
                <Icon
                    size={Metrics.icon.normal}
                    name={readedItemsHidden ? "visibility-off" : "visibility"}
                    color={Colors.navHeader.buttonsColor}
                />
            </Button>
        </View>
    );
}