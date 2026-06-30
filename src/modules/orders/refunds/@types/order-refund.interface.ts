import {
  OrderLineItem,
  OrderMetaData,
} from '../../order/@types/order.interface';

export interface OrderRefund {
  id: number;
  date_created: string;
  date_created_gmt: string;
  amount: string;
  reason: string;
  refunded_by: number;
  refunded_payment: boolean;
  meta_data: OrderMetaData[];
  line_items: OrderLineItem[];
}
