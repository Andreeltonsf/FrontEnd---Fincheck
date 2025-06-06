import { Spinner } from "./Spinner";

export function PageLoader() {
	return (
		<div className="bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center">
			<Spinner />
		</div>
	);
}
