import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function Login() {
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

			<form className="flex flex-col mt-[60px] gap-4">
				<Input type="email" placeholder="Email" className="" name="email" />
				<Input
					type="password"
					placeholder="Senha"
					className=""
					name="password"
				/>

				<Button>Entrar</Button>
			</form>
		</div>
	);
}
