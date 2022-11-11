import 'reflect-metadata';
import { DataSource } from "typeorm"
import { Books } from 'src/infra/entities/books';

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [
        Books
    ],
    logging: true,
    synchronize: true,
})

export const connectDatabase = async () => {
    try {
        await myDataSource.initialize()
        console.log("Connected to database...")
    } catch (err) {
        console.error("Error during database connection", err)
    }
}
