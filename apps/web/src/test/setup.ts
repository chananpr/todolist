import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Unmount React trees and clear the DOM after every test so
// tests stay isolated when run in parallel or in series.
afterEach(() => {
  cleanup();
});
