// @ts-check
import { test, expect } from '@playwright/test';
import { stepDelay } from './helpers.js';

// Smoke tests (same as smoke.spec.js)
test.describe('Hero Section', () => {
  test('Hero section, image, and engineering copy', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(800);
    const hero = page.getByTestId('hero-section');
    await expect(hero).toBeVisible();
    await stepDelay(page);
    await expect(page.getByTestId('hero-subtitle')).toContainText('Engineering Excellence');
    await stepDelay(page);
    const img = hero.locator('img[alt="Race car engineering prototype"]');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('src', /.+/);
    await stepDelay(page);
  });

  test('CTA navigation to Schedule and Team', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(600);
    await page.getByTestId('start-engine-btn').click();
    await stepDelay(page);
    await expect(page).toHaveURL(/\/schedule/);
    await page.waitForTimeout(800);
    await page.goBack();
    await page.waitForTimeout(600);
    await page.getByTestId('pit-stop-btn').click();
    await stepDelay(page);
    await expect(page).toHaveURL(/\/team/);
    await stepDelay(page);
  });
});

test.describe('Form Section', () => {
  test('All fields visible and submit disabled', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.getByTestId('form-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    await expect(page.getByTestId('registration-form')).toBeVisible();
    await expect(page.getByTestId('driver-input')).toBeVisible();
    await expect(page.getByTestId('team-select')).toBeVisible();
    await expect(page.getByTestId('lap-slider')).toBeVisible();
    await expect(page.getByTestId('agree-checkbox')).toBeVisible();
    await expect(page.getByTestId('submit-btn')).toBeVisible();
    await stepDelay(page);
    await expect(page.getByTestId('submit-btn')).toBeDisabled();
    await stepDelay(page);
  });

  test('Fill, slider, submit, success message, and reset', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('form-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    await page.getByTestId('driver-input').fill('Test Driver');
    await stepDelay(page);
    await page.getByTestId('team-select').selectOption({ index: 1 });
    await stepDelay(page);
    const slider = page.getByTestId('lap-slider');
    await slider.fill('10');
    await expect(page.getByTestId('lap-count')).toContainText('10');
    await stepDelay(page);
    await page.getByTestId('agree-checkbox').check();
    await stepDelay(page);
    await expect(page.getByTestId('submit-btn')).toBeEnabled();
    await page.getByTestId('submit-btn').click();
    await stepDelay(page);
    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByTestId('submitted-driver')).toBeVisible();
    await expect(page.getByTestId('submitted-team')).toBeVisible();
    await expect(page.getByTestId('submitted-laps')).toBeVisible();
    await stepDelay(page);
    await page.getByTestId('reset-btn').click();
    await stepDelay(page);
    await expect(page.getByTestId('registration-form')).toBeVisible();
    await expect(page.getByTestId('driver-input')).toHaveValue('');
    await stepDelay(page);
  });
});

test.describe('Design Iteration Counter', () => {
  test('Counter increment, decrement, and reset', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    await expect(page.getByTestId('counter-value')).toHaveText('0');
    await stepDelay(page);
    const btn = page.getByTestId('increment-btn');
    await btn.click();
    await stepDelay(page);
    await btn.click();
    await stepDelay(page);
    await btn.click();
    await expect(page.getByTestId('counter-value')).toHaveText('3');
    await stepDelay(page);
    await page.getByTestId('decrement-btn').click();
    await stepDelay(page);
    await expect(page.getByTestId('counter-value')).toHaveText('2');
    await stepDelay(page);
    await page.getByTestId('reset-counter-btn').click();
    await stepDelay(page);
    await expect(page.getByTestId('counter-value')).toHaveText('0');
    await stepDelay(page);
  });
});

test.describe('Active Aero Toggle', () => {
  test('DRS toggle and toast notification', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    await expect(page.getByTestId('drs-status')).toContainText('Standby');
    await stepDelay(page);
    await page.getByTestId('drs-toggle').click();
    await stepDelay(page);
    await expect(page.getByTestId('drs-status')).toContainText('Engaged');
    await stepDelay(page);
    await page.getByTestId('drs-toggle').click();
    await stepDelay(page);
    await expect(page.getByTestId('drs-status')).toContainText('Standby');
    await stepDelay(page);
    await page.getByTestId('toast-btn').click();
    const toast = page.getByTestId('toast-notification');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(/diagnostic|message|notification/i);
    await stepDelay(page);
    await page.waitForTimeout(3500);
    await expect(toast).not.toBeVisible();
    await stepDelay(page);
  });
});

