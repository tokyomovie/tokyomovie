import { getConnection } from "../database/db.ts";
import * as migrate from "../database/migrate.ts";

using connection = getConnection();
await migrate.runMigrationsIfNecessary(connection.db);
