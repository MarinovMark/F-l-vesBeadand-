function renderCars(cars, neptun) {
  const list = document.getElementById("carList");
  list.innerHTML = "";
  cars.forEach(car => {
    const carDiv = document.createElement("div");
    carDiv.innerHTML = `
      <strong>${car.brand} ${car.model}</strong><br>
      Tulajdonos: ${car.owner}<br>
      Fogyasztás: ${car.fuelUse} L/100km<br>
      Elektromos: ${car.electric ? "Igen" : "Nem"}<br>
      Üzembe helyezés: ${car.dayOfCommission}<br>
      <button onclick="handleDelete(${car.id})">Törlés</button>
      <button onclick='editCar(${JSON.stringify(car)})'>Szerkesztés</button>
    `;
    list.appendChild(carDiv);
  });
}

function editCar(car) {
  document.getElementById("brand").value = car.brand;
  document.getElementById("model").value = car.model;
  document.getElementById("owner").value = car.owner;
  document.getElementById("fuelUse").value = car.fuelUse;
  document.getElementById("dayOfCommission").value = car.dayOfCommission;
  document.getElementById("electric").checked = car.electric;
  document.getElementById("carForm").dataset.editId = car.id;
}