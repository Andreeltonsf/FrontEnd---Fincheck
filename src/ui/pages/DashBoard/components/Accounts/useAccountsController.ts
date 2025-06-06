import { useState } from "react";
import { useWindowWidht } from "../../../../../app/hooks/useWindowWidht";

export function useAccountsController() {
  const windowWidth = useWindowWidht();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
    windowWidth
  };
}
