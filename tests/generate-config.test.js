import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { resolve } from 'node:path';

describe('scripts/generate-config.mjs', () => {
  let writeFileMock;

  beforeEach(() => {
    // Mock fs/promises.writeFile
    writeFileMock = vi.fn(() => Promise.resolve());
    vi.mock('node:fs/promises', () => ({ writeFile: writeFileMock }));
  });

  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
    // Clean up any env overrides
    delete process.env.SNOW_COLOR;
    delete process.env.SNOW_DURATION;
    delete process.env.SNOW_SIZE;
    delete process.env.BALLOON_COLOR;
    delete process.env.BALLOON_DURATION;
    delete process.env.BALLOON_SPACING;
  });

  it('writes default config when no env variables are set', async () => {
    await import('../scripts/generate-config.mjs');

    const expected = {
      snowflakeColor: '#ffffff',
      snowflakeDuration: 12,
      snowflakeSize: '1.5rem',
      balloonColor: '#ff4d69',
      balloonDuration: 10,
      balloonSpacing: 800
    };

    expect(writeFileMock).toHaveBeenCalledOnce();
    expect(writeFileMock).toHaveBeenCalledWith(
      resolve('public', 'config.json'),
      JSON.stringify(expected, null, 2),
      'utf-8'
    );
  });

  it('writes overridden config when env variables are set', async () => {
    process.env.SNOW_COLOR = '#abc123';
    process.env.SNOW_DURATION = '5';
    process.env.SNOW_SIZE = '2rem';
    process.env.BALLOON_COLOR = '#000000';
    process.env.BALLOON_DURATION = '20';
    process.env.BALLOON_SPACING = '1000';

    await import('../scripts/generate-config.mjs');

    const expected = {
      snowflakeColor: '#abc123',
      snowflakeDuration: 5,
      snowflakeSize: '2rem',
      balloonColor: '#000000',
      balloonDuration: 20,
      balloonSpacing: 1000
    };

    expect(writeFileMock).toHaveBeenCalledOnce();
    expect(writeFileMock).toHaveBeenCalledWith(
      resolve('public', 'config.json'),
      JSON.stringify(expected, null, 2),
      'utf-8'
    );
  });

  it('throws an error when writeFile fails', async () => {
    writeFileMock.mockImplementation(() => { throw new Error('write failure'); });
    await expect(import('../scripts/generate-config.mjs')).rejects.toThrow('write failure');
  });
});