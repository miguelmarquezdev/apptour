// src/components/ClientForm.jsx
import React from 'react';

const ClientForm = ({ client, index, handleInputChange }) => {
   // Función para obtener la fecha actual en formato YYYY-MM-DD
   const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  return (
    <div className="border p-4 mb-4 rounded">
      <h2 className="text-lg font-bold mb-2">Cliente {index + 1}</h2>
      <div className="mb-2">
        <label className="block mb-1">Nombres:</label>
        <input
          type="text"
          name="nombres"
          value={client.nombres}
          onChange={(e) => handleInputChange(e, index)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Apellidos:</label>
        <input
          type="text"
          name="apellidos"
          value={client.apellidos}
          onChange={(e) => handleInputChange(e, index)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Correo Electrónico:</label>
        <input
          type="email"
          name="correo"
          value={client.correo}
          onChange={(e) => handleInputChange(e, index)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Número de WhatsApp:</label>
        <input
          type="text"
          name="whatsapp"
          value={client.whatsapp}
          onChange={(e) => handleInputChange(e, index)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Hotel:</label>
        <input
          type="text"
          name="hotel"
          value={client.hotel}
          onChange={(e) => handleInputChange(e, index)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Notas:</label>
        <textarea
          name="notas"
          value={client.notas}
          onChange={(e) => handleInputChange(e, index)}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};

export default ClientForm;
