export interface ShippingZone {
  id: number;
  name: string;
  order: number;
}

export interface ShippingZoneLocation {
  code: string;
  type: string;
}

export interface ShippingZoneMethod {
  id: number;
  instance_id: number;
  title: string;
  order: number;
  enabled: boolean;
  method_id: string;
  method_title: string;
  method_description: string;
  settings: Record<string, unknown>;
}

export interface ShippingMethod {
  id: string;
  title: string;
  description: string;
}
