import React, { useState } from "react";
import { usePreguntasStore } from "store/preguntas";
Nav;
import EmployeeForm from "./components/employeeForm";
import Employee from "./components/employee";
import { usePortalStore } from "store/portal";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import Nav from "../nav";
const PlantillaTrabajadores = () => {
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const profile = usePortalStore((state) => state.profile);
  const [employees, setEmployees] = useState<any[]>([]);

  const nextStep = () => {
    for (let i = 0; i < employees.length; i++) {
      insertAnswer({
        userId: profile.id,
        groupValue: "Plantilla de tus trabajadores",
        groupKey: `plantillatrabajadores-${i + 1}`,
        groupNextKey: "tienesbienesactivos",
        properties: [
          {
            propertyKey: "name",
            propertyValue: employees[i].name,
          },
          {
            propertyKey: "surname",
            propertyValue: employees[i].surname,
          },
          {
            propertyKey: "phone",
            propertyValue: employees[i].phone,
          },
          {
            propertyKey: "email",
            propertyValue: employees[i].email,
          },
          {
            propertyKey: "salary",
            propertyValue: employees[i].salary,
          },
        ],
      });
    }
    setCurrentQuestion("tienesbienesactivos");
  };

  const deleteEmployee = (creditor: any) => {
    setEmployees(employees.filter((c) => c !== creditor));
  };

  return (
    <SectionBloc title="Plantilla de tus trabajadores">
      {/* <p className="text-gray-400">Puedes añadir más de uno</p> */}
      <EmployeeForm setEmployees={setEmployees} employees={employees} />

      <div className="mt-8">
        {employees.map((employee) => (
          <Employee
            key={employee.email}
            employee={employee}
            deleteEmployee={() => deleteEmployee(employee)}
          />
        ))}
      </div>

      <Nav nextStep={nextStep} />
    </SectionBloc>
  );
};

export default PlantillaTrabajadores;
