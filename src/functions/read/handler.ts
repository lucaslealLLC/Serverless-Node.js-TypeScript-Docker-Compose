import "reflect-metadata"
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway'
import { middyfy } from '../../libs/lambda';

import schema from './schema';
import { readRegister } from "src/infra/books-repository";
import { Books } from "src/infra/entities/books";
import { FindOptionsWhere } from "typeorm";

const readData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const bookRetrieved = await readRegister(event.queryStringParameters as FindOptionsWhere<Books>)
    if (bookRetrieved instanceof Error) {
      return formatJSONResponse(
        bookRetrieved,
        400
      );
    }
    if (bookRetrieved.length) {
      return formatJSONResponse(
        bookRetrieved,
        200
      );
    }
    return formatJSONResponse(
      bookRetrieved,
      404
    );
  } catch (error) {
    console.log(error)
    return error
  }
};

export const main = middyfy(readData);
