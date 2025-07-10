import type { Categories } from "../../entities/Categories";
import { httpClient } from "../HttpClient";

type CategoriesResponse = Array<Categories>;

export async function getAllCategories() {
	const { data } = await httpClient.get<CategoriesResponse>("/categories");
	return data;
}
