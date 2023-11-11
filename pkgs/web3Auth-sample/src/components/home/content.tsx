import { PageHeader } from "../common/pageHeader";

/**
 * Content Component
 * @returns 
 */
export const Content = () => (
  <div className=" h-full">
    <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6  gap-6 flex flex-col w-full">
        {/* PageHeader */}
        <PageHeader/>
        {/* Swap */}
        <div className="h-full flex flex-col gap-2">
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 text-center">
            ここにSWAP用のコンポーネント
          </div>
        </div>
      </div>
    </div>
  </div>
);
