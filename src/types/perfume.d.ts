export {};

export interface PerfumeProps {
  id: number;
  name: string;
  cost: number;
  url: string;
  unit?: string;
  description?: string;
  descriptionKz?: string;
  country?: string;
  volume?: string;
  type?: string;
}

export interface IOrder {
  client_name: string;
  client_email: string;
  client_phone: string;
  client_address: string;
  total_price: number;
  perfumes: PerfumeProps[];
}
