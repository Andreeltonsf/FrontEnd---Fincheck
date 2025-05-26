import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { httpClient } from "../../../app/services/HttpClient";

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

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		await httpClient.post("/auth/signin", {
			email: data.email,
			password: data.password,
		});
	});

	return { handleSubmit, register, errors };
}
