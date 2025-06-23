import logo from "../../../assets/logo.svg";
import { Modal } from "../../components/Modal";
import { UserMenu } from "../../components/UserMenu";
import { Accounts } from "./components/Accounts/Accounts";
import { DashboardContextProvider } from "./components/DashBoardContext";
import { Fab } from "./components/Fab";
import { Transactions } from "./components/Transactions/Transactions";

export function DashBoard() {
	return (
		<DashboardContextProvider >
			<div className=" h-full w-full p-4 md:p-8 md:pb-8 md:pt-6 flex flex-col gap-4">
				<header className="h-12 flex items-center justify-between">
					<img src={logo} alt="logo" className="h-6" />
					<UserMenu />
				</header>
				<main className=" flex-1 flex flex-col md:flex-row gap-4 max-h-full">
					<div className=" w-full md:w-1/2">
						<Accounts />
					</div>

					<div className=" w-full md:w-1/2">
						<Transactions />
					</div>
				</main>

        <Fab />

        <Modal open={false} title="Modal Tittle" >
          <div className="flex flex-col gap-4">
            <p>This is a modal content.</p>
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </Modal>
			</div>
		</DashboardContextProvider>
	);
}
