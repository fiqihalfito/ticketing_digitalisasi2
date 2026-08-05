import { table } from "./tables";
import { spreads } from "./utils";

// rule :
// model naming :
// singular + Model => userModel

export const dbModel = {
    insert: spreads({
        userModel: table.usersTable,
        sessionModel: table.sessionsTable,
        accountModel: table.accountsTable,
        verificationModel: table.verificationsTable,

        // other table
        subfieldModel: table.subfieldsTable,
    }, 'insert'),
    select: spreads({
        userModel: table.usersTable,
        sessionModel: table.sessionsTable,
        accountModel: table.accountsTable,
        verificationModel: table.verificationsTable,

        // other table
        subfieldModel: table.subfieldsTable,
    }, 'select')
} as const