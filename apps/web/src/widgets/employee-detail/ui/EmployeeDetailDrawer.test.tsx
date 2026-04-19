import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { EmployeeDetailDrawer } from './EmployeeDetailDrawer';
import type { Employee } from '../../../shared/data/employees';

const mockEmployee: Employee = {
  id: 'alex-rivera',
  name: 'Alex Rivera',
  initial: 'AR',
  title: 'Tech Lead',
  team: 'Platform',
  workload: 85,
  activeTasks: 4,
  currentProjects: ['Phoenix launch 2026', 'Ops resilience hardening'],
  skills: ['System design', 'Go', 'Kubernetes'],
  joinedAt: '2022-03-15',
  email: 'alex.rivera@taskforge.io',
  timezone: 'America/Los_Angeles',
  recentActivity: [
    { id: 'ea-1', event: 'completed subtask: Define routing', actor: 'Alex Rivera', at: '2026-04-13T17:00:00Z' }
  ]
};

function renderDrawer(employee: Employee | null, onClose = vi.fn()) {
  return render(
    <MemoryRouter>
      <EmployeeDetailDrawer employee={employee} onClose={onClose} />
    </MemoryRouter>
  );
}

describe('EmployeeDetailDrawer', () => {
  it('renders employee details when employee is provided', () => {
    renderDrawer(mockEmployee);
    expect(screen.getAllByText('Alex Rivera').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('alex.rivera@taskforge.io')).toBeInTheDocument();
    expect(screen.getByText('America/Los_Angeles')).toBeInTheDocument();
  });

  it('renders nothing when employee is null', () => {
    const { container } = renderDrawer(null);
    expect(container.innerHTML).toBe('');
  });

  it('displays projects, skills, and activity', () => {
    renderDrawer(mockEmployee);
    const projectList = screen.getByTestId('project-list');
    expect(projectList.children).toHaveLength(2);
    const skillsList = screen.getByTestId('skills-list');
    expect(skillsList.children).toHaveLength(3);
    const activityList = screen.getByTestId('activity-list');
    expect(activityList.children).toHaveLength(1);
  });

  it('calls onClose when drawer close is triggered', () => {
    const onClose = vi.fn();
    renderDrawer(mockEmployee, onClose);
    fireEvent.click(screen.getByTestId('drawer-close'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders workload bar with correct width', () => {
    renderDrawer(mockEmployee);
    const bar = screen.getByTestId('workload-bar');
    expect(bar).toHaveStyle({ width: '85%' });
  });

  it('shows link to full profile page', () => {
    renderDrawer(mockEmployee);
    const link = screen.getByText('Open full profile');
    expect(link.closest('a')).toHaveAttribute('href', '/teams/alex-rivera');
  });
});
