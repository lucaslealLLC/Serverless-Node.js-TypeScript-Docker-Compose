import "reflect-metadata"
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway'
import { middyfy } from '../../libs/lambda';

import schema from './schema';
import { createRegister } from '../../infra/books-repository'
import { Books } from "../../infra/entities/books";

const createData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const bookCreated = await createRegister(event.body as Books[])
    if (bookCreated instanceof Error) {
      return formatJSONResponse(
        bookCreated,
        400
      );
    }
    return formatJSONResponse(
      bookCreated,
      200
    );
  } catch (error) {
    console.log(error)
    return error
  }
};

export const main = middyfy(createData);
