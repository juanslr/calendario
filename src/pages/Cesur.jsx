import React, { useState } from "react";
import ReactDOM from "react-dom";

const asignaturasInfo = {
  ASO: {
    nombreCompleto: "Administración de Sistemas Operativos",
    profesor: "Javier",
    color: "bg-red-500",
  },
  PI: {
    nombreCompleto: "Proyecto Integrado",
    profesor: "Javier",
    color: "bg-blue-500",
  },
  BD: {
    nombreCompleto: "Base de Datos",
    profesor: "Lidia",
    color: "bg-purple-500",
  },
  IPEII: { nombreCompleto: "FOL ", profesor: "Jesús", color: "bg-orange-500" },
  SEREI: {
    nombreCompleto: "Seguridad en Entornos Informáticos",
    profesor: "Javier",
    color: "bg-yellow-500",
  },
  INGLES: {
    nombreCompleto: "Inglés",
    profesor: "Inmaculada",
    color: "bg-indigo-500",
  },
  SEG: {
    nombreCompleto: "Seguridad Informática",
    profesor: "Javier",
    color: "bg-green-500",
  },
  IAW: {
    nombreCompleto: "Implantación de Aplicaciones Web",
    profesor: "Giraldo",
    color: "bg-pink-500",
  },
  OPT: {
    nombreCompleto: "Optativa - Ciberseguridad",
    profesor: "Javier",
    color: "bg-teal-500",
  },
};

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const horario = [
  ["OPT", "SEREI",  "SEREI",  "IPEII", "ASO"],
  ["OPT", "SEREI",  "SEREI",  "IPEII", "ASO"],
  ["OPT", "INGLES", "SEREI", "IPEII",  "ASO"],
  ["Recreo", "Recreo", "Recreo", "Recreo", "Recreo"],
  ["SEG", "INGLES", "ASO",    "IAW",   "BD"],
  ["SEG", "IAW",    "ASO",    "PI",    "BD"],
  ["SEG", "IAW",    "PI",     "IAW",   "BD"],
];

const portalRoot = document.getElementById("portal-root") || document.body;

const Cesur = () => {
  const [infoVisible, setInfoVisible] = useState(null);
  const [portalPosition, setPortalPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e, asignatura) => {
    if (asignatura === "Recreo") return; // No mostrar info para recreo

    const rect = e.target.getBoundingClientRect();
    setPortalPosition({
      top:
        rect.bottom + 110 > window.innerHeight ? rect.top - 110 : rect.bottom,
      left: Math.min(
        Math.max(rect.left + rect.width / 2, 10),
        window.innerWidth - 266
      ),
    });
    setInfoVisible(asignatura);
  };

  const handleMouseLeave = () => {
    setInfoVisible(null);
  };

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-extrabold text-white mb-8 text-center">
        Horario Semanal
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-purple-700 text-white">
          <thead>
            <tr className="bg-purple-900">
              {dias.map((dia) => (
                <th
                  key={dia}
                  className="border border-purple-700 px-4 py-2 text-center whitespace-normal break-words sm:px-6"
                >
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horario.map((fila, i) => (
              <tr key={i}>
                {fila.map((materia, j) => {
                  const info = asignaturasInfo[materia];
                  const bgColor =
                    materia === "Recreo"
                      ? "bg-gray-600"
                      : info?.color || "bg-gray-700";
                  return (
                    <td
                      key={j}
                      className={`${bgColor} border border-purple-700 px-4 py-4 text-center font-bold cursor-pointer select-none`}
                      onMouseEnter={(e) => handleMouseEnter(e, materia)}
                      onMouseLeave={handleMouseLeave}
                      onClick={(e) =>
                        infoVisible === materia
                          ? setInfoVisible(null)
                          : handleMouseEnter(e, materia)
                      }
                    >
                      {materia}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    {/* Div adicional debajo de la tabla */}
    <div className="mt-8 p-4 bg-gray-800 text-white rounded shadow-md">
      {/* Aquí puedes poner lo que quieras */}
      <h3 className="text-xl font-semibold mb-2">Info</h3>
      <p>Tutor: Javier</p>
      <p>coordinación dual: Javier</p>
    </div>

      {/* Desplegable info */}
      {infoVisible &&
        asignaturasInfo[infoVisible] &&
        ReactDOM.createPortal(
          <div
            className="w-64 max-w-[90vw] p-3 text-sm rounded shadow-xl text-white bg-gray-900 border border-white fixed"
            style={{
              top: portalPosition.top,
              left: portalPosition.left,
              transform: "translate(-50%, 0)",
              zIndex: 1000,
            }}
          >
            <p>
              <strong>Nombre:</strong>{" "}
              {asignaturasInfo[infoVisible].nombreCompleto}
            </p>
            <p>
              <strong>Profesor:</strong> {asignaturasInfo[infoVisible].profesor}
            </p>
          </div>,
          portalRoot
        )}
    </div>
    
  );
};

export default Cesur;
