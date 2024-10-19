
const Filter = ({ reservations, setFilteredReservations }) => {
  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = reservations.filter(reservation => {
      const isTourMatch = reservation.clients.some(client => client.tour.toLowerCase().includes(value));
      return isTourMatch;
    });
    setFilteredReservations(filtered);
  };
};

export default Filter;
