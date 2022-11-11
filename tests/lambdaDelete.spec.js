const { main } = require("../src/functions/delete/handler");
const { myDataSource } = require("../src/config/app-data-source");
const { APIGatewayRequest } = require("./testUtils/generateLambdaEvent")

afterAll(() => {
    myDataSource.destroy()
})

describe('delete book integration test', () => {

    test('it should take body with valid id, response status code 200', async () => { 
        const event = APIGatewayRequest({
            body: {
                id: 18
            },
            httpMethod: "DELETE",
            path: '/books',
            queryStringParameters: null,
            pathParameters: null
        })
        const res = await main(event)
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(204)
    })
    
    test('it should take a nonexisting id and response status code 404', async () => { 
        const event = APIGatewayRequest({
            body: {
                id: 1000000
            },
            httpMethod: "DELETE",
            path: '/books',
            queryStringParameters: null,
            pathParameters: null
        })
        const res = await main(event)
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(404)
    })

    test('it should take a broken body and response status code 400', async () => { 
        const event = APIGatewayRequest({
            body: {
                i3d: "broken data"
            },
            httpMethod: "DELETE",
            path: '/books',
            queryStringParameters: null,
            pathParameters: null
        })
        const res = await main(event)
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(400)
    })
})
