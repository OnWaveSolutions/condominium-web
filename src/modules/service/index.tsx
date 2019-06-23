import React, { useEffect, useState } from "react";

import Table, { Column } from "../../components/atoms/table";
import Scrollbar from "../../components/atoms/scrollbar";
import Button from "../../components/atoms/button";
import Modal from "../../components/atoms/modal";
import Row from "../../components/atoms/row";
import { IModule } from "../../shared-ui/models/module";
import BladeTemplate from "../../components/templates/blade-template";
import ServiceForm from "../../components/organisisms/service-form";
import { select } from "../../shared-ui/store/selectors";
import { serviceSelector } from "../../shared-ui/store/selectors/service.selector";
import { useReduxState, useReduxAction } from "../../shared-ui/store/hooks";
import {
  setServiceAction,
  loadServicesAction,
  createServiceAction,
  updateServiceAction
} from "../../shared-ui/store/actions/service.action";
import { managerSelector } from "../../shared-ui/store/selectors/manager.selector";
import { Wrapper } from "../../components/atoms/body-wrapper";
import { Service } from "../../shared-ui/models/service.model";

const serviceState = select(serviceSelector);
const managerState = select(managerSelector);

export default function ServiceView(props: IModule) {
  const [serviceModal, setServiceModal] = useState<boolean>(false);
  const service = useReduxState(serviceState("service"));
  const services = useReduxState(serviceState("services"));
  const condominium = useReduxState(managerState("condominium"));

  const setService = useReduxAction(setServiceAction);
  const loadServices = useReduxAction(loadServicesAction(props.id));
  const create = useReduxAction(createServiceAction(props.id));
  const update = useReduxAction(updateServiceAction(props.id));

  const handleAction = async () => {
    if (service.id) {
      await update(service);
    } else {
      await create(service);
    }
    setServiceModal(false);
  };

  useEffect(() => {
    if (condominium.id === service.condominiumId) return;
    const payload = { condominiumId: condominium.id };
    setService(payload);
    loadServices(payload);
  }, [condominium.id]);

  const handleOpenService = (service: Service) => () => {
    setService(service);
    setServiceModal(true);
  };

  return (
    <>
      <Modal
        visible={serviceModal}
        onCancel={() => setServiceModal(false)}
        onOk={handleAction}
        closable={false}
        title={`${service.id ? "Actualizar" : "Crear"} Servicio`}
      >
        <Row>
          <ServiceForm service={service} serviceChanged={setService} />
        </Row>
      </Modal>
      <BladeTemplate
        header={
          <>
            {
              <Button
                type="primary"
                onClick={handleOpenService({ condominiumId: condominium.id })}
              >
                Crear
              </Button>
            }
          </>
        }
      >
        <Wrapper>
          <div className="isoInvoiceTable">
            <Scrollbar style={{ width: "100%" }}>
              <Table
                dataSource={services}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              >
                <Column
                  title="Nombre"
                  dataIndex="name"
                  width="80px"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title="Descripción"
                  dataIndex="description"
                  width="80px"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title="Día de Corte"
                  dataIndex="cutoffDay"
                  width="80px"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title="Día de pago"
                  dataIndex="dueDay"
                  width="80px"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title="Monto"
                  dataIndex="amount"
                  width="80px"
                  render={(text: string) => <span>{text}</span>}
                />
                <Column
                  title="Editar"
                  dataIndex={"edit"}
                  width={"5%"}
                  render={(_: string, service: Service) => (
                    <Button onClick={handleOpenService(service)} icon="edit" />
                  )}
                />
              </Table>
            </Scrollbar>
          </div>
        </Wrapper>
      </BladeTemplate>
    </>
  );
}