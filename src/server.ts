import app from './app.js';
import { portConfig } from './config/portConfig.js';

const PORT = portConfig.port;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
