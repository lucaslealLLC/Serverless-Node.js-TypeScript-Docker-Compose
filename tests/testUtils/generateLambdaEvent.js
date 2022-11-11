const APIGatewayRequest = ({
    body,
    httpMethod,
    path = '',
    queryStringParameters,
    pathParameters
})  => {
    return {
        body: body,
        headers: {},
        multiValueHeaders: {},
        httpMethod: httpMethod,
        isBase64Encoded: false,
        path,
        pathParameters: pathParameters || null,
        queryStringParameters: queryStringParameters || null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        requestContext: {
            accountId: '',
            apiId: '',
            authorizer: null,
            httpMethod: httpMethod,
            identity: {
                accessKey: '',
                accountId: '',
                apiKey: '',
                apiKeyId: '',
                caller: '',
                cognitoAuthenticationProvider: '',
                cognitoAuthenticationType: '',
                cognitoIdentityId: '',
                cognitoIdentityPoolId: '',
                principalOrgId: '',
                sourceIp: '',
                user: '',
                userAgent: '',
                userArn: '',
                clientCert: null,
            },
            path: path,
            protocol: '',
            stage: '',
            requestId: '',
            requestTimeEpoch: 3,
            resourceId: '',
            resourcePath: '',
        },
        resource: '',
    };
};

module.exports = { APIGatewayRequest }