test.describe('Test Schedule List', () => {
  test('Add item, Enter key, remove item', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    await expect(page.getByTestId('list-item-0')).toContainText(/Wind Tunnel Test/i);
    await expect(page.getByTestId('item-count')).toContainText('3');
    await stepDelay(page);
    await page.getByTestId('add-item-input').fill('Crash Test');
    await page.getByTestId('add-item-btn').click();
    await stepDelay(page);
    await expect(page.getByTestId('list-item-3')).toContainText('Crash Test');
    await expect(page.getByTestId('item-count')).toContainText('4');
    await stepDelay(page);
    await page.getByTestId('add-item-input').fill('Tire Test');
    await page.getByTestId('add-item-input').press('Enter');
    await stepDelay(page);
    await expect(page.getByText('Tire Test')).toBeVisible();
    await stepDelay(page);
    const countBefore = await page.getByTestId('item-count').textContent();
    await page.getByTestId('remove-item-0').click();
    await stepDelay(page);
    const countAfter = await page.getByTestId('item-count').textContent();
    expect(parseInt(countAfter, 10)).toBeLessThan(parseInt(countBefore, 10));
    await stepDelay(page);
  });

  test('Empty add does not change count', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    const countBefore = await page.getByTestId('item-count').textContent();
    await page.getByTestId('add-item-btn').click();
    await stepDelay(page);
    await expect(page.getByTestId('item-count')).toHaveText(countBefore);
    await stepDelay(page);
  });
});

test.describe('Performance Metrics', () => {
  test('Hover states for telemetry cards', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    await expect(page.getByTestId('hover-info')).toContainText('Hover for details');
    await stepDelay(page);
    await page.getByTestId('telemetry-1').hover();
    await stepDelay(page);
    await expect(page.getByTestId('hover-info')).toContainText(/Downforce.*847|847.*kg/i);
    await stepDelay(page);
    await page.getByTestId('telemetry-2').hover();
    await stepDelay(page);
    await expect(page.getByTestId('hover-info')).toContainText(/Power.*1000|1000.*HP/i);
    await stepDelay(page);
    await page.mouse.move(0, 0);
    await stepDelay(page);
    await expect(page.getByTestId('hover-info')).toContainText('Hover for details');
    await stepDelay(page);
  });
});

test.describe('Engineering Brief Modal', () => {
  test('Open, content, close by button and overlay', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    await page.getByTestId('open-modal-btn').click();
    await stepDelay(page);
    await expect(page.getByTestId('modal-overlay')).toBeVisible();
    await expect(page.getByTestId('modal-content')).toBeVisible();
    await expect(page.getByTestId('modal-content')).toContainText(/Aero package revision B3/i);
    await stepDelay(page);
    await page.getByTestId('close-modal-btn').click();
    await stepDelay(page);
    await expect(page.getByTestId('modal-overlay')).not.toBeAttached();
    await stepDelay(page);
    await page.getByTestId('open-modal-btn').click();
    await stepDelay(page);
    await page.getByTestId('modal-overlay').click({ position: { x: 5, y: 5 } });
    await stepDelay(page);
    await expect(page.getByTestId('modal-overlay')).not.toBeAttached();
    await stepDelay(page);
  });
});

test.describe('Component Registry Table', () => {
  test('Table, filter, clear, sort, and status badges', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await stepDelay(page);
    await expect(page.getByTestId('standings-table')).toBeVisible();
    for (let i = 0; i <= 4; i++) await expect(page.getByTestId(`table-row-${i}`)).toBeVisible();
    await expect(page.getByTestId('table-count')).toContainText('5');
    await stepDelay(page);
    await page.getByTestId('table-filter').fill('diffuser');
    await stepDelay(page);
    await expect(page.getByTestId('table-count')).toContainText('1');
    await stepDelay(page);
    await page.getByTestId('table-filter').fill('Aerodynamics');
    await stepDelay(page);
    await expect(page.getByTestId('table-count')).toContainText('2');
    await stepDelay(page);
    await page.getByTestId('table-filter').clear();
    await stepDelay(page);
    await expect(page.getByTestId('table-count')).toContainText('5');
    await stepDelay(page);
    await page.getByTestId('sort-pos').click();
    await stepDelay(page);
    await page.getByTestId('sort-points').click();
    await stepDelay(page);
    await expect(page.getByTestId('status-0')).toContainText('Validated');
    await expect(page.getByTestId('status-1')).toContainText('Testing');
    await expect(page.getByTestId('status-4')).toContainText('Revision');
    await stepDelay(page);
  });
});

