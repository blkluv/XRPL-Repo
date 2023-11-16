import { Currency } from "@/components/faucet/content";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";

type Props = {
  leftHeader: string;
  inputs: Currency[];
  value: string;
  token: Currency;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<Currency>>;
};

/**
 * InputDropBox Component
 * @param param0 
 * @returns 
 */
export default function InputDropBox({
  leftHeader,
  inputs,
  token,
  value,
  onChange,
  setToken
}: Props) {
  return (
    <div className="w-3/4 h-auto flex flex-col mx-auto my-10 p-0 md:p-4 rounded-lg relative overflow-hidden border-2 border-gray-500">
      <div className="flex justify-between text-white">
        <div>
          <p className="text-sm text-left"> 
            {leftHeader} 
          </p>
          <input
            className="w-70 h-12 text-lg bg-gray-900 text-white border-0 focus:outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={"Plaese enter"}
          />
        </div>
        <div className="flex items-center justify-center text-2xl font-bold mt-3">
          <Dropdown
            classNames={{
              base: "w-full min-w-[260px]",
            }}
          >
            <DropdownTrigger className="cursor-pointer">
              <div className="items-center m-2 gap-2 bg-gray-700">
                <div className="flex-col m-2 gap-4 bg-gray-700">
                  <h3 className="text-xl font-medium m-0 text-default-900 whitespace-nowrap">
                    {token.name}
                  </h3>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              className="bg-gray-900"
              onAction={(e: any) => {
                if (e >= 0 && e < inputs.length) {
                  const selectedToken = inputs[e];
                  setToken(selectedToken);
                }
              }}
              aria-label="Avatar Actions"
              items={inputs}
            >
              {(item: any) => (
                <DropdownItem
                  key={item.currency}
                  classNames={{
                    base: "py-4",
                    title: "text-base font-semibold",
                  }}
                >
                  {item.name}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}