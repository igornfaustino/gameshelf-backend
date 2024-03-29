import axios, { AxiosError, AxiosPromise } from 'axios';
import Bottleneck from 'bottleneck';
import qs from 'query-string';
import { saveIgdbToken } from '../controllers/app';
import { CLIENT_ID, CLIENT_SECRET } from './env';

const TWITCH_AUTH_URL = 'https://id.twitch.tv/oauth2/token';

type AccessTokenRequest = {
	access_token: string;
};

const limiter = new Bottleneck({
	minTime: 250,
	maxConcurrent: 8,
});

let authTokenRequest: AxiosPromise<AccessTokenRequest> | null;

export const requestAccessToken = () => axios.post(
	TWITCH_AUTH_URL,
	qs.stringify({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'client_credentials',
	}),
	{
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	},
);

function getAuthTokenSingleton() {
	if (!authTokenRequest) {
		authTokenRequest = requestAccessToken();
		authTokenRequest.finally(() => { authTokenRequest = null; });
	}
	return authTokenRequest;
}

const handleRequestError = (error: AxiosError) => {
	const { response } = error;
	if (response && response.status === 401 && response.config) {
		console.log('refresh auth token');
		return getAuthTokenSingleton()
			.then(async (res) => {
				response.config.headers.Authorization = `Bearer ${res.data.access_token}`;
				await saveIgdbToken(res.data.access_token);
				return limiter.schedule(() => axios(response.config));
			})
			.catch(() => {
				throw error;
			});
	}
	throw error;
};

export const igdbTokenMiddleware = (request: Promise<any>) => limiter
	.schedule(() => request)
	.catch(handleRequestError);
