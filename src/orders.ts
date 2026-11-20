import { readFile } from 'node:fs/promises';

export interface Order {
  id: string;
  customer: string;
  item: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
}

export async function loadOrders(): Promise<Order[]> {
  const path = new URL('./orders.json', import.meta.url);
  const raw = await readFile(path, 'utf-8');
  return JSON.parse(raw) as Order[];
}

export function formatOrder(order: Order): string {
  return `#${order.id} | ${order.customer} | ${order.item} | ${order.status} | $${order.total}`;
}
