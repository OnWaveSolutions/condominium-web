import Parseus from "@rijudev/parseus";
import { IParameterlessConstructor } from "@rijudev/parseus/dist/lib/src/utils";
import axiosInstance from "./axios";
import { Keylist, AdvanceQuery } from "../models/keylist";

export abstract class AbstractService<T extends object> {
  protected service = axiosInstance;
  constructor(
    protected model: IParameterlessConstructor<T>,
    protected prefix: string
  ) {}

  async keylist() {
    const { data } = await this.service.get<Keylist>("keylist/all");

    return Parseus.decode(data).to(Keylist);
  }

  async create(payload: T): Promise<T> {
    const value = Parseus.encode(payload, this.model);
    const { data } = await this.service.post<T>(this.prefix, value);

    return Parseus.decode(data).to(this.model);
  }

  async delete(id: number): Promise<void> {
    await this.service.delete(`${this.prefix}/${id}`);
  }

  async update(id: number, payload: Partial<T>): Promise<T> {
    const { data } = await this.service.put<T>(
      `${this.prefix}/${id}`,
      Parseus.encode(payload, this.model)
    );

    return Parseus.decode(data).to(this.model);
  }

  async findOne(id: number): Promise<T> {
    const { data } = await this.service.get<T>(`${this.prefix}/${id}`);

    return Parseus.decode(data).to(this.model);
  }

  async query(
    payload: AdvanceQuery<T> | AdvanceQuery<T>[],
    sortBy?: any
  ): Promise<T[]> {
    const { data } = await axiosInstance.post<T[]>(`${this.prefix}/find`, {
      query: payload,
      sortBy
    });

    return data.map(item => Parseus.decode(item).to(this.model));
  }

  async report(
    payload: AdvanceQuery<T> | AdvanceQuery<T>[],
    sortBy?: any
  ): Promise<any> {
    const { data } = await axiosInstance.post<any>(`${this.prefix}/report`, {
      query: payload,
      sortBy
    });

    return data;
  }
}
