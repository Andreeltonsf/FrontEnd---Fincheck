import { sleep } from "../../utils/sleep";
import { httpClient } from "../HttpClient";

export interface SigninParams {
	email: string;
	password: string;
}

type SigninResponse = {
	acessToken: string;
};

export async function signin(params: SigninParams) {
	await sleep();
	const { data } = await httpClient.post<SigninResponse>(
		"/auth/signin",
		params,
	);

	return data;
}
