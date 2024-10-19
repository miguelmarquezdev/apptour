// src/components/TourReservation.jsx
import React, { useState } from 'react';
import ClientForm from './ClientForm';

const tours = [
  { id: 1, name: 'Tour a Machu Picchu', price: 100 },
  { id: 2, name: 'Tour al Valle Sagrado', price: 80 },
  { id: 3, name: 'Tour a Cusco', price: 60 },
  // Agrega más tours aquí según sea necesario
];

const TourReservation = ({ setReservations }) => {
  const [clients, setClients] = useState([{ nombres: '', apellidos: '', correo: '', whatsapp: '', hotel: '', fecha: '', tour: '', precio: '', notas: '' }]);
  const [tourName, setTourName] = useState('');
  const [tourPrice, setTourPrice] = useState('');
  const [reservations, setLocalReservations] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [travelDate, setTravelDate] = useState('');

  const addClient = () => {
    setClients([...clients, { nombres: '', apellidos: '', correo: '', whatsapp: '', hotel: '', fecha: '', tour: '', precio: '', notas: '' }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedClients = [...clients];
    updatedClients[index][name] = value;
    setClients(updatedClients);
  };

  const handleTourChange = (e) => {
    const selectedTour = tours.find(tour => tour.id === parseInt(e.target.value));
    const updatedClients = clients.map(client => ({
      ...client,
      tour: selectedTour ? selectedTour.name : '',
      precio: selectedTour ? selectedTour.price : '',
    }));
    setTourName(e.target.value);
    setTourPrice(selectedTour ? selectedTour.price : '');
    setClients(updatedClients);
  };

  const handleTravelDateChange = (e) => {
    const newDate = e.target.value;
    setTravelDate(newDate);
    const updatedClients = clients.map(client => ({
      ...client,
      fecha: newDate,
    }));
    setClients(updatedClients);
  };

  const handlePriceChange = (e) => {
    const updatedPrice = e.target.value;
    setTourPrice(updatedPrice);
    const updatedClients = clients.map(client => ({
      ...client,
      precio: updatedPrice,
    }));
    setClients(updatedClients);
  };

  const isDateValid = (date) => {
    const today = new Date();
    return new Date(date) >= today;
  };

  const formatDate = (dateString) => {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio", 
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month} del ${year}`;
  };

  const handleSubmit = () => {
    if (!isDateValid(travelDate)) {
      alert('Por favor, seleccione una fecha de viaje válida (futura).');
      return;
    }

    const now = new Date();
    const timestamp = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const newReservation = {
      clients,
      created_at: timestamp,
      tour: clients[0].tour || 'Sin Nombre',
      fechaViaje: formatDate(travelDate), // Formateamos la fecha al guardarla
      precio: clients[0].precio || 'Sin Precio',
    };

    if (editingIndex !== null) {
      const updatedReservations = [...reservations];
      updatedReservations[editingIndex] = newReservation;
      setLocalReservations(updatedReservations);
      setReservations(updatedReservations);
      setEditingIndex(null);
      alert('Reserva actualizada con éxito');
    } else {
      setLocalReservations([...reservations, newReservation]);
      setReservations([...reservations, newReservation]);
      alert('Reserva guardada con éxito');
    }

    setClients([{ nombres: '', apellidos: '', correo: '', whatsapp: '', hotel: '', fecha: '', tour: '', precio: '', notas: '' }]);
    setTourName('');
    setTourPrice('');
    setTravelDate('');
  };

  const deleteReservation = (index) => {
    const updatedReservations = reservations.filter((_, idx) => idx !== index);
    setLocalReservations(updatedReservations);
    setReservations(updatedReservations);
  };

  const editReservation = (index) => {
    const reservationToEdit = reservations[index];
    setClients(reservationToEdit.clients);
    setTourName(reservationToEdit.tour);
    setTourPrice(reservationToEdit.precio);
    setTravelDate(reservationToEdit.fechaViaje); // Aquí se mantiene el formato legible
    setEditingIndex(index);
  };

  const getUniqueTourNames = () => {
    const uniqueTours = Array.from(new Set(reservations.map(res => res.tour)));
    return uniqueTours;
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className=" mx-auto flex  gap-10 h-screen overflow-hidden">
      <section className='h-full overflow-y-scroll p-4 w-3/12 '>
        <h1 className="text-2xl font-bold mb-4">Reservar Tour</h1>
        
        {/* Campo para la fecha de viaje */}
        <div className="mb-4">
          <label className="block mb-2">Fecha de Viaje:</label>
          <input
            type="date"
            value={travelDate}
            min={getCurrentDate()}
            onChange={handleTravelDateChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Seleccionar Tour:</label>
          <select value={tourName} onChange={handleTourChange} className="border p-2 rounded mb-4">
            <option value="">Seleccione un Tour</option>
            {tours.map(tour => (
              <option key={tour.id} value={tour.id}>{tour.name}</option>
            ))}
          </select>
        </div>

        {/* Campo para el precio del tour que ahora es editable */}
        <div className="mb-4">
          <label className="block mb-2">Precio del Tour:</label>
          <input
            type="number"
            value={tourPrice}
            onChange={handlePriceChange}
            className="border p-2 rounded"
          />
        </div>

        {clients.map((client, index) => (
          <ClientForm key={index} client={client} index={index} handleInputChange={handleInputChange} />
        ))}

        <button onClick={addClient} className="bg-blue-500 text-white p-2 rounded">Añadir Cliente</button>
        <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded mt-4">{editingIndex !== null ? 'Actualizar Reserva' : 'Guardar Reserva'}</button>
      </section>

      <section className='h-full overflow-y-scroll p-4 w-9/12'>
        <h2 className="text-xl font-bold mt-6">Lista de Reservas</h2>
        <div className="my-4 flex gap-5">
          <section>
            <label className="block mb-2">Filtrar por Nombre del Tour:</label>
            <select value={tourName} onChange={(e) => setTourName(e.target.value)} className="border p-2 rounded mb-4">
              <option value="">Todos</option>
              {getUniqueTourNames().map((tour, index) => (
                <option key={index} value={tour}>{tour}</option>
              ))}
            </select>
          </section>
          <section>
            <label className="block mb-2">Filtrar por Fecha de Viaje:</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="border p-2 rounded mb-4"
            />
          </section>
        </div>
        
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Nombre del Tour</th>
              <th className="border border-gray-300 p-2">Fecha de Viaje</th>
              <th className="border border-gray-300 p-2">Precio</th>
              <th className="border border-gray-300 p-2">Clientes</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.filter(res => !tourName || res.tour === tourName).filter(res => !travelDate || res.fechaViaje === formatDate(travelDate)).map((res, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{res.tour}</td>
                <td className="border border-gray-300 p-2">{res.fechaViaje}</td>
                <td className="border border-gray-300 p-2">{res.precio}</td>
                <td className="border border-gray-300 p-2">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Cliente N°</th>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">WhatsApp</th>
                        <th className="border border-gray-300 p-2">Hotel</th>
                        <th className="border border-gray-300 p-2">Notas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {res.clients.map((client, idx) => (
                        <tr key={idx}>
                          <td className="border border-gray-300 p-2">{idx + 1}</td>
                          <td className="border border-gray-300 p-2">{client.nombres} {client.apellidos}</td>
                          <td className="border border-gray-300 p-2">{client.correo}</td>
                          <td className="border border-gray-300 p-2">{client.whatsapp}</td>
                          <td className="border border-gray-300 p-2">{client.hotel}</td>
                          <td className="border border-gray-300 p-2">{client.notas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={() => editReservation(index)} className="bg-yellow-500 text-white p-1 rounded">Editar</button>
                    <button onClick={() => deleteReservation(index)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TourReservation;
