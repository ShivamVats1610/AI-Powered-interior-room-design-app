import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_UxuceOkYGI67@ep-shiny-moon-a182trkt-pooler.ap-southeast-1.aws.neon.tech/Ai-room-redesign?sslmode=require&channel_binding=require',
  },
});
