import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PageLoader } from "../../ui/components/PageLoader";
import { LocalStorageKeys } from "../config/localStorageKeys";
import { usersService } from "../services/usersService";

interface AuthContextValue {
	signedIn: boolean;
	signin(accessToken: string): void;
	signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storedAccessToken = localStorage.getItem(
			LocalStorageKeys.ACCESS_TOKEN,
		);

		return !!storedAccessToken;
	});

	const { isError, data, isFetching, isSuccess, remove } = useQuery({
		queryKey: ["LoggedUser"],
		queryFn: () => usersService.me(),
		retry: 1,
		enabled: signedIn,
	});

	const signin = useCallback((accessToken: string) => {
		localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);

		setSignedIn(true);
	}, []);

	const signout = useCallback(() => {
		localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
		remove();
		setSignedIn(false);
	}, [remove]);

	useEffect(() => {
		if (isError) {
			toast.error("Sua sessão expirou. Por favor, faça login novamente.");
			signout();
		}
	}, [isError, signout]);

	if (isFetching) {
		return <PageLoader />;
	}

	return (
		<AuthContext.Provider
			value={{ signedIn: isSuccess && signedIn, signin, signout }}
		>
			{children}
		</AuthContext.Provider>
	);
}
