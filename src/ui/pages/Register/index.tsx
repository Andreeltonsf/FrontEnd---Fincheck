import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function Register() {
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

			<form className="flex flex-col mt-[60px] gap-4">
				<Input type="text" placeholder="Nome" name="name" />
				<Input type="email" placeholder="Email" name="email" />
				<Input type="password" placeholder="Senha" name="password" />

				<Button>Criar a conta</Button>
			</form>
		</div>
	);
}
