import { db } from '../database/db.ts'
import * as migrate from '../database/migrate.ts'

migrate.runMigrationsIfNecessary(db)
