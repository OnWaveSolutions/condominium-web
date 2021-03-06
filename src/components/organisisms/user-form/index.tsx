import React from "react";

import { Rifm } from "rifm";
import Input from "../../atoms/input";
import Select from "../../atoms/select";
import FormItem from "../../molecules/form-item";

import { User } from "../../../shared-ui/models/user";
import { Keylist, KeylistType } from "../../../shared-ui/models/keylist";
import {
  changeHandler,
  identificationFormat
} from "../../../shared-ui/utils/input";

export interface IUserForm {
  user?: Partial<User>;
  keylist?: Keylist;
  disabledAll?: boolean;
  hideDocuments?: boolean;
  userChanged?(user: User): void;
}

export default function UserForm(props: IUserForm) {
  const { user, userChanged, hideDocuments, keylist, disabledAll } = props;
  const changer = changeHandler(user!, userChanged!);
  const onItemSelect = (name: string, value: any) => {
    userChanged!({ ...user, [name]: value });
  };
  const disabledPStatus = (status: KeylistType) => {
    if (["P", "C"].includes(status.type!)) {
      status.disabled = true;
    }

    return status;
  };

  const formatID = identificationFormat(user!.documentId);
  return (
    <>
      <FormItem label={"Email"}>
        <Input
          name="username"
          onChange={changer}
          value={user!.username}
          disabled={Boolean(user!.id) || disabledAll}
        />
      </FormItem>
      <FormItem label="Estado">
        <Select
          name="status"
          disabled={
            ["P", "C"].includes(user!.status!) || !user!.id || disabledAll
          }
          data={
            keylist!.userStatus ? keylist!.userStatus!.map(disabledPStatus) : []
          }
          value={user!.status}
          onChangeItem={onItemSelect}
        />
      </FormItem>
      <FormItem label="Nombre">
        <Input
          name="name"
          onChange={changer}
          value={user!.name}
          disabled={disabledAll}
        />
      </FormItem>
      <FormItem label="Apellido">
        <Input
          name="lastName"
          onChange={changer}
          value={user!.lastName}
          disabled={disabledAll}
        />
      </FormItem>
      {!hideDocuments ? (
        <>
          <FormItem label="Tipo de documento">
            <Select
              name="documentId"
              disabled={disabledAll}
              onChangeItem={onItemSelect}
              value={user!.documentId}
              data={keylist!.documentTypes!}
            />
          </FormItem>
          <FormItem label="Documento">
            <Rifm
              value={user!.document!}
              format={formatID}
              accept={/\d+/g}
              onChange={value => onItemSelect("document", value)}
            >
              {({ value, onChange }) => (
                <Input
                  name="document"
                  value={value}
                  onChange={onChange}
                  disabled={disabledAll}
                />
              )}
            </Rifm>
          </FormItem>
        </>
      ) : null}
    </>
  );
}

UserForm.defaultProps = {
  user: {},
  keylist: {}
} as Partial<IUserForm>;
