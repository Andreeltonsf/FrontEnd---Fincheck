import { Outlet } from "react-router-dom";
import Login from "../../assets/Login.png";
import logo from "../../assets/logo.svg";
import logoCinza from "../../assets/logoCinza.svg";

export function AuthLayout() {
	return (
		<div className="flex w-full h-full">
			<div className="w-full h-full flex justify-center items-center flex-col gap-16 lg:w-1/2">
				<img src={logoCinza} alt="Logo" className="h-6 text-gray-500 gap-0" />

				<div className=" w-full max-w-[504px] px-8 ">
					<Outlet />
				</div>
			</div>
			<div className="w-1/2 h-full   justify-center items-center p-8 relative hidden lg:flex">
				<img
					src={Login}
					alt="Login"
					className="object-cover h-full w-full max-w-[656px] max-h-[960px] select-none rounded-[32px] "
				/>
				<div className="max-w-[656px] bottom-8 mx-8 p-10 rounded-b-[32px] absolute bg-white ">
					<img src={logo} alt="logo" className="" />
					<p className="text-gray-700 font-medium text-xl mt-6">
						Gerencie suas finanças pessoais de uma forma simples com o fincheck,
						e o melhor, totalmente de graça!
					</p>
				</div>
			</div>
		</div>
	);
}
