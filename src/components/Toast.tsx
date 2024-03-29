import Button from "./Button";
import { PropsWithChildren, useEffect, useRef } from "react";

type ToastProps = {
  buttonText: string;
  action: () => void;
  lifespanSeconds: number;
};

function Toast({
  buttonText,
  action,
  lifespanSeconds,
  children
}: PropsWithChildren<ToastProps>) {
  const lineEl = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (lineEl.current && !isAnimating.current) {
      isAnimating.current = true;
      const keyframes: Keyframe[] = [
        { transform: "scaleX(1)" },
        { transform: "scaleX(0)" },
      ];
      const animationConfig: KeyframeAnimationOptions = {
        duration: lifespanSeconds * 1000,
        fill: "forwards",
      };
      lineEl.current.animate(keyframes, animationConfig);
    }
  }, [lifespanSeconds]);

  return (
    <div
      className="flex rounded relative dark:bg-slate-800 border border-slate-700 p-4 mt-4"
    >
      <div
        className="absolute top-0 left-0 w-full h-px dark:bg-blue-500 origin-left"
        ref={lineEl}
      ></div>
      {children}
      <Button buttonStyle="primary" onClick={action} className="ml-auto">
        {buttonText}
      </Button>
    </div>
  );
}

export default Toast
