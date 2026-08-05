// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dbCredentials: {
        url: Bun.env.DATABASE_URL!,
    },
    dialect: "postgresql",
    schema: "./src/database/schema.ts",
    
});
