import { httpClient } from "../HttpClient";

import type { User } from "../../entities/me";

type MeResponse = User

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}
