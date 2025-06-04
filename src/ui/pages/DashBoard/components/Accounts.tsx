import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountSliderNav } from "./AccountSliderNav";

export function Accounts() {
	return (
		<div className="bg-[#087F5B] rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
			<div>
				<span className="tracking-[-0.5px] text-white">Saldo Total</span>
				<div className="flex items-center gap-2">
					<strong className="text-2xl tracking-[-1px] text-white block">
						R$ 100.000,00
					</strong>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button className="w-8 h-8 flex items-center justify-center">
						<EyeIcon open />
					</button>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-end">
				<div>
					<Swiper spaceBetween={16} slidesPerView={2.1}>
						<div
							className="flex items-center justify-between mb-4"
							slot="container-start"
						>
							<strong className="text-white tracking-[-0.5px] text-lg font-bold">
								Minhas contas
							</strong>

							<AccountSliderNav />
						</div>

						<SwiperSlide>
							<AccountCard
								color="#7950F2"
								name="Saldo Atual"
								balance={100}
								type="CASH"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<AccountCard
								color="#7950F2"
								name="Saldo Atual"
								balance={100}
								type="INVESTMENT"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<AccountCard
								color="#7950F2"
								name="Saldo Atual"
								balance={100}
								type="CHECKING"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
}
