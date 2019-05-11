import React from "react";

import Input from "../../atoms/input";
import FormItem from "../../molecules/form-item";
import { Condominium } from "../../../shared-ui/models/condominium";
import { changeHandler } from "../../../shared-ui/utils/input";

export interface ICondominiumForm {
  condominium: Condominium;
  condominiumChanged?(condominium: Condominium): void;
}

export default function CondominiumForm(props: ICondominiumForm) {
  const { condominium, condominiumChanged } = props;
  const changer = changeHandler(condominium, condominiumChanged!);

  return (
    <>
      <FormItem label="Nombre" sm={24} md={24}>
        <Input name="name" onChange={changer} value={condominium.name} />
      </FormItem>
      <FormItem label="Dirección" sm={24} md={24}>
        <Input name="address" onChange={changer} value={condominium.address} />
      </FormItem>
      {/*<FormItem label="Latitud">
        <Input
          disabled={true}
          name="latitude"
          onChange={changer}
          value={condominium.latitude}
        />
      </FormItem>
      <FormItem label="Longitud">
        <Input
          disabled={true}
          name="longitude"
          onChange={changer}
          value={condominium.longitude}
        />
      </FormItem>
    */}
    </>
  );
}
