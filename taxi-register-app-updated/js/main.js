document.getElementById("loadBtn").addEventListener("click", async () => {
  const neptun = document.getElementById("neptunInput").value;
  if (!neptun) return alert("Add meg a Neptun kódot!");
  const cars = await fetchCars(neptun);
  renderCars(cars, neptun);
});

document.getElementById("carForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const neptun = document.getElementById("neptunInput").value;
  if (!neptun) return alert("Add meg a Neptun kódot!");

  const electric = document.getElementById("electric").checked;
  const fuelUse = parseFloat(document.getElementById("fuelUse").value);
  if (!electric && (!fuelUse || fuelUse <= 0)) {
    return alert("Nem elektromos autó esetén a fogyasztásnak pozitív számnak kell lennie!");
  }

  const carData = {
    id: parseInt(document.getElementById("carForm").dataset.editId || "0"),
    brand: document.getElementById("brand").value,
    model: document.getElementById("model").value,
    owner: document.getElementById("owner").value,
    fuelUse: electric ? 0 : fuelUse,
    dayOfCommission: document.getElementById("dayOfCommission").value,
    electric
  };

  if (carData.id === 0) {
    await createCar(neptun, carData);
  } else {
    await updateCar(neptun, carData);
    delete document.getElementById("carForm").dataset.editId;
  }

  const cars = await fetchCars(neptun);
  renderCars(cars, neptun);
  document.getElementById("carForm").reset();
  document.getElementById("message").textContent = carData.id === 0 ? "Sikeresen hozzáadva!" : "Sikeresen módosítva!";
});

async function handleDelete(id) {
  const neptun = document.getElementById("neptunInput").value;
  if (!neptun) return alert("Add meg a Neptun kódot!");
  await deleteCar(neptun, id);
  const cars = await fetchCars(neptun);
  renderCars(cars, neptun);
}