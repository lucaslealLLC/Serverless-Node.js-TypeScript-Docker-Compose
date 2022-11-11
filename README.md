# Docker Compose & Serverless - AWS Node.js Typescript

Regarding Serverless Framework,this project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions about Serverless, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

For testing purposes this project uses Docker-Compose to generate a local environment with two MySql database and Serverless Offline Plugin.

This is completely schematic, feel free to configure the local environment with the configurations you desire.

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime. Docker is required in your machine too.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy --stage prod` to deploy this stack to AWS as production
- Run `npx sls deploy --stage dev` to deploy this stack to AWS as development

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy --stage prod` to deploy this stack to AWS as production
- Run `yarn sls deploy --stage dev` to deploy this stack to AWS as developmentS

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/someFunction` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/someFunction/schema.ts` JSON-Schema definition: it must contain the specified properties.

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

> :note: In local environment two databases are generated, one is only for tests `basiDataBase_dev` and other `basiDataBase` to run requests sent locally.

### Locally

In order to test the functions locally, run the following command:

- `docker-compose up`

If you wish to set automatic integration tests with Jest, just uncomment line 35 `npm test` in `docker-compose.yml` and configure the tests in `tests` folder. All the tests will be using `basiDataBase_dev`.

In order to clear up the clear uo the local environment, run the following command:

- `docker-compose down`

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/some/path' \
--header 'Content-Type: application/json' \
--data-raw '{
    "someProperty": "someData"
}'
```