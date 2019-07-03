import admin from "./admin/module";
import manager from "./manager/module";
import apartment from "./apartment/module";
import tenantList from "./tenant-list/module";
import building from "./building/module";
import condominium from "./condominium/module";
import company from "./company/module";
import tenant from "./tenant/module";
import condominumManager from "./condominium-manager/module";
import bankAccount from "./bank-account/module";
import financial from "./financial/module";
import invoiceView from "./financial/invoice/invoice-view/module";
import invoiceListTenant from "./financial/invoice/invoice-list-tenant/module";
import invoiceEditor from "./financial/invoice/invoice-editor/module";
import service from "./service/module";
import ticket from "./ticket/module";
import supplier from "./supplier/module";
import payment from "./payment/module";
import dashboard from "./dashboard/module";

import { IModule } from "../shared-ui/models/module";

const serviceAndProducts: IModule = {
  title: "Setup",
  id: "parent-product-service",
  iconType: "lock",
  children: [service, bankAccount, building, supplier]
};

export const modules = [
  dashboard,
  admin,
  manager,
  ticket,
  payment,
  ...apartment.children,
  tenantList,
  company,
  condominium,
  tenant,
  condominumManager,
  ...financial.children,
  ...serviceAndProducts.children,
  invoiceView,
  { ...invoiceEditor, id: invoiceEditor.id + "-detail/:id" }
];

export const modulesByPermissions: { [id: string]: IModule[] } = {
  SA: modules,
  AD: [admin, company, manager, condominium],
  MA: [dashboard, tenantList, ticket, {...dashboard, title: 'Noticias', id: 'news', },  financial, serviceAndProducts, invoiceView, payment],
  TE: [dashboard, ticket, invoiceListTenant, invoiceView, payment]
};
