import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export function DashBoard() {
	const { signout } = useAuth();
	return (
		<div>
			<h1>Dashboard</h1>
			<Button onClick={signout}>Logout</Button>
		</div>
	);
}
