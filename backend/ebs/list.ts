import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk'
import 'source-map-support/register';
// import { uuid } from 'uuid'

const dynamoDb = new DynamoDB.DocumentClient();


export const getItems: APIGatewayProxyHandler = async (event, _context) => {
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Key: { id: event.pathParameters.id }
	}
	try {
		const dbResult = await dynamoDb.get(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify(dbResult.Item)
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: error.statusCode || 501,
			headers: {'Content-Type': 'text/plain'},
			body: `Failed to fetch list id ${event.pathParameters.id}`
		}
	}
}


export const setItems: APIGatewayProxyHandler = async (event, _context) => {
	const timestamp = new Date().getTime();
	console.log(`event body is `, event.body)
	const data = JSON.parse(event.body);
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Item: { 
			id: event.pathParameters.id,
			list: data.list,
			createdAt: timestamp,
			updatedAt: timestamp
		}
	}
	try {
		await dynamoDb.put(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify(params.Item)
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: error.statusCode || 501,
			headers: {'Content-Type': 'text/plain'},
			body: `Failed to create list id ${params.Item.id}`
		}
	}
}
