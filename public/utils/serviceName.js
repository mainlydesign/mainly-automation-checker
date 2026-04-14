import { CATEGORIES } from '../data/categories.js';

export function getServiceName(id) {
  for (const cat of CATEGORIES) {
    const svc = cat.services.find(s => s.id === id);
    if (svc) return svc.name;
  }
  return id;
}
