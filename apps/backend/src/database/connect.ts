import { drizzle } from 'drizzle-orm/bun-sql';
import { relations } from './relations';

export const db = drizzle({
    relations: { ...relations },
    connection: {
        url: Bun.env.DATABASE_URL!,
        max: 20,
        idleTimeout: 30,
    }

    // logger: true
});