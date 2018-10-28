import * as dynamoDbLib from "./utils/dynamodb-lib";
import { success, failure } from "./utils/response-lib";

export async function main(event, context, callback) {
    const params = {
        TableName: "fileStorage",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };
    try {
        const result = await dynamoDbLib.call("query", params);
        callback(null, success(result.Items));
    } catch (e) {
        callback(null, failure({ status: false }));
    }
}