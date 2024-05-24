import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import { Stage, env } from "../../../../utils/env";

const sqlite = new Database(env.DATABASE_URL);
const db = drizzle(sqlite, { logger: env.NODE_ENV === Stage.DEVELOPMENT });

export { db };

// const data = [
//   {
//     name: "John Doe",
//     city: "New York",
//     country: "USA",
//     favoriteSport: "Basketball",
//   },
//   {
//     name: "Jane Smith",
//     city: "London",
//     country: "UK",
//     favoriteSport: "Football",
//   },
//   {
//     name: "Mike Johnson",
//     city: "Paris",
//     country: "France",
//     favoriteSport: "Tennis",
//   },
//   {
//     name: "Karen Lee",
//     city: "Tokyo",
//     country: "Japan",
//     favoriteSport: "Swimming",
//   },
//   {
//     name: "Tom Brown",
//     city: "Sydney",
//     country: "Australia",
//     favoriteSport: "Running",
//   },
//   {
//     name: "Emma Wilson",
//     city: "Berlin",
//     country: "Germany",
//     favoriteSport: "Basketball",
//   },
// ];

// import { usersTable } from "../../../../../drizzle/schema";

// const opa = async () => {
//   // await db.insert(users).values(data);
//   // await db.delete(usersTable);
// };

// opa();
