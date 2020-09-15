import { NameAndDate } from './nameAndDate';

export class Field {
  id: number;
  name: string;
  street: string;
  houseNumber: string;
  postalCode: number;
  place: string;
  phoneNumber: string;
  locationId: number;
  nameAndDate: NameAndDate[];
}

export class FieldForFormData {
  id: string;
  name: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  place: string;
  phoneNumber: string;
  locationId: string;
  nameAndDate: NameAndDate[];
}
