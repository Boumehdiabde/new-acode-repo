import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { formatOrder, loadOrders } from './orders.js';

const server = new McpServer({
  name: 'order-status',
  version: '1.0.0',
});

server.registerTool(
  'get-all-orders',
  { description: 'Returns all orders with their status.' },
  async () => {
    const orders = await loadOrders();
    return {
      content: [
        {
          type: 'text',
          text:
            orders.length > 0
              ? orders.map(formatOrder).join('\n')
              : 'No orders found.',
        },
      ],
    };
  }
);

server.registerTool(
  'get-order-status',
  {
    description: 'Returns the status of a single order by its ID.',
    inputSchema: { id: z.string().describe('The order ID, e.g. 1001') },
  },
  async ({ id }) => {
    const orders = await loadOrders();
    const order = orders.find((o) => o.id === id);
    return {
      content: [
        {
          type: 'text',
          text: order ? formatOrder(order) : `Order ${id} not found.`,
        },
      ],
      isError: !order,
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);
console.error('Order status MCP server is running over stdio.');
