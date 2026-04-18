import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders children when open', () => {
    render(
      <Drawer open onClose={vi.fn()} title="Test">
        <p>Drawer content</p>
      </Drawer>
    );
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Drawer open={false} onClose={vi.fn()} title="Test">
        <p>Drawer content</p>
      </Drawer>
    );
    expect(screen.queryByText('Drawer content')).not.toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Test">
        <p>Content</p>
      </Drawer>
    );
    fireEvent.click(screen.getByTestId('drawer-overlay'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when ESC key is pressed', () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Test">
        <p>Content</p>
      </Drawer>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Test">
        <p>Content</p>
      </Drawer>
    );
    fireEvent.click(screen.getByTestId('drawer-close'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders the title in the header', () => {
    render(
      <Drawer open onClose={vi.fn()} title="Task Details">
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByText('Task Details')).toBeInTheDocument();
  });

  it('has role="dialog" with aria-label', () => {
    render(
      <Drawer open onClose={vi.fn()} title="My Drawer">
        <p>Content</p>
      </Drawer>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'My Drawer');
  });
});
