import { Field } from "@rijudev/parseus/dist/lib/src/decorators/fields/field";
export class KeylistType {
  @Field()
  public type?: string;

  @Field()
  public name?: string;

  @Field()
  public disabled?: boolean;
}

export class Keylist {
  @Field({ type: "array", factory: KeylistType })
  documentTypes?: KeylistType[];

  @Field({ type: "array", factory: KeylistType })
  userStatus?: KeylistType[];

  @Field({ type: "array", factory: KeylistType })
  roles?: KeylistType[];

  @Field({ type: "array", factory: KeylistType })
  communicationTypes?: KeylistType[];
}
