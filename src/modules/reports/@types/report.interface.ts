export interface ReportLink {
  slug: string;
  description: string;
}

export interface SalesReport {
  total_sales: string;
  net_sales: string;
  average_sales: string;
  total_orders: number;
  total_items: number;
  total_tax: string;
  total_shipping: string;
  total_refunds: number;
  total_discount: string;
  totals_grouped_by: string;
  totals: Record<string, unknown>;
  total_customers: number;
}

export interface TopSellerReport {
  title: string;
  product_id: number;
  quantity: number;
}

export interface ReportTotal {
  slug: string;
  name: string;
  total: number;
}
