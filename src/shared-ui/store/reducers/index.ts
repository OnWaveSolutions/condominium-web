import { combineReducers, Reducer } from 'redux';

import appReducer from './app';
import condominiumReducer from './condominium.reducer';
import buildingReducer from './building';
import apartmentReducer from './apartment';
import adminReducer from './admin.reducer';
import managerReducer from './manager.reducer';
import tenantReducer from './tenant.reducer';
import companyReducer from './company.reducer';
import serviceReducer from './service.reducer';
import bankAccountReducer from './bank-account.reducer';
import invoiceReducer from './invoice.reducer';

const reducer = combineReducers({
  app: appReducer,
  bankAccount: bankAccountReducer,
  manager: managerReducer,
  tenant: tenantReducer,
  service: serviceReducer,
  invoice: invoiceReducer,
  admin: adminReducer,
  company: companyReducer,
  condominium: condominiumReducer,
  building: buildingReducer,
  apartment: apartmentReducer
});

export type RootState = typeof reducer extends Reducer<infer S> ? S : never;

export default reducer;
