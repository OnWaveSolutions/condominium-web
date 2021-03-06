import { Field } from "@rijudev/parseus";
import { Building } from "./building";
import { Service } from "./service.model";
import { BooleanTransformer } from "../utils/boolean";

export class ApartmentUser {
  @Field()
  id?: number;
  @Field()
  username?: string;
  @Field()
  name?: string;
  @Field()
  lastName?: string;
}

export class Apartment {
  @Field()
  id?: number;
  @Field()
  name?: string;
  @Field()
  buildingId?: number;
  @Field()
  serviceId?: number;
  @Field({ type: "number" })
  floor?: number;
  @Field({ type: "decimal", fixed: 2 })
  mt2?: number;
  @Field({ type: "number", default: 0 })
  parkingLots?: number;
  @Field()
  createdAt?: string;
  @Field()
  updatedAt?: string;

  @Field({ type: "decimal", fixed: 2 })
  invoiceBalance?: number;

  @Field({ factory: Building, type: "object" })
  building?: Building;

  @Field({ factory: Service, type: "object" })
  service?: Service;

  @Field({ factory: ApartmentUser, type: "array" })
  tenants?: ApartmentUser[];

  @Field({ transformer: new BooleanTransformer() })
  public deprecated?: boolean;
}

export class ApartmentTenant {
  @Field()
  apartmentId?: number;

  @Field()
  tenantId?: number;

  @Field()
  default?: boolean;
}
