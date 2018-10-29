import * as dynamoDbLib from "./utils/dynamodb-lib";
import { success, failure } from "./utils/response-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: data.userId,
            fileId: event.pathParameters.id
        }
    };
    try {
        const result = await dynamoDbLib.call("delete", params);
        callback(null, success({ status: true }));
    } catch (e) {
        callback(null, failure({ status: false }));
    }
}