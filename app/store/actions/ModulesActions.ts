import { updateData } from '../../providers/BackendProvider';
import {
    MODULE_UPDATING,
    MODULE_FAILED,
    MODULE_UPDATED,
    MODULE_HIDE_READED_ITEMS,
    MODULE_ADD_REDED_ITEM_ID
} from './actionTypes';

export const updateModules = (moduleID: string) => {
    return async (dispatch: any) => {
        await dispatch({
            type: MODULE_UPDATING,
            moduleID: moduleID
        });

        const result = await updateData(moduleID);

        result ?
            await dispatch({
                type: MODULE_UPDATED,
                moduleID: moduleID
            }) :
            await dispatch({
                type: MODULE_FAILED,
                moduleID: moduleID
            });
    }
}

export const hideReadedItems = (moduleID: string, isHidden: boolean) => {
    return async (dispatch: any) => {
        await dispatch({
            type: MODULE_HIDE_READED_ITEMS,
            moduleID: moduleID,
            payload: isHidden
        });
    }
}

export const addReadedItemId = (moduleID: string, itemId: any) => {
    return async (dispatch: any, getState: any) => {
        let readedItems: any = getState().modules[moduleID]?.readedItems || [];

        if (readedItems.indexOf(itemId) === -1) {
            readedItems.push(itemId);

            await dispatch({
                type: MODULE_ADD_REDED_ITEM_ID,
                moduleID: moduleID,
                payload: readedItems
            })
        }
        return true;
    }
}