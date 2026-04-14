/**
 * Creates and returns a service card DOM element.
 *
 * @param {Object}   svc        - Service definition { id, name }
 * @param {boolean}  isSelected - Whether the card starts selected
 * @param {Function} onToggle   - Callback(id, cardEl) called on click
 * @returns {HTMLElement}
 */
export function createServiceCard(svc, isSelected, onToggle) {
  const card = document.createElement('div');
  card.className = 'service-card' + (isSelected ? ' selected' : '');
  card.dataset.id = svc.id;
  card.innerHTML = `
    <img class="service-logo" src="/logos/${svc.id}.svg" alt="${svc.name}" loading="lazy" draggable="false">
    <div class="service-name">${svc.name}</div>
  `;
  card.addEventListener('click', () => onToggle(svc.id, card));
  return card;
}
