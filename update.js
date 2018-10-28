import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "fileStorage",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            fileId: event.pathParameters.id
        },
        UpdateExpression: "SET description = :description, attachment = :attachment, lastEdited = :lastEdited",
        ExpressionAttributeValues: {
            ":attachment": data.attachment ? data.attachment : null,
            ":description": data.description ? data.description : null,
            ":lastEdited": Date.now()
        },
        ReturnValues: "ALL_NEW"
    };
    try {
        const result = await dynamoDbLib.call("update", params);
        callback(null, success({ status: true }));
    } catch (e) {
        callback(null, failure({ status: false }));
    }
}