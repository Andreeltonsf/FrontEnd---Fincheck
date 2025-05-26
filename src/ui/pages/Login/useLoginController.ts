import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { authService } from "../../../app/services/AuthService";
import type { SigninParams } from "../../../app/services/AuthService/signin";

const schema = z.object({
	email: z
		.string()
		.email("Informe um email válido")
		.nonempty("Email éobrigatório"),
	password: z
		.string()
		.min(8, "A senha deve conter no mínimo 8 caracteres")
		.nonempty("Senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
	const {
		handleSubmit: hookFormHandleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isLoading } = useMutation({
		mutationKey: ["signup"],

		mutationFn: async (data: SigninParams) => {
			return authService.signin(data);
		},
	});

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			await mutateAsync(data);
		} catch {
			toast.error("Credenciais inválidas");
		}
	});

	return { handleSubmit, register, errors, isLoading };
}
