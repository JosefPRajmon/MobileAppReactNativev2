import * as React from 'react';
import * as Application from 'expo-application';
import { useDispatch, useSelector } from 'react-redux';
import { updateModules } from '../store/actions/ModulesActions';
import { AppModules } from '../config/App.config';

export default function modulesCheck() {
  const dispatch = useDispatch();
  const { rehydrated } = useSelector((state: any) => state._persist);
  const { modules } = useSelector((state: any) => state);
  const [modulesCheckComplete, setModulesCheckComplete] = React.useState(false);

  React.useEffect(() => {
    async function checkModulesAsync() {
      const updateTime: number = new Date().getTime();

      try {
        Object.entries(AppModules).map(([moduleID, module]: any) => {
          if (
            module.config.updateable &&
            (!modules[moduleID] ||
              modules[moduleID].updateStatus !== 'updated' ||
              Application.nativeApplicationVersion !==
                modules[moduleID].buildVersion ||
              updateTime - modules[moduleID].lastUpdated >
                module.config.autoUpdateTime)
          ) {
            dispatch(updateModules(moduleID));
          }
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setModulesCheckComplete(true);
      }
    }

    rehydrated && checkModulesAsync();
  }, [rehydrated]);

  return modulesCheckComplete;
}
