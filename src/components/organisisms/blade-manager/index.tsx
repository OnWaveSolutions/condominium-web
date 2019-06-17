import React, { Suspense, lazy, useMemo } from "react";
import { Route } from "react-router-dom";
import { modules } from "../../../modules/module";

import BladeWrapper from "../../molecules/blade-wrapper";
import BladeHeader from "../../molecules/blade-header";
import { IModule } from "../../../shared-ui/models/module";

export interface IBladeManager {
  url: string;
}

//const blades: any = {};

function renderBlade(props: IBladeManager) {
  return (blade: IModule) => {
    let Blade: any;
    Blade = lazy(() => import(`../../../modules/${blade.route}`));
    const component = (props: any) => (
      <Suspense fallback={<h1>loading</h1>}>
        <Blade {...blade} {...props} />
      </Suspense>
    );

    return (
      <Route
        key={blade.id}
        path={`${props.url}${blade.id}`}
        component={component}
      />
    );

    //return (
    //  <BladeWrapper
    //    key={blade.id!}
    //    id={blade.id!}
    //    size={blade.size}
    //    header={<BladeHeader title={blade.title} />}
    //  >
    //    <Suspense fallback={() => <span>loading</span>}>
    //      <Blade {...blade} />
    //    </Suspense>
    //  </BladeWrapper>
    //);
  };
}

export default function BladeManager(props: IBladeManager) {
  return <BladeWrapper>{modules.map(renderBlade(props))}</BladeWrapper>;
}
