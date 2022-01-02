export interface IDeveloper {
  _id?: string,
  nome: string,
  sexo: string,
  idade: number,
  hobby: string,
  datanascimento: Date | string,
  nivel?: { nivel: string, _id: string },
  nivelObjId?: string
}
