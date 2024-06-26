import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { RefreshToken } from "./entity/RefreshToken";
import { Folder } from "./entity/Folder";
import './config/dotenv-setting';
import { Word } from "./entity/word";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, RefreshToken, Folder, Word],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
})
