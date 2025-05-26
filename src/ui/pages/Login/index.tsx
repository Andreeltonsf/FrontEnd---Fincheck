import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useLoginController } from "./useLoginController";

export function Login() {
	const { handleSubmit, register, errors } = useLoginController();
	return (
		<div>
			<header className="flex flex-col items-center gap-4">
				<h1 className="text-2xl font-bold text-gray-900 tracking-[-0.5px]">
					Entre em sua conta
				</h1>
				<p className="space-x-2">
					<span className="text-gray-700 tracking-[-0.5px]">
						Novo por aqui?
					</span>
					<Link
						to="/register"
						className="tracking-[-0.5px] font-medium text-teal-900"
					>
						Crie uma conta
					</Link>
				</p>
			</header>

			<form className="flex flex-col mt-[60px] gap-4" onSubmit={handleSubmit}>
				<Input
					type="email"
					placeholder="Email"
					className=""
					error={errors.email?.message}
					{...register("email")}
				/>

				<Input
					type="password"
					placeholder="Senha"
					className=""
					error={errors.password?.message}
					{...register("password")}
				/>

				<Button>Entrar</Button>
			</form>
		</div>
	);
}
