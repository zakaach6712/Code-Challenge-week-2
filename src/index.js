const form = document.getElementById("guest-form");
const input = document.getElementById("guest-input");
const categorySelect = document.getElementById("guest-category");
const guestList = document.getElementById("guest-list");
const maxGuests = 10;
let guests = [];

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = input.value.trim();
  const category = categorySelect.value;

  if (!name || !category) return;

  if (guests.length >= maxGuests) {
    alert("Guest list is full!");
    return;
  }

  const guest = {
    id: Date.now(),
    name,
    category,
    attending: false,
    timestamp: new Date().toLocaleTimeString()
  };

  guests.push(guest);
  form.reset();
  renderList();
});

function renderList() {
  guestList.innerHTML = "";
  guests.forEach(guest => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${guest.name} - ${guest.category} (${guest.attending ? "Attending" : "Not Attending"}) - ${guest.timestamp}</span>
      <button onclick="toggleRSVP(${guest.id})">Confirm Attendance</button>
      <button onclick="removeGuest(${guest.id})">Remove</button>
    `;
    guestList.appendChild(li);
  });
}

function toggleRSVP(id) {
  guests = guests.map(g =>
    g.id === id ? { ...g, attending: !g.attending } : g
  );
  renderList();
}

function removeGuest(id) {
  guests = guests.filter(g => g.id !== id);
  renderList();
}