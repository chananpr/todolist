import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plus } from 'lucide-react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children and forwards click events', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const btn = screen.getByRole('button', { name: 'Save' });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies the primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary-600');
  });

  it('switches variant classes based on the variant prop', () => {
    render(
      <>
        <Button variant="secondary">Sec</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </>
    );
    expect(screen.getByRole('button', { name: 'Sec' })).toHaveClass('border-primary-200');
    expect(screen.getByRole('button', { name: 'Ghost' })).toHaveClass('text-primary-600');
    expect(screen.getByRole('button', { name: 'Danger' })).toHaveClass('bg-rose-600');
  });

  it('applies size classes (h-8 / h-10 / h-12)', () => {
    render(
      <>
        <Button size="sm">sm</Button>
        <Button size="md">md</Button>
        <Button size="lg">lg</Button>
      </>
    );
    expect(screen.getByRole('button', { name: 'sm' })).toHaveClass('h-8');
    expect(screen.getByRole('button', { name: 'md' })).toHaveClass('h-10');
    expect(screen.getByRole('button', { name: 'lg' })).toHaveClass('h-12');
  });

  it('renders an icon via the icon prop', () => {
    render(<Button icon={Plus}>Add</Button>);
    const btn = screen.getByRole('button', { name: 'Add' });
    expect(btn.querySelector('svg')).not.toBeNull();
  });

  it('disables the button while loading and swaps the label', () => {
    render(<Button loading>Save</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).not.toHaveTextContent('Save');
  });

  it('respects the disabled prop and blocks clicks', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('preserves user-supplied className alongside variant classes', () => {
    render(<Button className="custom-class">Btn</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('bg-primary-600');
  });
});
