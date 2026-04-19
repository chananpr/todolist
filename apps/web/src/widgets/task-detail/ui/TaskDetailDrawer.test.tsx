import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import type { Task } from '../../../shared/data/projects';

const mockTask: Task = {
  id: 'test-1',
  projectId: 'proj-1',
  taskCode: 'TST-001',
  title: 'Test task title',
  description: 'A detailed description of the task.',
  status: 'in_progress',
  priority: 'high',
  assignee: { name: 'Alex Rivera', initial: 'AR' },
  dueDate: '2026-06-01',
  subtasks: [
    { id: 'st-1', title: 'First subtask', status: 'done' },
    { id: 'st-2', title: 'Second subtask', status: 'in_progress' },
    { id: 'st-3', title: 'Third subtask', status: 'todo' }
  ],
  comments: [
    {
      id: 'c-1',
      author: { name: 'Mika Chen', initial: 'MC' },
      body: 'Looks good so far',
      createdAt: '2026-04-15T10:00:00Z'
    }
  ],
  activity: [
    { id: 'a-1', event: 'status_changed: todo → in_progress', actor: 'Alex Rivera', at: '2026-04-10T08:00:00Z' }
  ]
};

describe('TaskDetailDrawer', () => {
  it('renders task details when task is provided', () => {
    render(<TaskDetailDrawer task={mockTask} onClose={vi.fn()} />);
    expect(screen.getByText('Test task title')).toBeInTheDocument();
    expect(screen.getByText('TST-001')).toBeInTheDocument();
    expect(screen.getByText('A detailed description of the task.')).toBeInTheDocument();
    expect(screen.getAllByText('Alex Rivera').length).toBeGreaterThanOrEqual(1);
  });

  it('renders nothing when task is null', () => {
    const { container } = render(<TaskDetailDrawer task={null} onClose={vi.fn()} />);
    expect(container.innerHTML).toBe('');
  });

  it('displays subtasks with correct count', () => {
    render(<TaskDetailDrawer task={mockTask} onClose={vi.fn()} />);
    const subtaskList = screen.getByTestId('subtask-list');
    expect(subtaskList.children).toHaveLength(3);
    expect(screen.getByText('1/3')).toBeInTheDocument();
  });

  it('calls onClose when drawer close is triggered', () => {
    const onClose = vi.fn();
    render(<TaskDetailDrawer task={mockTask} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('drawer-close'));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