test.describe('Development Timeline Page', () => {
  test('Page, milestones, names, statuses, nav links', async ({ page }) => {
    await page.goto('/schedule');
    await stepDelay(page);
    await expect(page.getByTestId('schedule-page')).toBeVisible();
    await expect(page.getByTestId('schedule-title')).toContainText('Development Timeline');
    await stepDelay(page);
    for (let i = 0; i <= 7; i++) await expect(page.getByTestId(`race-${i}`)).toBeVisible();
    await stepDelay(page);
    await expect(page.getByTestId('race-name-0')).toContainText('Concept Design Review');
    await expect(page.getByTestId('race-name-7')).toContainText('Homologation Sign-Off');
    await stepDelay(page);
    await expect(page.getByTestId('race-status-0')).toContainText('Completed');
    await expect(page.getByTestId('race-status-3')).toContainText('Upcoming');
    await stepDelay(page);
    await expect(page.getByTestId('back-home-link')).toHaveAttribute('href', /\//);
    await expect(page.getByTestId('nav-team-link')).toHaveAttribute('href', /\/team/);
    await stepDelay(page);
  });

  test('Back home and Team link from schedule', async ({ page }) => {
    await page.goto('/schedule');
    await stepDelay(page);
    await page.getByTestId('back-home-link').click();
    await expect(page).toHaveURL(/\//);
    await stepDelay(page);
    await page.goto('/schedule');
    await page.getByTestId('nav-team-link').click();
    await expect(page).toHaveURL(/\/team/);
    await stepDelay(page);
  });
});

test.describe('Engineering Team Page', () => {
  test('Page, members, names, roles, numbers, bios, nav', async ({ page }) => {
    await page.goto('/team');
    await stepDelay(page);
    await expect(page.getByTestId('team-page')).toBeVisible();
    await expect(page.getByTestId('team-title')).toContainText('Engineering Team');
    await stepDelay(page);
    for (let i = 0; i <= 5; i++) await expect(page.getByTestId(`team-member-${i}`)).toBeVisible();
    await stepDelay(page);
    await expect(page.getByTestId('member-name-0')).toContainText('Marcus Webb');
    await expect(page.getByTestId('member-name-1')).toContainText('Sofia Chen');
    await stepDelay(page);
    await expect(page.getByTestId('member-role-0')).toContainText('Lead Driver');
    await expect(page.getByTestId('member-role-2')).toContainText('Technical Director');
    await expect(page.getByTestId('member-number-0')).toContainText('07');
    await expect(page.getByTestId('member-number-1')).toContainText('22');
    await expect(page.getByTestId('member-number-2')).toHaveCount(0);
    await stepDelay(page);
    await expect(page.getByTestId('member-bio-0')).toContainText('Three-time champion');
    await stepDelay(page);
    await expect(page.getByTestId('back-home-link')).toHaveAttribute('href', /\//);
    await expect(page.getByTestId('nav-schedule-link')).toHaveAttribute('href', /\/schedule/);
    await stepDelay(page);
  });

  test('Back home and Schedule link from team', async ({ page }) => {
    await page.goto('/team');
    await stepDelay(page);
    await page.getByTestId('back-home-link').click();
    await expect(page).toHaveURL(/\//);
    await stepDelay(page);
    await page.goto('/team');
    await page.getByTestId('nav-schedule-link').click();
    await expect(page).toHaveURL(/\/schedule/);
    await stepDelay(page);
  });
});

test.describe('Demo regression failure', () => {
  test('Intentional failure for regression demo', async () => {
    expect(1).toBe(2);
  });
});
