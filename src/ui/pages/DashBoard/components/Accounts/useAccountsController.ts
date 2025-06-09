import { useState } from "react";
import { useWindowWidht } from "../../../../../app/hooks/useWindowWidht";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function useAccountsController() {
	const windowWidth = useWindowWidht();

	const { areValuesVisible, toggleValuesVisibility } = useDashboard();
	const [sliderState, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	});

	return {
		sliderState,
		setSliderState,
		windowWidth,
		toggleValuesVisibility,
		areValuesVisible,
    isLoading: true, 
	};
}
