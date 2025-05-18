const API_URL = 'https://iit-playground.arondev.hu/api';
let NEPTUN = '';

const form = document.getElementById('car-form');
const tableBody = document.querySelector('#car-table tbody');

function promptNeptunCode() {
  NEPTUN = prompt('Kérlek, add meg a Neptun kódod (max 10 karakter):', '').toUpperCase().trim();
  if (!NEPTUN || NEPTUN.length > 10) {
    alert('Érvénytelen Neptun kód. Maximum 10 karakter engedélyezett.');
    promptNeptunCode();
  }
}

async function fetchCars() {
  try {
    const res = await fetch(`${API_URL}/${NEPTUN}/car`);
    if (!res.ok) throw new Error('Autók lekérése sikertelen');
    const cars = await res.json();
    tableBody.innerHTML = '';
    cars.forEach(car => addCarToTable(car));
  } catch (error) {
    alert('Hiba történt az adatok lekérése közben: ' + error.message);
  }
}

function addCarToTable(car) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${car.brand}</td>
    <td>${car.model}</td>
    <td>${car.fuelUse}</td>
    <td>${car.owner}</td>
    <td>${car.dayOfCommission}</td>
    <td>${car.electric ? 'Igen' : 'Nem'}</td>
    <td>
      <button onclick='editCar(${JSON.stringify(car)})'>✏️ Módosítás</button>
      <button onclick='deleteCar(${car.id})'>🗑️ Törlés</button>
    </td>`;
  tableBody.appendChild(tr);
}

form.onsubmit = async (e) => {
  e.preventDefault();

  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value.trim();
  const fuelUse = parseFloat(document.getElementById('fuelUse').value);
  const owner = document.getElementById('owner').value.trim();
  const dayOfCommission = document.getElementById('dayOfCommission').value;
  const electric = document.getElementById('electric').checked;

  const allowedBrands = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW",
    "Mercedes-Benz", "Volkswagen", "Audi", "Hyundai", "Kia", "Subaru", "Lexus",
    "Mazda", "Tesla", "Jeep", "Porsche", "Volvo", "Jaguar", "Land Rover",
    "Mitsubishi", "Ferrari", "Lamborghini"];

  if (!allowedBrands.includes(brand)) {
    alert('Nem megfelelő márkát választottál.');
    return;
  }

  if (!/\s/.test(owner)) {
    alert('A tulajdonos neve legalább egy szóközt kell tartalmazzon.');
    return;
  }

  if (!electric && fuelUse <= 0) {
    alert('Nem elektromos autónál a fogyasztásnak nagyobbnak kell lennie 0-nál.');
    return;
  }

  const car = {
    id: parseInt(document.getElementById('car-id').value) || 0,
    brand,
    model,
    fuelUse: electric ? 0 : fuelUse,
    owner,
    dayOfCommission,
    electric
  };

  try {
    const method = car.id ? 'PUT' : 'POST';
    const url = `${API_URL}/${NEPTUN}/car`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    });
    if (!res.ok) throw await res.json();

    alert(car.id ? 'Autó módosítva.' : 'Autó létrehozva.');
    form.reset();
    fetchCars();
  } catch (error) {
    alert('Hiba történt a mentés közben: ' + (error.message || 'Ismeretlen hiba'));
  }
};

window.deleteCar = async function(id) {
  if (!confirm('Biztosan törlöd ezt az autót?')) return;
  try {
    const res = await fetch(`${API_URL}/${NEPTUN}/car/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Törlés sikertelen');
    alert('Autó törölve.');
    fetchCars();
  } catch (error) {
    alert('Hiba történt a törlés során: ' + error.message);
  }
};

window.editCar = function(car) {
  document.getElementById('car-id').value = car.id;
  document.getElementById('brand').value = car.brand;
  document.getElementById('model').value = car.model;
  document.getElementById('fuelUse').value = car.fuelUse;
  document.getElementById('owner').value = car.owner;
  document.getElementById('dayOfCommission').value = car.dayOfCommission;
  document.getElementById('electric').checked = car.electric;
};

promptNeptunCode();
fetchCars();

