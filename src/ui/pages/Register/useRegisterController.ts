import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/AuthService";
import type { SignupParams } from "../../../app/services/AuthService/signup";

const schema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	email: z
		.string()
		.email("Informe um email válido")
		.nonempty("E-mail é obrigatório"),
	password: z
		.string()
		.min(8, "A senha deve conter no mínimo 8 caracteres")
		.nonempty("Senha é obrigatória"),
});

type RegisterFormData = z.infer<typeof schema>;

export function useRegisterController() {
	const {
		handleSubmit: hookFormSubmit,
		register,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationKey: ["signup"],

		mutationFn: async (data: SignupParams) => {
			await authService.signup(data);
		},
	});

	const handleSubmit = hookFormSubmit(async (data) => {
		await authService.signup(data);
	});
	return { register, errors, handleSubmit };
}
