import React, { useState } from "react";
import { usePreguntasStore } from "store/preguntas";
import EmployeeForm from "./components/employeeForm";
import Employee from "./components/employee";
import Person from "./components/person";
import PersonForm from "./components/personForm";
import { usePortalStore } from "store/portal";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { LongArrowRight } from "components/icons";
import Nav from "../nav";

const ListadoPersonasDependientes = () => {
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const profile = usePortalStore((state) => state.profile);
  const [people, setPeople] = useState<any[]>([]);

  const nextStep = () => {
    for (let i = 0; i < people.length; i++) {
      insertAnswer({
        userId: profile.id,
        groupValue: "Listado de personas dependientes de ti",
        groupKey: `listadopersonasdependientes-${i + 1}`,
        groupNextKey: "copropietariosviviendahabitual",
        properties: [
          {
            propertyKey: "name",
            propertyValue: people[i].name,
          },
          {
            propertyKey: "surname",
            propertyValue: people[i].surname,
          },
          {
            propertyKey: "age",
            propertyValue: people[i].age,
          },
        ],
      });
    }

    setCurrentQuestion("copropietariosviviendahabitual");
  };

  const deletePerson = (creditor: any) => {
    setPeople(people.filter((c) => c !== creditor));
  };

  return (
    <SectionBloc title="Listado de personas dependientes de ti ">
      <PersonForm setPeople={setPeople} people={people} />

      <div className="mt-8">
        {people.map((person) => (
          <Person
            key={person.name}
            person={person}
            deletePerson={() => deletePerson(person)}
          />
        ))}
      </div>

      <Nav nextStep={nextStep} />
    </SectionBloc>
  );
};

export default ListadoPersonasDependientes;
