const { main } = require("../src/functions/create/handler");
const { myDataSource } = require("../src/config/app-data-source");
const { APIGatewayRequest } = require("./testUtils/generateLambdaEvent")

const title = `test_${(Math.random() + 1).toString(36).substring(7)}`
const author = "test_autor_default"

afterAll(() => {
    myDataSource.destroy()   
})

describe('create book integration test', () => {

    test('it should take a body and response status code 200 and the object inserted into database', async () => { 
        const event = APIGatewayRequest({
            body: [{
                author: author,
                title: title
            }],
            httpMethod: "POST",
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
            expect(book).toHaveProperty("title", title)
            expect(book).toHaveProperty("author", author)
            expect(book).toHaveProperty("createdAt")
            expect(book).toHaveProperty("updatedAt")
        });
    })

    test('it should take a broken body and response status code 400', async () => { 
        const event = APIGatewayRequest({
            body: [{
                brokenBody: author
            }],
            httpMethod: "POST",
            path: '/books',
            queryStringParameters: null,
            pathParameters: null
        })
        const res = await main(event)
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(400)
    })
})

