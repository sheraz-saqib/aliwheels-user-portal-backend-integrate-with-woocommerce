export interface OrderAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface OrderMetaData {
  id?: number;
  key: string;
  value: any;
}

export interface OrderLineItem {
  id?: number;
  name: string;
  product_id: number;
  variation_id?: number;
  quantity: number;
  tax_class?: string;
  subtotal: string;
  subtotal_tax?: string;
  total: string;
  total_tax?: string;
  sku?: string;
  price?: number;
  meta_data?: OrderMetaData[];
}

export interface OrderTaxLine {
  id?: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
}

export interface OrderShippingLine {
  id?: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax?: string;
}

export interface OrderFeeLine {
  id?: number;
  name: string;
  tax_class?: string;
  tax_status?: string;
  total: string;
  total_tax?: string;
}

export interface OrderCouponLine {
  id?: number;
  code: string;
  discount: string;
  discount_tax?: string;
}

export interface Order {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  status: string;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: OrderAddress;
  shipping: OrderAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string | null;
  date_paid_gmt: string | null;
  date_completed: string | null;
  date_completed_gmt: string | null;
  cart_hash: string;
  created_via: string;
  line_items: OrderLineItem[];
  tax_lines: OrderTaxLine[];
  shipping_lines: OrderShippingLine[];
  fee_lines: OrderFeeLine[];
  coupon_lines: OrderCouponLine[];
  meta_data: OrderMetaData[];
}
