import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sql';
import { SQL } from "bun"
import { relations } from './relations';

const client = new SQL({
    url: Bun.env.DATABASE_URL!,
    max: 20, // settingan di source code ini lebih kecil dari max_connection di postgres engine. max_connection di postgres engine adalah 100
    idleTimeout: 30 // (detik) harus di-set agar connection tidak terus bertambah, ini bukan param default
});

export const db = drizzle({
    client: client,
    relations: relations,

    // logger: true
});