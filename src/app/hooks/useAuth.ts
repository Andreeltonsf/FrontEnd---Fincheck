import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContex";

export function useAuth() {
	return useContext(AuthContext);
}
