import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface AccountSliderNavProps {
	isBeginning: boolean;
	isEnd: boolean;
}

export function AccountSliderNav({
	isBeginning,
	isEnd,
}: AccountSliderNavProps) {
	const swiper = useSwiper();
	return (
		<div>
			<button
				type="button"
				className=" py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 disabled:opacity-40 "
				onClick={() => swiper.slidePrev()}
				disabled={isBeginning}
			>
				<ChevronLeftIcon className="text-white w-6 h-6" />
			</button>

			<button
				type="button"
				className=" py-3 pl-2.5 pr-3.5 rounded-full hover:bg-black/10"
				onClick={() => swiper.slideNext()}
				disabled={isEnd}
			>
				<ChevronRightIcon className="text-white w-6 h-6" />
			</button>
		</div>
	);
}
