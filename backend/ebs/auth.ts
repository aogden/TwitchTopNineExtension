import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config();

export interface TwitchJWTSchema {
	channel_id: string,
	exp: number,
	is_unlinked: boolean,
	opaque_user_id: string, //Values beginning with "U" are stable references to a Twitch account across sessions and channels. You can use them to provide persistent services to users.
	pubsub_perms: {
		listen : string[],
		send: string[]
	},
	role: string,
	user_id: string
}

export async function validateToken(token:string) : Promise<TwitchJWTSchema> {
	const secret = new Buffer(process.env.EXTENSION_SECRET, 'base64');
	let decodedToken;
	console.log(`attempting to validate token ${token} with secret ${secret}`)
	try {
		const dumbDecode = jwt.decode(token);
		console.log(`Dumb decode returns `, dumbDecode);
		decodedToken = jwt.verify(token, secret)
	} catch (error) {
		console.error(error);
		throw new Error(`Invalid token ${token}`);
	}

	console.log(`decoded token is ${decodedToken}`);

	return decodedToken;
}