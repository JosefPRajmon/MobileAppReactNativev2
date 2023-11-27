import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import BoardListScreen from '../../screens/BoardListScreen';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { BOARD_DETAIL, BOARD_FILTER_MODAL } from '../ScreenNames';
import BoardDetailScreen from '../../screens/BoardDetailScreen';
import { BoardFilterModal } from '../../modals/BoardFilterModal';
import { BoardConfig } from '../../config/modules/Board.config';
import { useDispatch } from 'react-redux';
import { BOARD_OPEN_MODAL, BOARD_RESET } from '../../store/actions/actionTypes';
import { HeaderButton } from '../../components/header/HeaderButton';
import appStyles from '../../themes/AppStyles';
import { View } from 'react-native';
import { AppModules } from '../../config/App.config';

const Board = createStackNavigator();

export default function BoardStackNavigator({ navigation }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch({ type: BOARD_RESET });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Board.Navigator>
      <Board.Screen
        name={BoardConfig.moduleID}
        component={BoardListScreen}
        options={{
          ...GlobalNavigationOptions,
          //headerLeft: () => <HeaderNavButton type='menu' />,
          headerTitle: translate.get(
            AppModules.board.title || AppModules.board.config.title
          ),
          /*headerRight: () => (
            <View style={appStyles.headerRightContainer}>
              <HeaderButton
                iconType='MaterialCommunityIcons'
                iconName={'filter-outline'}
                onPress={() =>
                  dispatch({
                    type: BOARD_OPEN_MODAL,
                    payload: true
                  })
                }
              />
            </View>
          )*/
        }}
      />
      <Board.Screen
        name={BOARD_DETAIL}
        component={BoardDetailScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type='back' />,
          headerTitle: translate.get(
            AppModules.board.title || AppModules.board.config.title
          )
        }}
      />
      <Board.Screen
        name={BOARD_FILTER_MODAL}
        component={BoardFilterModal}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type='back' />,
          headerTitle: 'Filtrovat oznámení'
          //...ModalTransition
        }}
      />
    </Board.Navigator>
  );
}
