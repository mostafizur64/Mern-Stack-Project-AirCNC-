export const addBooking = async (bookings) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookings),
  });
  const data = await response.json();
  return data;
};

// update room status
export const updateStatus = async (id, status) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/status/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  return data;
};
