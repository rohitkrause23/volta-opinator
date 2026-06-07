const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const initSlider = ({ track, fill, thumb, marks, onChange }) => {
  let value = null;
  let pointerActive = false;

  const setValue = next => {
    const v = clamp(Math.round(next), 0, 10);
    if (v === value) return;
    value = v;

    const percent = `${(v / 10) * 100}%`;
    fill.style.width = percent;
    thumb.style.insetInlineStart = percent;
    thumb.classList.add("slider__thumb--active");

    marks.forEach(mark => {
      mark.classList.toggle("slider__mark--active", Number(mark.dataset.value) === v);
    });

    onChange(v);
  };

  const pointToValue = clientX => {
    const rect = track.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    return (x / rect.width) * 10;
  };

  track.addEventListener("pointerdown", event => {
    pointerActive = true;
    track.setPointerCapture(event.pointerId);
    setValue(pointToValue(event.clientX));
  });

  track.addEventListener("pointermove", event => {
    if (pointerActive) setValue(pointToValue(event.clientX));
  });

  track.addEventListener("pointerup", event => {
    pointerActive = false;
    track.releasePointerCapture(event.pointerId);
  });

  marks.forEach(mark => {
    mark.addEventListener("click", () => setValue(Number(mark.dataset.value)));
  });
};

const initSingleSelect = ({ items, selectedClass, onChange }) => {
  items.forEach(item => {
    item.addEventListener("click", () => {
      items.forEach(other => other.classList.remove(selectedClass));
      item.classList.add(selectedClass);
      onChange(item.dataset.value);
    });
  });
};

const initMultiSelect = ({ items, selectedClass, onChange }) => {
  const selected = new Set();

  items.forEach(item => {
    item.addEventListener("click", () => {
      const value = item.dataset.value;
      const isSelected = item.classList.toggle(selectedClass);
      isSelected ? selected.add(value) : selected.delete(value);
      onChange(selected);
    });
  });
};

const showToast = (toast, duration = 3200) => {
  toast.classList.add("toast--visible");
  setTimeout(() => toast.classList.remove("toast--visible"), duration);
};

const initOpi = () => {
  const state = { score: null, mood: null, aspects: new Set() };
  const submit = document.querySelector("[data-opi-submit]");
  const toast = document.querySelector("[data-opi-toast]");

  const refreshSubmit = () => {
    const ready = state.score !== null && state.mood !== null && state.aspects.size > 0;
    submit.classList.toggle("opi__submit--ready", ready);
    submit.setAttribute("aria-disabled", String(!ready));
  };

  initSlider({
    track:  document.querySelector("[data-slider-track]"),
    fill:   document.querySelector("[data-slider-fill]"),
    thumb:  document.querySelector("[data-slider-thumb]"),
    marks:  document.querySelectorAll("[data-slider-mark]"),
    onChange: value => {
      state.score = value;
      refreshSubmit();
    },
  });

  initSingleSelect({
    items: document.querySelectorAll("[data-carita]"),
    selectedClass: "carita--selected",
    onChange: value => {
      state.mood = value;
      refreshSubmit();
    },
  });

  initMultiSelect({
    items: document.querySelectorAll("[data-card]"),
    selectedClass: "card--selected",
    onChange: aspects => {
      state.aspects = aspects;
      refreshSubmit();
    },
  });

  submit.addEventListener("click", () => showToast(toast));
};

document.addEventListener("DOMContentLoaded", initOpi);
