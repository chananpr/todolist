import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouteScaffold } from './RouteScaffold';
import type { RouteNode } from '../config/sitemap';

const demoRoute: RouteNode = {
  path: '/demo',
  label: 'Demo',
  eyebrow: 'Demo Eyebrow',
  summary: 'Demo summary describing the route.',
  minRole: 'member'
};

describe('RouteScaffold', () => {
  it('renders PageHeader with route metadata by default', () => {
    render(<RouteScaffold route={demoRoute} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Demo' })).toBeInTheDocument();
    expect(screen.getByText('Demo Eyebrow')).toBeInTheDocument();
    expect(screen.getByText(/Demo summary/)).toBeInTheDocument();
  });

  it('shows the "not yet implemented" empty state when no children are provided', () => {
    render(<RouteScaffold route={demoRoute} />);
    expect(screen.getByText('ยังไม่เริ่มพัฒนา')).toBeInTheDocument();
    expect(screen.getByText(/\/demo/)).toBeInTheDocument();
  });

  it('replaces the empty state when children are provided', () => {
    render(
      <RouteScaffold route={demoRoute}>
        <div>Real content</div>
      </RouteScaffold>
    );
    expect(screen.queryByText('ยังไม่เริ่มพัฒนา')).not.toBeInTheDocument();
    expect(screen.getByText('Real content')).toBeInTheDocument();
  });

  it('uses the title override when provided', () => {
    render(<RouteScaffold route={demoRoute} title="Custom Title" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Custom Title' })).toBeInTheDocument();
  });

  it('renders the leading slot above the page header', () => {
    render(<RouteScaffold route={demoRoute} leading={<nav data-testid="leading">crumbs</nav>} />);
    expect(screen.getByTestId('leading')).toBeInTheDocument();
  });
});
