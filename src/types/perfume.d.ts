export {};

export interface PerfumeProps {
  perfume_id: number;
  perfume_name: string;
  perfume_cost: number;
  perfume_url: string;
  perfume_unit?: string;
  perfume_description?: string;
  perfume_descriptionKz?: string;
  perfume_country?: string;
  perfume_volume?: string;
  perfume_type?: string;
}

export interface IOrder {
  client_name: string;
  client_email: string;
  client_phone: string;
  client_address: string;
  total_price: number;
  perfumes: PerfumeProps[];
}
