// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Smoke Test', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debería renderizar la aplicación sin explotar', () => {
    render(<App />);
    
    // Verificamos elementos clave que confirman que la UI cargó
    expect(screen.getByText(/Gestor de Mantenimiento/i)).toBeInTheDocument();
    expect(screen.getByText(/Odómetro/i)).toBeInTheDocument();
    expect(screen.getByText(/Nuevo Registro/i)).toBeInTheDocument();
  });
});