import { IDeveloper } from "./IDeveloper";

export interface ILevel {
  _id?: string,
  nivel: string,
  qtd: number,
  idString?: string,
  developers?: IDeveloper[]
}
