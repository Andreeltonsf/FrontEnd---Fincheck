import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { formatDate } from "../../../../../app/utils/formatDate";
import emptyStateImage from "../../../../../assets/emptyStateImage.svg";
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { FiltersModal } from "./FiltersModal";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { useTransactionsController } from "./useTransactrionsController";

export function Transactions() {
	const {
		areValuesVisible,
		isInitialLoading,
		transactions,
		isLoading,
		handleCloseFiltersModal,
		isFiltersModalOpen,
		handleOpenFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters
	} = useTransactionsController();

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
					<FiltersModal
						open={isFiltersModalOpen}
						onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
					/>
					<header className="">
						<div className="flex items-center justify-between">
							<TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

							<button
								type="button"
								className="flex items-center gap-2"
								onClick={handleOpenFiltersModal}
							>
								<FilterIcon />
							</button>
						</div>

						<div className="mt-6">
							<Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {

                  handleChangeFilters('month')(swiper.realIndex);

                }} className="swiper-container">
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

						{hasTransactions &&
							!isLoading &&
							transactions.map((transaction) => (
								<div
									key={transaction.id}
									className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
								>
									<div className="flex-1 flex items-center gap-3">
										<CategoryIcon
											type={
												transaction.type === "INCOME" ? "income" : "expense"
											}
											category={transaction.category?.icon}
										/>

										<div>
											<strong className="font-bold tracking-[-0.5px] block">
												{transaction.name}
											</strong>
											<span className="text-gray-600 text-sm">
												{formatDate(new Date(transaction.date))}
											</span>
										</div>
									</div>

									<span
										className={cn(
											"tracking-[0.5px] font-medium",
                      transaction.type === "EXPENSE" ? "text-red-800" : "text-green-800",
											!areValuesVisible && "blur-sm",
										)}
									>
                    {transaction.type === "EXPENSE" ? "-" : "+"}
										{formatCurrency(transaction.value)}
									</span>
								</div>
							))}
					</div>
				</>
			)}
		</div>
	);
}
