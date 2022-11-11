const { myDataSource } = require("../src/config/app-data-source");
const { main } = require("../src/functions/read/handler");
const { APIGatewayRequest } = require("./testUtils/generateLambdaEvent")

afterAll(() => {
    myDataSource.destroy()   
})

describe('read book integration test', () => {

    test('it should take a queryStringParameters and response status code 200 and the object(s) read from database', async () => { 
        const event = APIGatewayRequest({
            body: '',
            httpMethod: "GET",
            path: '/books',
            queryStringParameters: null,
            pathParameters: null
        })
        const res = await main(event)
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(200)
        
        const books = JSON.parse(res.body)

        books.forEach(book => {
            expect(book).toHaveProperty("id")
            expect(book).toHaveProperty("title")
            expect(book).toHaveProperty("author")
            expect(book).toHaveProperty("createdAt")
            expect(book).toHaveProperty("updatedAt")
        });
    })
    
    test('it should take nonexistentg data and response status code 404', async () => { 
        const event = APIGatewayRequest({
            body: '',
            httpMethod: "GET",
            path: '/books',
            queryStringParameters: {
                author: "nonexisting author"
            },
            pathParameters: null
        })
        const res = await main(event)
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(404)
    })

    test('it should take broken query string parameter and response status code 400', async () => {
        const event = APIGatewayRequest({
            body: '',
            httpMethod: "GET",
            path: '/books',
            queryStringParameters: {
                brokenQueryStringParameter: "non existing author"
            },
            pathParameters: null
        })
        const res = await main(event)
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(400)
    })
})
