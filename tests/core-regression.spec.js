// @ts-check
import { test, expect } from '@playwright/test';
import {
  assertDemo,
  demoLog,
  logAssertionError,
  recordPause,
} from './helpers.js';

test.describe('Login', () => {
  test('Admin login redirects to home with signed-in state', async ({ page }, testInfo) => {
    try {
      await test.step('Open login', async () => {
        await page.goto('/login');
        demoLog(testInfo, 'Login page opened');
        await recordPause(page);
      });
      await test.step('Enter admin credentials and submit', async () => {
        await page.getByTestId('username-input').fill('admin');
        await recordPause(page);
        await page.getByTestId('password-input').fill('password123');
        await recordPause(page);
        await page.getByTestId('login-btn').click();
        demoLog(testInfo, 'Submitted admin / password123');
        await recordPause(page);
      });
      await test.step('Home shows signed-in user', async () => {
        await expect(page).toHaveURL(/\//);
        await expect(page.getByTestId('logged-in-user')).toContainText('admin');
        demoLog(testInfo, 'Logged in as admin visible');
        await recordPause(page);
      });
    } catch (e) {
      await logAssertionError(
        testInfo,
        'Admin login flow: credentials, redirect, or logged-in-user banner',
        e,
      );
      throw e;
    }
  });

  test('Invalid credentials show error message', async ({ page }, testInfo) => {
    await page.goto('/login');
    await recordPause(page);
    demoLog(testInfo, 'Trying wrong user/password');
    await page.getByTestId('username-input').fill('wrong');
    await page.getByTestId('password-input').fill('wrong');
    await page.getByTestId('login-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page.getByTestId('login-error')).toContainText(/Invalid credentials/i);
    demoLog(testInfo, 'login-error displayed as expected');
    await recordPause(page);
  });

  test('Skip login reaches home without session', async ({ page }, testInfo) => {
    await page.goto('/login');
    await recordPause(page);
    demoLog(testInfo, 'Skip login');
    await page.getByTestId('skip-login-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('nav-login-btn')).toBeVisible();
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await recordPause(page);
  });

  test('Logout shows Sign In again', async ({ page }, testInfo) => {
    await page.goto('/login');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-btn').click();
    await recordPause(page);
    demoLog(testInfo, 'Signing out');
    await page.getByTestId('logout-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('nav-login-btn')).toBeVisible();
    await expect(page.getByTestId('logout-btn')).toHaveCount(0);
    demoLog(testInfo, 'Logged out; nav-login visible');
    await recordPause(page);
  });
});

test.describe('Hero and navigation', () => {
  test('Hero image and Engineering Excellence copy', async ({ page }, testInfo) => {
    await page.goto('/');
    await recordPause(page);
    const hero = page.getByTestId('hero-section');
    await expect(hero).toBeVisible();
    demoLog(testInfo, 'Checking hero image src');
    const img = hero.locator('img[alt="Race car engineering prototype"]');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('src', /.+/);
    await recordPause(page);
  });

  test('Timeline and Team CTAs navigate correctly', async ({ page }, testInfo) => {
    await page.goto('/');
    await recordPause(page);
    await test.step('Development Timeline', async () => {
      demoLog(testInfo, 'CTA: Development Timeline');
      await page.getByTestId('start-engine-btn').click();
      await recordPause(page);
      await expect(page).toHaveURL(/\/schedule/);
    });
    await page.goBack();
    await recordPause(page);
    await test.step('Engineering Team', async () => {
      demoLog(testInfo, 'CTA: Engineering Team');
      await page.getByTestId('pit-stop-btn').click();
      await recordPause(page);
      await expect(page).toHaveURL(/\/team/);
    });
    await recordPause(page);
  });

  test('Nav bar Expo link opens registration form page', async ({ page }, testInfo) => {
    await page.goto('/');
    await recordPause(page);
    demoLog(testInfo, 'Click nav-form-link');
    await page.getByTestId('nav-form-link').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\/form/);
    await expect(page.getByTestId('automation-form-page')).toBeVisible();
    await recordPause(page);
  });
});

test.describe('Home content surface', () => {
  test('Component registry and default session list on home', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    demoLog(testInfo, 'Checking component registry on home');
    await expect(page.getByTestId('standings-table')).toBeVisible();
    await expect(page.getByTestId('table-count')).toContainText('5');
    await expect(page.getByTestId('driver-name-0')).toBeVisible();
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    await expect(page.getByTestId('list-item-0')).toContainText(/Wind Tunnel/i);
    await expect(page.getByTestId('item-count')).toContainText('3');
    demoLog(testInfo, 'Default test sessions list visible');
    await recordPause(page);
  });
});

test.describe('Engineering dashboard', () => {
  test('Design iteration counter increment decrement reset', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    demoLog(testInfo, 'Counter starts at 0');
    await expect(page.getByTestId('counter-value')).toHaveText('0');
    const inc = page.getByTestId('increment-btn');
    await inc.click();
    await recordPause(page);
    await inc.click();
    await recordPause(page);
    await inc.click();
    await recordPause(page);
    await expect(page.getByTestId('counter-value')).toHaveText('3');
    demoLog(testInfo, 'After +++ value is 3');
    await page.getByTestId('decrement-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('counter-value')).toHaveText('2');
    await page.getByTestId('reset-counter-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('counter-value')).toHaveText('0');
    demoLog(testInfo, 'Counter reset to 0');
    await recordPause(page);
  });

  test('Active Aero toggle and Run Diagnostic toast', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    await expect(page.getByTestId('drs-status')).toContainText('Standby');
    demoLog(testInfo, 'Toggling DRS on');
    await page.getByTestId('drs-toggle').click();
    await recordPause(page);
    await expect(page.getByTestId('drs-status')).toContainText('Engaged');
    await page.getByTestId('drs-toggle').click();
    await recordPause(page);
    await expect(page.getByTestId('drs-status')).toContainText('Standby');
    demoLog(testInfo, 'Run Diagnostic');
    await page.getByTestId('toast-btn').click();
    const toast = page.getByTestId('toast-notification');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(/nominal|diagnostic|passed/i);
    await recordPause(page);
    await page.waitForTimeout(3500);
    await expect(toast).not.toBeVisible();
    await recordPause(page);
  });

  test('Test session list add remove and empty add ignored', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    await expect(page.getByTestId('item-count')).toContainText('3');
    demoLog(testInfo, 'Adding Crash Test session');
    await page.getByTestId('add-item-input').fill('Crash Test');
    await page.getByTestId('add-item-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('list-item-3')).toContainText('Crash Test');
    const before = await page.getByTestId('item-count').textContent();
    await page.getByTestId('remove-item-0').click();
    await recordPause(page);
    const after = await page.getByTestId('item-count').textContent();
    expect(parseInt(String(after), 10)).toBeLessThan(parseInt(String(before), 10));
    demoLog(testInfo, 'Empty add should not increase count');
    await page.getByTestId('add-item-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('item-count')).toHaveText(after);
    await recordPause(page);
  });

  test('Telemetry hover cards update hover-info', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    await expect(page.getByTestId('hover-info')).toContainText('Hover for details');
    demoLog(testInfo, 'Hover Downforce card');
    await page.getByTestId('telemetry-1').hover();
    await recordPause(page);
    await expect(page.getByTestId('hover-info')).toContainText(/847|Downforce/i);
    await page.getByTestId('telemetry-3').hover();
    await recordPause(page);
    await expect(page.getByTestId('hover-info')).toContainText(/798|Weight/i);
    await page.mouse.move(0, 0);
    await recordPause(page);
    await expect(page.getByTestId('hover-info')).toContainText('Hover for details');
    await recordPause(page);
  });

  test('Engineering Brief modal open acknowledge and overlay close', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    demoLog(testInfo, 'Open Engineering Brief');
    await page.getByTestId('open-modal-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('modal-content')).toContainText(/Aero package revision B3/i);
    await page.getByTestId('close-modal-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('modal-overlay')).not.toBeAttached();
    await page.getByTestId('open-modal-btn').click();
    await recordPause(page);
    await page.getByTestId('modal-overlay').click({ position: { x: 5, y: 5 } });
    await recordPause(page);
    await expect(page.getByTestId('modal-overlay')).not.toBeAttached();
    await recordPause(page);
  });
});

test.describe('Component registry', () => {
  test('Filter sort and status badges', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    demoLog(testInfo, 'Filter diffuser');
    await page.getByTestId('table-filter').fill('diffuser');
    await recordPause(page);
    await expect(page.getByTestId('table-count')).toContainText('1');
    await page.getByTestId('table-filter').clear();
    await recordPause(page);
    await expect(page.getByTestId('table-count')).toContainText('5');
    await page.getByTestId('sort-pos').click();
    await page.getByTestId('sort-points').click();
    await recordPause(page);
    await expect(page.getByTestId('status-0')).toContainText(/Validated|Testing|Development|Revision/);
    demoLog(testInfo, 'Table interactions complete');
    await recordPause(page);
  });
});

test.describe('Schedule and Team', () => {
  test('Development Timeline eight milestones and navigation', async ({ page }, testInfo) => {
    await page.goto('/schedule');
    await recordPause(page);
    demoLog(testInfo, 'Verifying 8 milestone rows');
    for (let i = 0; i <= 7; i++) {
      await expect(page.getByTestId(`race-${i}`)).toBeVisible();
    }
    await expect(page.getByTestId('race-name-0')).toContainText('Concept Design Review');
    await expect(page.getByTestId('race-status-0')).toContainText('Completed');
    await page.getByTestId('back-home-link').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\//);
    await recordPause(page);
  });

  test('Engineering Team cards and cross-links', async ({ page }, testInfo) => {
    await page.goto('/team');
    await recordPause(page);
    for (let i = 0; i <= 5; i++) {
      await expect(page.getByTestId(`team-member-${i}`)).toBeVisible();
    }
    demoLog(testInfo, 'Driver numbers on race engineers');
    await expect(page.getByTestId('member-number-0')).toContainText('07');
    await expect(page.getByTestId('member-number-2')).toHaveCount(0);
    await page.getByTestId('nav-schedule-link').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\/schedule/);
    await recordPause(page);
  });
});

test.describe('Expo registration form', () => {
  test('Full register clear and register another', async ({ page }, testInfo) => {
    await page.goto('/form');
    await recordPause(page);
    demoLog(testInfo, 'Filling all 8 Expo fields');
    await page.getByTestId('first-name-input').fill('Alex');
    await page.getByTestId('last-name-input').fill('Rivera');
    await page.getByTestId('email-input').fill('alex@motorsport.com');
    await page.getByTestId('phone-input').fill('+1 555 123 4567');
    await page.getByTestId('address-input').fill('Test Track Express');
    await page.getByTestId('city-input').fill('Stuttgart');
    await page.getByTestId('state-input').fill('Germany');
    await page.getByTestId('zip-input').fill('ENG-0042');
    await recordPause(page);
    await page.getByTestId('submit-form-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('form-success')).toBeVisible();
    await expect(page.getByTestId('submitted-firstName')).toContainText('Alex');
    demoLog(testInfo, 'Register another attendee');
    await page.getByTestId('reset-form-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('automation-form')).toBeVisible();
    await page.getByTestId('first-name-input').fill('Temp');
    await page.getByTestId('clear-form-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('first-name-input')).toHaveValue('');
    await recordPause(page);
  });
});

test.describe('Routing', () => {
  test('Not found route shows 404 content', async ({ page }, testInfo) => {
    await page.goto('/nonexistent-route-smoke');
    await recordPause(page);
    demoLog(testInfo, 'Expecting 404 or not found copy');
    await expect(page.getByText(/404|not found|page not found/i)).toBeVisible({
      timeout: 15000,
    });
    await recordPause(page);
  });
});

test.describe('Footer and demo defect', () => {
  test('Footer shows copyright notice', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('footer').scrollIntoViewIfNeeded();
    await recordPause(page);
    await expect(page.getByTestId('footer')).toContainText(/©|All rights reserved/i);
    demoLog(testInfo, 'Footer copyright line OK');
    await recordPause(page);
  });

  /**
   * Intentional failure for Qase demo: explicit message explains expected vs actual.
   * Remove or fix when the product matches the asserted roadmap rule.
   */
  test('Roadmap must list nine engineering phases', async ({ page }, testInfo) => {
    await page.goto('/schedule');
    await recordPause(page);
    demoLog(testInfo, 'Checking FY2026 phase count (demo assertion)');
    const rows = page.locator('[data-testid^="race-"]');
    const n = await rows.count();
    assertDemo(
      n === 9,
      `Development Timeline phase count: expected exactly 9 milestones for FY2026 homologation roadmap; UI shows ${n} rows (race-0..race-${n - 1}). Update schedule data or this test when scope is finalized.`,
    );
  });
});
