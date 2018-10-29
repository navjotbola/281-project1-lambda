import * as dynamoDbLib from "./utils/dynamodb-lib";
import { success, failure } from "./utils/response-lib";

export async function main(event, context, callback) {
    const params = {
        TableName: process.env.tableName,
        // ExclusiveStartKey: "userId = :userId",
    };
    try {
        const result = await dynamoDbLib.call("scan", params);
        callback(null, success(result));
    } catch (e) {
        callback(null, failure({ status: false }));
    }
}