import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import emptyStateImage from "../../../../../assets/emptyStateImage.svg";
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { useTransactionsController } from "./useTransactrionsController";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";

export function Transactions() {
	const { areValuesVisible, isInitialLoading, transactions, isLoading } =
		useTransactionsController();

	const hasTransactions = transactions.length > 0;
	return (
		<div className="bg-[#F1F3F5] rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
			{isInitialLoading && (
				<div className="w-full h-full flex items-center justify-center">
					<Spinner />
				</div>
			)}
			{!isInitialLoading && (
				<>
					<header className="">
						<div className="flex items-center justify-between">
							<TransactionTypeDropdown />

							<button type="button" className="flex items-center gap-2">
								<FilterIcon />
							</button>
						</div>

						<div className="mt-6">
							<Swiper slidesPerView={3} centeredSlides>
								<SliderNavigation />

								{MONTHS.map((month, index) => (
									<SwiperSlide key={month}>
										{({ isActive }) => (
											<SliderOption
												month={month}
												isActive={isActive}
												index={index}
											/>
										)}
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</header>

					<div className=" mt-4 space-y-2 flex-1 overflow-y-auto">
						{isLoading && (
							<div className="flex flex-col items-center justify-center gap-4 h-full">
								<Spinner />
							</div>
						)}

						{!hasTransactions && !isLoading && (
							<div className="flex flex-col items-center justify-center gap-4 h-full">
								<>
									<img src={emptyStateImage} alt="Não há transações" />
									<p className="text-gray-700">
										Não encontramos nenhuma transação
									</p>
								</>
							</div>
						)}

						{hasTransactions && !isLoading && (
							<div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
								<div className="flex-1 flex items-center gap-3">
									<CategoryIcon type="expense" />

									<div>
										<strong className="font-bold tracking-[-0.5px] block">
											Almoço
										</strong>
										<span className="text-gray-600 text-sm">12/06/2022</span>
									</div>
								</div>

								<span
									className={cn(
										"text-red-800 tracking-[0.5px] font-medium",
										!areValuesVisible && "blur-sm",
									)}
								>
									{formatCurrency(100)}
								</span>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
