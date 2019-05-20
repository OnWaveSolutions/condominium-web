import axiosInstance from "./axios";
import Parseus from "@rijudev/parseus";
import { Apartment } from "../models/apartment";

export async function createApartment(
  apartment: Apartment
): Promise<Apartment> {
  const { data } = await axiosInstance.post<Apartment>(
    "apartment",
    Parseus.encode(apartment, Apartment)
  );
  return Parseus.decode(data).to(Apartment);
}

export async function getApartment(
  where: Partial<Apartment> = {}
): Promise<Apartment[]> {
  const { data } = await axiosInstance.post<Apartment[]>(
    "apartment/find",
    where
  );
  return data.map(item => Parseus.decode(item).to(Apartment));
}

export async function updateApartment(
  id: number,
  patch: Partial<Apartment>
): Promise<Apartment> {
  const { data } = await axiosInstance.put<Apartment>(`apartment/${id}`, {
    ...Parseus.encode(patch, Apartment),
    vacancy: patch.vacancy
  });
  return Parseus.decode(data).to(Apartment);
}