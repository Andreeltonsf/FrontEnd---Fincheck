import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
	const { register, errors, handleSubmit } = useRegisterController();

	return (
		<div>
			<header className="flex flex-col items-center gap-4">
				<h1 className="text-2xl font-bold text-gray-900 tracking-[-0.5px]">
					Crie sua conta
				</h1>
				<p className="space-x-2">
					<span className="text-gray-700 tracking-[-0.5px]">
						Já possui uma conta?
					</span>
					<Link
						to="/login"
						className="tracking-[-0.5px] font-medium text-teal-900"
					>
						Fazer Login
					</Link>
				</p>
			</header>

			<form className="flex flex-col mt-[60px] gap-4" onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="Nome"
					{...register("name")}
					error={errors.name?.message}
				/>
				<Input
					type="email"
					placeholder="Email"
					{...register("email")}
					error={errors.email?.message}
				/>
				<Input
					type="password"
					placeholder="Senha"
					{...register("password")}
					error={errors.password?.message}
				/>

				<Button>Criar a conta</Button>
			</form>
		</div>
	);
}
