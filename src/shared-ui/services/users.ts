import { User, IAuthorization } from "../models/user";
import Parseus from "@rijudev/parseus";
import { AbstractService } from "./abstract-service";

export class UserService extends AbstractService<User> {
  constructor() {
    super(User, "user");
  }

  async findManagersByCondominiumId(id: number) {
    const { data } = await this.service.get<User[]>(
      `${this.prefix}/condominium/${id}`
    );

    return data.map(item => Parseus.decode(item).to(User));
  }

  async signUp(payload: Partial<User>): Promise<User> {
    const { data } = await this.service.post<User>(
      "user/signup",
      Parseus.encode(payload, User)
    );
    return Parseus.decode(data).to(User);
  }

  async signIn(payload: IAuthorization): Promise<User> {
    const { data } = await this.service.post<User>("user/signin", payload);
    return Parseus.decode(data).to(User);
  }

  async restoreSession(): Promise<User> {
    const { data } = await this.service.get<User>(
      `${this.prefix}/restoresession`
    );
    return Parseus.decode(data).to(User);
  }

  async confirmUser(payload: IAuthorization): Promise<User> {
    const { data } = await this.service.post<User>(
      `${this.prefix}/confirmuser`,
      payload
    );
    return Parseus.decode(data).to(User);
  }
}
