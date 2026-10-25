// Render lucide icons (calendar, map-pin, ...)
if (window.lucide) {
  lucide.createIcons();
}

// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMobile.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

// RSVP form handling
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
  const rsvpCard = document.getElementById("rsvpCard");
  const rsvpSuccess = document.getElementById("rsvpSuccess");
  const nameInput = document.getElementById("guestName");
  const countInput = document.getElementById("guestCount");
  const nameError = document.getElementById("guestNameError");
  const countError = document.getElementById("guestCountError");

  const NAME_MIN_LENGTH = 2;
  const NAME_MAX_LENGTH = 100;
  const GUEST_MIN = 1;
  const GUEST_MAX = 20;

  function setFieldError(input, errorEl, message) {
    errorEl.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateName() {
    const value = nameInput.value.trim();

    if (!value) {
      setFieldError(nameInput, nameError, "Kérjük add meg a neved/neveket.");
      return false;
    }
    if (value.length < NAME_MIN_LENGTH) {
      setFieldError(nameInput, nameError, `A név legalább ${NAME_MIN_LENGTH} karakter legyen.`);
      return false;
    }
    if (value.length > NAME_MAX_LENGTH) {
      setFieldError(nameInput, nameError, `A név legfeljebb ${NAME_MAX_LENGTH} karakter lehet.`);
      return false;
    }

    setFieldError(nameInput, nameError, "");
    return true;
  }

  function validateCount() {
    const raw = countInput.value.trim();

    if (!raw) {
      setFieldError(countInput, countError, "Kérjük add meg, hányan jöttök.");
      return false;
    }

    const count = Number(raw);

    if (!Number.isInteger(count)) {
      setFieldError(countInput, countError, "Egész számot adj meg.");
      return false;
    }
    if (count < GUEST_MIN) {
      setFieldError(countInput, countError, `Legalább ${GUEST_MIN} fő szükséges.`);
      return false;
    }
    if (count > GUEST_MAX) {
      setFieldError(countInput, countError, `Legfeljebb ${GUEST_MAX} fő adható meg.`);
      return false;
    }

    setFieldError(countInput, countError, "");
    return true;
  }

  nameInput.addEventListener("input", validateName);
  countInput.addEventListener("input", validateCount);

  rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isCountValid = validateCount();

    if (!isNameValid || !isCountValid) {
      (isNameValid ? countInput : nameInput).focus();
      return;
    }

    const submitBtn = rsvpForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Küldés...';

    try {
      const response = await fetch('http://localhost:3000/api/submit-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          count: Number(countInput.value),
        }),
      });

      if (!response.ok) {
        throw new Error('Email submission failed');
      }

      rsvpCard.hidden = true;
      rsvpSuccess.hidden = false;
      nameInput.value = '';
      countInput.value = '';
    } catch (error) {
      console.error('Submission error:', error);
      alert('Hiba a beküldés során. Kérjük, próbálja újra később.');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}
