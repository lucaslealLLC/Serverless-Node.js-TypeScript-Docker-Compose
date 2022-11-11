import { connectDatabase, myDataSource } from "src/config/app-data-source"
import { FindOptionsWhere } from "typeorm"
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"
import { Books } from "./entities/books"

export const createRegister = async (data: Books[]) : Promise<Books[] | Error> => {
    try {
        if (myDataSource.isInitialized === false) {
            await connectDatabase()
        }
        const bookRepository = myDataSource.getRepository(Books)
        return await bookRepository.save(data)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const readRegister = async (filter: FindOptionsWhere<Books>) : Promise<Books[] | Error> => {
    try {
        if (myDataSource.isInitialized === false) {
            await connectDatabase()
        }
        const bookRepository = myDataSource.getRepository(Books)
        return await bookRepository.find({where: filter, order:{createdAt:'DESC'}})
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateRegister = async (id: number, data: QueryDeepPartialEntity<Books>) : Promise<Books[] | Error> => {
    try {
        if (myDataSource.isInitialized === false) {
            await connectDatabase()
        }
        const bookRepository = myDataSource.getRepository(Books)
        await bookRepository.update({id: id}, data)
        return await readRegister({id: id})
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteRegister = async (id: number) : Promise<Books[] | Error> => {
    try {
        if (typeof id === "undefined") {
            return Error("broken id sent")
        }
        if (myDataSource.isInitialized === false) {
            await connectDatabase()
        }
        const bookRepository = myDataSource.getRepository(Books)
        const bookToDelete = readRegister({id: id})
        await bookRepository.delete({id: id})
        return bookToDelete
    } catch (error) {
        console.log(error)
        return error
    }
}