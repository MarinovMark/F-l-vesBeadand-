const BASE_URL = "https://iit-playground.arondev.hu/api";

async function fetchCars(neptun) {
  const response = await fetch(`${BASE_URL}/${neptun}/car`);
  return await response.json();
}

async function createCar(neptun, carData) {
  const response = await fetch(`${BASE_URL}/${neptun}/car`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carData),
  });
  return await response.json();
}

async function deleteCar(neptun, id) {
  const response = await fetch(`${BASE_URL}/${neptun}/car/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

async function updateCar(neptun, carData) {
  const response = await fetch(`${BASE_URL}/${neptun}/car`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carData),
  });
  return await response.json();
}