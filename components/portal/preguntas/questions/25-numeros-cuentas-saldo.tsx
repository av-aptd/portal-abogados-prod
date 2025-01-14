import React, { useState, useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import BankAccountForm from "./components/bankAccountForm";
import BankAccount from "./components/bankAccount";
import { useRouter } from "next/router";
import { usePortalStore } from "store/portal";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import Nav from "../nav";
import { Help } from "components/icons";

import { useUIStore } from "store/ui";

const help = [
  `<p>Indícanos por favor el número de cuenta bancaria y el saldo de cada cuenta.</p>
  <p>Puedes encontrar esta información en la propia aplicación de tu banco o en cualquier extracto.</p>
  <p>También puedes preguntar directamente en la oficina de tu banco.</p>
  <p>Solicitamos esta información para tener en consideración todos tus activos y realizar el proceso de forma adecuada para ti.</p>

`,
];

const NumerosCuentasSaldo = () => {
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);

  useEffect(() => {
    setHelp(help);
  }, []);

  const nextStep = () => {
    for (let i = 0; i < bankAccounts.length; i++) {
      insertAnswer({
        userId: profile.id,
        groupValue: "Numeros de cuentas y el saldo",
        groupKey: `numeroscuentassaldo-${i + 1}`,
        groupNextKey: "completado",
        properties: [
          {
            propertyKey: "name",
            propertyValue: bankAccounts[i].name,
          },
          {
            propertyKey: "iban",
            propertyValue: bankAccounts[i].iban,
          },
          {
            propertyKey: "balance",
            propertyValue: bankAccounts[i].balance,
          },
        ],
      });
    }

    router.push("/portal/clientes/preguntas/completado");
  };

  const deleteBankAccount = (creditor: any) => {
    setBankAccounts(bankAccounts.filter((c) => c !== creditor));
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection
        title="A continuación necesitamos tus números de cuentas y el saldo"
        hasActions
      >
        <button
          className="text-gray-500 flex justify-center items-center"
          onClick={() => showHelpModal()}
        >
          <Help className="w-7 h-7 text-gray-400 inline-block shrink-0" />
        </button>
      </HeaderSection>
      <BodySection>
        <BankAccountForm
          setBankAccounts={setBankAccounts}
          bankAccounts={bankAccounts}
        />

        <div className="mt-8">
          {bankAccounts.map((bankAccount) => (
            <BankAccount
              key={bankAccount.IBAN}
              bankAccount={bankAccount}
              deleteBankAccount={() => deleteBankAccount(bankAccount)}
            />
          ))}
        </div>

        <Nav nextStep={nextStep} />
      </BodySection>
    </ComplexSectionBloc>
  );
};

export default NumerosCuentasSaldo;
