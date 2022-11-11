import "reflect-metadata"
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway'
import { middyfy } from '../../libs/lambda';

import schema from './schema';
import { updateRegister } from "src/infra/books-repository";
import { Books } from "src/infra/entities/books";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

const updateData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const id: number = event.body.id
    delete event.body.id
    const bookUpdated = await updateRegister(id, event.body as QueryDeepPartialEntity<Books>)
    if (bookUpdated instanceof Error) {
      return formatJSONResponse(
        bookUpdated,
        400
      );
    }
    if (bookUpdated.length) {
      return formatJSONResponse(
        bookUpdated,
        200
      );
    }
    return formatJSONResponse(
      bookUpdated,
      404
    );
  } catch (error) {
    console.log(error)
    return error
  }
};

export const main = middyfy(updateData);
