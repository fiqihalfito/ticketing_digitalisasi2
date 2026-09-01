import { sql } from "drizzle-orm";
import { db } from "../connect";

async function truncateAll() {
    const result = await db.execute(
        sql.raw(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public';
    `)
    );

    const tables = result.map(
        (row: any) => row.tablename
    ) as string[];

    if (tables.length === 0) {
        console.log("No tables found.");
        return;
    }

    const tableList = tables.map((t) => `"${t}"`).join(", ");

    console.log("Truncating Tables...");
    await db.execute(
        sql.raw(`TRUNCATE TABLE ${tableList} RESTART IDENTITY CASCADE;`)
    );

    console.log(`✅ Truncated ${tables.length} tables:`, tables.join(", "));
}

truncateAll()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("❌ Truncate failed:", err);
        process.exit(1);
    });