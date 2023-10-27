import { type } from "os";
import React from "react";

interface ConfigCardProps {
  titulo: string;
  texto: string;
}

const ConfigCard: React.FC<ConfigCardProps> = ({ titulo, texto }) => {
  return (
    <div className="flex flex-col rounded-sm items-center text-xl border border-gray-300 p-2 md:mt-5">
      <h3>
        <span className="text-2xl font-semibold">{titulo}:</span> {texto}
      </h3>
    </div>
  );
};

export default ConfigCard;
