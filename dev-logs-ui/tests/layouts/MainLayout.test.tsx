import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '../base';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../../src/layouts/MainLayout';

// Mock Navbar
vi.mock('../../src/components/Navbar', () => ({
  default: () => <div data-testid="navbar">Mock Navbar</div>,
}));

describe('MainLayout', () => {
  it('renders Navbar, Outlet content, and ToastContainer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div data-testid="child">Child content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(document.querySelector('.Toastify')).toBeInTheDocument();
  });
});
