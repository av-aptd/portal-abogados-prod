import { Trash, ArrowDown, ArrowUp } from "components/icons";
import React, { useState } from "react";

const Person = ({ person, deletePerson }: any) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      key={person.name}
      className="mb-4 flex items-start justify-between space-x-4 "
    >
      <div className="flex-1  bg-gray-50 border px-4 py-3 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between items-center">
            <div className="flex space-x-4">
              {person.name} {person.surname}
            </div>
            <div className="pr-4">{person.age} años</div>
          </div>

          <button onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? (
              <ArrowUp className="w-6 h-6 text-gray-500" />
            ) : (
              <ArrowDown className="w-6 h-6 text-gray-500" />
            )}
          </button>
        </div>

        {showInfo && (
          <div className="p-3">
            <p className="text-xs">{JSON.stringify(person)}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => deletePerson()}
        className="bg-gray-50 hover:bg-gray-100 p-3 border rounded-lg"
      >
        <Trash className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  );
};

export default Person;
