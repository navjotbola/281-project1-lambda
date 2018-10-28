import uuid from "uuid";
import * as dynamoDbLib from "./utils/dynamodb-lib";
import { success, failure } from "./utils/response-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const creationDate = Date.now();
    const params = {
        TableName: "fileStorage",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            fileId: uuid.v1(),
            firstname: data.firstname,
            lastname: data.lastname,
            description: data.description,
            attachment: data.attachment,
            createdAt: creationDate,
            lastEdited: creationDate,
        }
    };
    try {
        await dynamoDbLib.call("put", params);
        callback(null, success(params.Item));
    } catch (e) {
        console.log(e);
        callback(null, failure({ status: false }));
    }
}