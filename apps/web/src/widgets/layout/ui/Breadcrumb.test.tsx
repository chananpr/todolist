import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Breadcrumb />
    </MemoryRouter>
  );
}

describe('Breadcrumb', () => {
  it('renders nothing for top-level routes (single-entry chain)', () => {
    const { container } = renderAt('/projects');
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing at the root dashboard', () => {
    const { container } = renderAt('/');
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the URL param value at a :param leaf', () => {
    renderAt('/projects/phoenix-2026');
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('phoenix-2026')).toBeInTheDocument();
  });

  it('keeps the route label when the leaf is a literal segment after a :param', () => {
    renderAt('/projects/phoenix-2026/board');
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('phoenix-2026')).toBeInTheDocument();
    expect(screen.getByText('Kanban Board')).toBeInTheDocument();
  });

  it('links ancestor routes and shows current page as plain text', () => {
    renderAt('/projects/phoenix-2026/board');
    const projectsLink = screen.getByRole('link', { name: 'Projects' });
    expect(projectsLink).toHaveAttribute('href', '/projects');
    // Current page has aria-current
    expect(screen.getByText('Kanban Board')).toHaveAttribute('aria-current', 'page');
    // :param crumbs are plain spans (not links) since a pattern URL isn't navigable
    expect(screen.queryByRole('link', { name: 'phoenix-2026' })).toBeNull();
  });

  it('handles /kpi/:metric correctly', () => {
    renderAt('/kpi/throughput');
    expect(screen.getByText('KPI')).toBeInTheDocument();
    expect(screen.getByText('throughput')).toBeInTheDocument();
  });

  it('handles /security/roles (literal second segment, not a param)', () => {
    renderAt('/security/roles');
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Roles & Permissions')).toBeInTheDocument();
  });

  it('renders nothing for unknown paths', () => {
    const { container } = renderAt('/does-not-exist');
    expect(container).toBeEmptyDOMElement();
  });
});
