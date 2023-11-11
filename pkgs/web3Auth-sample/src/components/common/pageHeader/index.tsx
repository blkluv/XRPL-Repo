import { Address } from "./address";
import { Balance } from "./balance";

/**
 * PageHeader Component
 * @returns 
 */
export const PageHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">Your Info</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5 justify-center w-full">
      <Address address={"res89864649xe"} />
      <Balance balance={"45,00"} />
      </div>
    </div>
  );
}