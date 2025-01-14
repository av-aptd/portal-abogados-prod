import { Trash, ArrowDown, ArrowUp } from "components/icons";
import React, { useState } from "react";

const BankAccount = ({ bankAccount, deleteBankAccount }: any) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      key={bankAccount.iban}
      className="mb-4 flex items-start justify-between space-x-4 "
    >
      <div className="flex-1  bg-gray-50 border px-4 py-3 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <div className=" text-gray-700 font-medium text-sm">
            {bankAccount.name}
          </div>
          <div className=" text-gray-500 text-sm">{bankAccount.iban}</div>
          <div className="pr-4 text-sm text-gray-500 text-right">
            {Number(bankAccount.balance).toLocaleString("es-AR")} €
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteBankAccount()}
        className="bg-gray-50 hover:bg-gray-100 p-2.5 border rounded-lg"
      >
        <Trash className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};

export default BankAccount;
