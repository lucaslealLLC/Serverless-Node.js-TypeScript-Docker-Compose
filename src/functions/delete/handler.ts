import "reflect-metadata"
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway'
import { middyfy } from '../../libs/lambda';

import schema from './schema';
import { deleteRegister } from "src/infra/books-repository";

const deleteData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const bookDeleted = await deleteRegister(event.body.id)
    if (bookDeleted instanceof Error) {
      return formatJSONResponse(
        bookDeleted,
        400
      );
    }
    if (bookDeleted.length) {
      return formatJSONResponse(
        null,
        204
      );
    }
    return formatJSONResponse(
      bookDeleted,
      404
    );
  } catch (error) {
    console.log(error)
    return error
  }
};

export const main = middyfy(deleteData);
