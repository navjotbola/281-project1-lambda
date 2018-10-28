import * as dynamoDbLib from "./utils/dynamodb-lib";
import { success, failure } from "./utils/response-lib";

export async function main(event, context, callback) {
    const params = {
        TableName: "fileStorage",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            fileId: event.pathParameters.id
        }
    };
    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            callback(null, success(result.Item));
        } else {
            callback(null, failure({ status: false, error: "Item not found."}));
        }
    } catch (e) {
        console.log(e);
        callback(null, failure({ status: false }));
    }
}