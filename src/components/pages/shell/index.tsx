import React, { useEffect } from "react";
import debounce from "lodash/fp/debounce";

import Topbar from "../../organisisms/topbar";
import Sidebar from "../../organisisms/sidebar";
import ShellTemplate from "../../templates/shell-template";
import BladeManager from "../../organisisms/blade-manager";
import Icon from "../../atoms/icon";
import Popover from "../../atoms/popover";
import Button from "../../atoms/button";
import TopbarDropdown from "../../molecules/topbar-dropdown";

import { modulesByPermissions } from "../../../modules/module";
import { appSelector } from "../../../shared-ui/store/selectors/app";
import { select } from "../../../shared-ui/store/selectors";
import { useReduxState, useReduxAction } from "../../../shared-ui/store/hooks";
import {
  closeBlade,
  addBlade,
  loadKeylistAction
} from "../../../shared-ui/store/actions/app";

const appState = select(appSelector);

function subscribe(subscriber: any) {
  window.addEventListener("resize", subscriber);

  return () => {
    window.removeEventListener("resize", subscriber);
  };
}

export default function Shell() {
  const blades = useReduxState(appState("blades", {}));
  const user = useReduxState(appState("user"));
  const modules = modulesByPermissions[user.roleId!];

  const handleCloseBlade = useReduxAction(closeBlade);
  const handleAddBlade = useReduxAction(addBlade);
  const loadKeylist = useReduxAction(loadKeylistAction);
  //const addBlade = (mod: IModule) => {
  //  if (blades.some(blade => mod.id === blade.id)) {
  //    return;
  //  }
  //  setBlades([
  //    { blade: mod.id, id: mod.id, route: mod.route, title: mod.title },
  //    ...blades
  //  ]);
  //};
  const handleWindowResize = () => {
    if (window.innerWidth > 800) {
      //setCollapsed(false);
      return;
    }
    //setCollapsed(true);
  };

  useEffect(() => {
    const debouncer = debounce(150)(handleWindowResize);
    const unsubscribe = subscribe(debouncer);
    handleWindowResize();
    loadKeylist();
    return unsubscribe;
  }, []);

  return (
    <ShellTemplate
      topBar={
        <Topbar
        //collapsed={collapsed}
        //onCollapsedChange={setCollapsed}
        >
          {user.roleId === "MA" && (
            <Popover
              trigger="click"
              arrowPointAtCenter={true}
              placement="bottomLeft"
            >
              <Button type="ghost">
                <span>Seleccione un condominio</span>
                <Icon type="down" />
              </Button>
            </Popover>
          )}
        </Topbar>
      }
      sideBar={
        <Sidebar
          modules={modules}
          onBladePress={mod => handleAddBlade(mod.id)}
          //onBladePress={addBlade}
          //collapsed={collapsed}
        />
      }
    >
      <BladeManager
        blades={Object.values(blades)}
        onBladeClose={(id: string) => handleCloseBlade(id)}
      />
    </ShellTemplate>
  );
}
