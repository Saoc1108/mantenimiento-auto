import '@testing-library/jest-dom';
import { beforeEach } from 'vitest';

// Limpiamos la "base de datos" (localStorage) antes de cada prueba
beforeEach(() => {
  localStorage.clear();
});

(globalThis as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};