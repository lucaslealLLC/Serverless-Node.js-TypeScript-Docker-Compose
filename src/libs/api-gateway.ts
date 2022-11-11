import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";
import { Books } from "src/infra/entities/books";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export interface ApiGatewayResponse {
  statusCode: number,
  body: string
}

export const formatJSONResponse = (response: Books[] | Error, statusCode: number) : ApiGatewayResponse => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(response)
  }
}
