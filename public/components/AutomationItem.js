import { getServiceName } from '../utils/serviceName.js';

export function createAutomationItem(m) {
  const item = document.createElement('div');
  item.className = 'automation-item' + (m.isCategoryMatch ? ' category-match' : '');

  let tagHtml;
  if (m.isCategoryMatch) {
    tagHtml = m.categories.map(c => `<span class="automation-tag category-tag">${c}</span>`).join('');
  } else {
    tagHtml = m.tools.map(t => `<span class="automation-tag">${getServiceName(t)}</span>`).join('');
  }

  item.innerHTML = `
    <div class="automation-dot${m.isCategoryMatch ? ' category-dot' : ''}"></div>
    <div>
      <div class="automation-text">${m.text}</div>
      <div class="automation-tags">${tagHtml}</div>
    </div>
  `;
  return item;
}
