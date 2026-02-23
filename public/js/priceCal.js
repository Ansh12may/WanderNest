document.addEventListener("DOMContentLoaded", () => {
  const pricePerNight = Number(
    document.getElementById("pricePerNight")?.value
  );
  if (!pricePerNight) return;

  const SERVICE_FEE = 350;

  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");
  const guests = document.getElementById("guests");
  const reserveBtn = document.getElementById("reserveBtn");

  const nightsEl = document.getElementById("nights");
  const guestCountEl = document.getElementById("guestCount");
  const stayTotalEl = document.getElementById("stayTotal");
  const grandTotalEl = document.getElementById("grandTotal");

  function calculate() {
    if (!checkIn.value || !checkOut.value) {
      reserveBtn.disabled = true;
      return;
    }

    const start = new Date(checkIn.value);
    const end = new Date(checkOut.value);

    if (end <= start) {
      reserveBtn.disabled = true;
      return;
    }

    const nights =
      (end - start) / (1000 * 60 * 60 * 24);

    const guestCount = Number(guests.value);

    const stayTotal = pricePerNight * nights * guestCount;
    const total = stayTotal + SERVICE_FEE;

    nightsEl.textContent = nights;
    guestCountEl.textContent = guestCount;
    stayTotalEl.textContent = stayTotal.toLocaleString("en-IN");
    grandTotalEl.textContent = total.toLocaleString("en-IN");

    reserveBtn.disabled = false;
  }

  checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value;
    calculate();
  });

  checkOut.addEventListener("change", calculate);
  guests.addEventListener("change", calculate);
});
