import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountSliderNav } from "./AccountSliderNav";
import { useAccountsController } from "./useAccountsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";

export function Accounts() {
	const { sliderState, setSliderState, windowWidth,areValuesVisible,toggleValuesVisibility,isLoading } = useAccountsController();



	return (
		<div className="bg-[#087F5B] rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white"/>
        </div>
      )}
			{!isLoading && (
        <>
         <div>
				<span className="tracking-[-0.5px] text-white">Saldo Total</span>
				<div className="flex items-center gap-2">
					<strong className={cn(
            "text-white tracking-[-1px] text-2xl",!areValuesVisible && "blur-md")}>
						{formatCurrency(100000)}
					</strong>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button className="w-8 h-8 flex items-center justify-center" onClick={toggleValuesVisibility}>
						<EyeIcon open={!areValuesVisible} />
					</button>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
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
        </>
      )}
		</div>
	);
}
