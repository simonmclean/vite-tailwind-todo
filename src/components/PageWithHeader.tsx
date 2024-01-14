import { PropsWithChildren } from "react";
import AppHeader from "./AppHeader";

function PageWithHeader({ children }: PropsWithChildren) {
  return (
    <>
      <div className="bg-stone-100 dark:bg-slate-900 min-h-screen min-w-96">
        <AppHeader />
        <div className="pt-10">
          {children}
        </div>
      </div>
    </>
  );
}

export default PageWithHeader;
