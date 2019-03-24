export interface BaseModel {
  id: number;
}

export function instanceOfModel(object: any): object is BaseModel {
  return 'id' in object;
}
