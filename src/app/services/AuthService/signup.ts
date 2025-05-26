import { sleep } from "../../utils/sleep";
import { httpClient } from "../HttpClient";

export interface SignupParams {
	name: string;
	email: string;
	password: string;
}

type SignupResponse = {
	acessToken: string;
};

export async function signup(params: SignupParams) {
	await sleep();
	const { data } = await httpClient.post<SignupResponse>(
		"/auth/signup",
		params,
	);

	return data;
}
