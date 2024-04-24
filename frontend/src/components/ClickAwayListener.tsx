// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

import { useEffect, useRef } from "react";

type ClickAwayListenerProps = {
  onClickAway: () => void;
  className?: string;
} & React.PropsWithChildren;

export const ClickAwayListener = ({ onClickAway, className, children }: ClickAwayListenerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickAway();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};
