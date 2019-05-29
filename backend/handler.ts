import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  console.log("Andrew sample log output")
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'AO Callback success!',
      input: event,
    }, null, 2),
  };
}
