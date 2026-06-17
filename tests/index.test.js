/** @vitest-environment jsdom */
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('public/index.html structure', () => {
  let html;

  beforeAll(() => {
    const filePath = resolve(__dirname, '../public/index.html');
    html = readFileSync(filePath, 'utf-8');
    document.documentElement.innerHTML = html;
  });

  it('has two control buttons with correct labels and ids', () => {
    const snowBtn = document.getElementById('btn-snow');
    const balloonBtn = document.getElementById('btn-balloons');
    expect(snowBtn).toBeTruthy();
    expect(balloonBtn).toBeTruthy();
    expect(snowBtn.getAttribute('aria-label')).toBe('Show snowflakes');
    expect(balloonBtn.getAttribute('aria-label')).toBe('Show balloons');
    expect(snowBtn.textContent.trim()).toBe('Snowflakes');
    expect(balloonBtn.textContent.trim()).toBe('Balloons');
  });

  it('animation area has aria-live and placeholder text', () => {
    const animationArea = document.getElementById('animation-area');
    expect(animationArea).toBeTruthy();
    expect(animationArea.getAttribute('aria-live')).toBe('polite');
    const placeholder = animationArea.querySelector('.placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder.textContent.trim()).toBe(
      'Choose an effect to begin the animation.'
    );
  });

  it('contains exactly two control buttons', () => {
    const buttons = document.querySelectorAll('.control-button');
    expect(buttons.length).toBe(2);
  });

  it('throws when the HTML file is missing', () => {
    const badPath = resolve(__dirname, '../public/nonexistent.html');
    expect(() => readFileSync(badPath, 'utf-8')).toThrow();
  });
});