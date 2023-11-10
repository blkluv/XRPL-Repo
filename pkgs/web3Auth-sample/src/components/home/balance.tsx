import { Card, CardBody } from "@nextui-org/react";
import React from "react";

/**
 * BalanceComponent
 * @returns 
 */
export const Balance = () => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">45,910{" "} XRP</span>
        </div>
      </CardBody>
    </Card>
  );
};
