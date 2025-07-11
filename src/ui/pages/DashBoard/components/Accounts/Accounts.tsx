import { PlusIcon } from "@radix-ui/react-icons";
import "swiper/css/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { Spinner } from "../../../../components/Spinner";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountSliderNav } from "./AccountSliderNav";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
	const {
		sliderState,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValuesVisibility,
		isLoading,
		accounts,
		openNewAccountModal,
		currentBalance,
	} = useAccountsController();

	return (
		<div className="bg-[#087F5B] rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
			{isLoading && (
				<div className="w-full h-full flex items-center justify-center">
					<Spinner className="text-teal-950/50 fill-white" />
				</div>
			)}
			{!isLoading && (
				<>
					<div>
						<span className="tracking-[-0.5px] text-white">Saldo Total</span>
						<div className="flex items-center gap-2">
							<strong
								className={cn(
									"text-white tracking-[-1px] text-2xl",
									!areValuesVisible && "blur-md",
								)}
							>
								{formatCurrency(currentBalance)}
							</strong>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="w-8 h-8 flex items-center justify-center"
								onClick={toggleValuesVisibility}
							>
								<EyeIcon open={!areValuesVisible} />
							</button>
						</div>
					</div>

					<div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
						{accounts.length === 0 && (
							<div className="mb-4 flex flex-col" slot="container-start">
								<strong className="text-white tracking-[-1px] text-lg font-bold">
									Minhas contas
								</strong>
								<button
									type="button"
									className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white"
									onClick={openNewAccountModal}
								>
									<div className="w-11 h-11 rounded-full border-2 border-teal-600 flex  items-center justify-center border-dashed">
										<PlusIcon className="w-6 h-6" />
									</div>
									<span className="font-medium tracking-[-0.5px] block w-32 text-center">
										Cadastre uma nova conta
									</span>
								</button>
							</div>
						)}
						{accounts.length > 0 && (
							<div>
								<Swiper
									spaceBetween={16}
									slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
									onSlideChange={(swiper) => {
										setSliderState({
											isBeginning: swiper.isBeginning,
											isEnd: swiper.isEnd,
										});
									}}
								>
									<div
										className="flex items-center justify-between mb-4"
										slot="container-start"
									>
										<strong className="text-white tracking-[-0.5px] text-lg font-bold">
											Minhas contas
										</strong>

										<AccountSliderNav
											isBeginning={sliderState.isBeginning}
											isEnd={sliderState.isEnd}
										/>
									</div>

									{accounts.map((account) => (
										<SwiperSlide key={account.id}>
											<AccountCard data={account} />
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
