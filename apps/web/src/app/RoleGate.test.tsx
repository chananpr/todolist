import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import type { Role } from '../shared/config/sitemap';
import { RoleGate } from './RoleGate';

// Mock useAuth to return controlled role values
vi.mock('./AuthContext', () => {
  let role: Role = 'admin';
  return {
    AuthProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
    useAuth: () => ({
      currentRole: role,
      setCurrentRole: (r: Role) => { role = r; }
    }),
    __setTestRole: (r: Role) => { role = r; }
  };
});

const authMock = await import('./AuthContext') as typeof import('./AuthContext') & {
  __setTestRole: (r: Role) => void;
};

function renderGateAtPath(path: string, role: Role) {
  authMock.__setTestRole(role);

  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<RoleGate />}>
          <Route path="*" element={<div data-testid="page-content">Page Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('RoleGate', () => {
  it('allows member to access /projects (minRole: member)', () => {
    renderGateAtPath('/projects', 'member');
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  it('denies member access to /security (minRole: admin)', () => {
    renderGateAtPath('/security', 'member');
    expect(screen.queryByTestId('page-content')).not.toBeInTheDocument();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  it('allows admin to access /security', () => {
    renderGateAtPath('/security', 'admin');
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  it('allows admin to access /projects', () => {
    renderGateAtPath('/projects', 'admin');
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  it('allows manager to access /teams (minRole: manager)', () => {
    renderGateAtPath('/teams', 'manager');
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  it('denies manager access to /security (minRole: admin)', () => {
    renderGateAtPath('/security', 'manager');
    expect(screen.queryByTestId('page-content')).not.toBeInTheDocument();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  it('passes through for unknown routes not in sitemap', () => {
    renderGateAtPath('/some/unknown/path', 'public');
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  it('shows correct role requirement in AccessDenied message', () => {
    renderGateAtPath('/security', 'member');
    expect(screen.getByText(/requires the "admin" role/)).toBeInTheDocument();
    expect(screen.getByText(/signed in as "member"/)).toBeInTheDocument();
  });

  it('shows a link back to overview on AccessDenied', () => {
    renderGateAtPath('/security', 'member');
    const link = screen.getByText('Back to Overview');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
