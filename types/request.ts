import { User } from "../database/query/user.ts";

export interface RequestState {
  user: User | null;
}

export interface Session {
  userId: number;
}
