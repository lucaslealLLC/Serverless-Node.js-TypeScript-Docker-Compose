const { main } = require("../src/functions/update/handler");
const { myDataSource } = require("../src/config/app-data-source");
const { APIGatewayRequest } = require("./testUtils/generateLambdaEvent")

const title = `test_${(Math.random() + 1).toString(36).substring(7)}`
const author = `test_${(Math.random() + 1).toString(36).substring(7)}`

afterAll(() => {
    myDataSource.destroy()
})

describe('update book integration test', () => {

    test('it should take a body and response status code 200 and the object updated and returned from database', async () => { 
        const event = APIGatewayRequest({
            body: {
                id: 10,
                title: title,
                author: author
            },
            httpMethod: "PUT",
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
    
    test('it should take a nonexisting id and response status code 404', async () => { 
        const event = APIGatewayRequest({
            body: {
                id: 1000000,
                title: title
            },
            httpMethod: "PUT",
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
                brokenBody: "foo data"
            },
            httpMethod: "PUT",
            path: '/books',
            queryStringParameters: null,
            pathParameters: null
        })
        const res = await main(event)
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(400)
    })
})

