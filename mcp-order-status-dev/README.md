# mcp-order-status-dev

## التشغيل
npm install
npm run inspect        # اختبار عبر المتصفح

## الربط مع Claude Code
claude mcp add order-status -- npx tsx "$(pwd)/src/index.ts"

## الربط مع Claude Desktop (claude_desktop_config.json)
{
  "mcpServers": {
    "order-status": {
      "command": "npx",
      "args": ["tsx", "/المسار/الكامل/src/index.ts"]
    }
  }
}
