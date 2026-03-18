// @ts-check
import { test, expect } from '@playwright/test';
import { assertDemo, demoLog, logAssertionError, recordPause } from './helpers.js';

/* ——— Login ——— */
test.describe('Login flow', () => {
  test('Successful login as admin', async ({ page }, testInfo) => {
    await page.goto('/login');
    await recordPause(page);
    demoLog(testInfo, 'admin / password123');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-btn').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\//);
    await expect(page.getByTestId('logged-in-user')).toContainText('admin');
    await recordPause(page);
  });

  test('Successful login as engineer', async ({ page }, testInfo) => {
    await page.goto('/login');
    await recordPause(page);
    demoLog(testInfo, 'engineer / test456');
    await page.getByTestId('username-input').fill('engineer');
    await page.getByTestId('password-input').fill('test456');
    await page.getByTestId('login-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('logged-in-user')).toContainText('engineer');
    await recordPause(page);
  });

  test('Failed login shows Invalid credentials hint', async ({ page }, testInfo) => {
    await page.goto('/login');
    await page.getByTestId('username-input').fill('nope');
    await page.getByTestId('password-input').fill('bad');
    await page.getByTestId('login-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('login-error')).toContainText(/admin|password123|Invalid/i);
    demoLog(testInfo, 'Error banner visible');
    await recordPause(page);
  });

  test('Skip login navigates to home', async ({ page }, testInfo) => {
    await page.goto('/login');
    await page.getByTestId('skip-login-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('hero-section')).toBeVisible();
    demoLog(testInfo, 'Skipped auth');
    await recordPause(page);
  });

  test('Logout removes session from navbar', async ({ page }, testInfo) => {
    await page.goto('/login');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-btn').click();
    await recordPause(page);
    await page.getByTestId('logout-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('nav-login-btn')).toBeVisible();
    await expect(page.getByTestId('logged-in-user')).toHaveCount(0);
    demoLog(testInfo, 'Session cleared');
    await recordPause(page);
  });

  test('Navbar shows Sign In when logged out', async ({ page }, testInfo) => {
    await page.goto('/');
    await recordPause(page);
    await expect(page.getByTestId('nav-login-btn')).toBeVisible();
    demoLog(testInfo, 'Unauthenticated nav');
    await recordPause(page);
  });

});

/* ——— Expo /form ——— */
test.describe('Motorsport Expo registration', () => {
  test('Submit all eight fields shows success summary', async ({ page }, testInfo) => {
    await page.goto('/form');
    await recordPause(page);
    await page.getByTestId('first-name-input').fill('Demo');
    await page.getByTestId('last-name-input').fill('User');
    await page.getByTestId('email-input').fill('demo@velocity.test');
    await page.getByTestId('phone-input').fill('+1 555 0000');
    await page.getByTestId('address-input').fill('VRE HQ');
    await page.getByTestId('city-input').fill('Munich');
    await page.getByTestId('state-input').fill('DE');
    await page.getByTestId('zip-input').fill('BADGE-99');
    await recordPause(page);
    await page.getByTestId('submit-form-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('form-success')).toBeVisible();
    await expect(page.getByTestId('submitted-email')).toContainText('demo@velocity.test');
    demoLog(testInfo, 'Expo success panel');
    await recordPause(page);
  });

  test('Clear form empties all inputs', async ({ page }, testInfo) => {
    await page.goto('/form');
    await page.getByTestId('first-name-input').fill('X');
    await page.getByTestId('last-name-input').fill('Y');
    await page.getByTestId('clear-form-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('first-name-input')).toHaveValue('');
    await expect(page.getByTestId('last-name-input')).toHaveValue('');
    demoLog(testInfo, 'Clear wiped fields');
    await recordPause(page);
  });

  test('Register another returns empty form', async ({ page }, testInfo) => {
    await page.goto('/form');
    await page.getByTestId('first-name-input').fill('A');
    await page.getByTestId('last-name-input').fill('B');
    await page.getByTestId('email-input').fill('a@b.co');
    await page.getByTestId('phone-input').fill('1');
    await page.getByTestId('address-input').fill('c');
    await page.getByTestId('city-input').fill('d');
    await page.getByTestId('state-input').fill('e');
    await page.getByTestId('zip-input').fill('f');
    await page.getByTestId('submit-form-btn').click();
    await recordPause(page);
    await page.getByTestId('reset-form-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('automation-form')).toBeVisible();
    await expect(page.getByTestId('first-name-input')).toHaveValue('');
    demoLog(testInfo, 'Register another');
    await recordPause(page);
  });

  test('Back to Home from Expo', async ({ page }, testInfo) => {
    await page.goto('/form');
    await page.getByTestId('back-home-btn').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\//);
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await recordPause(page);
  });
});

/* ——— Hero ——— */
test.describe('Hero section', () => {
  test('Hero subtitle and section', async ({ page }, testInfo) => {
    await page.goto('/');
    await recordPause(page);
    await expect(page.getByTestId('hero-subtitle')).toHaveText(/Engineering Excellence/i);
    demoLog(testInfo, 'Hero copy');
    await recordPause(page);
  });

  test('Hero CTAs open Timeline then Team', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('start-engine-btn').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\/schedule/);
    await page.goBack();
    await recordPause(page);
    await page.getByTestId('pit-stop-btn').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\/team/);
    await recordPause(page);
  });

  test('Hero race car image', async ({ page }, testInfo) => {
    await page.goto('/');
    const img = page.getByTestId('hero-section').locator('img[alt="Race car engineering prototype"]');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('src', /.+/);
    await recordPause(page);
  });

  test('Expo link in nav bar', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('nav-form-link').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\/form/);
    await recordPause(page);
  });
});

/* ——— Home application form ——— */
test.describe('Home page registration form', () => {
  test('Form controls visible in form section', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('form-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    await expect(page.getByTestId('lap-slider')).toBeVisible();
    await expect(page.getByTestId('agree-checkbox')).toBeVisible();
    demoLog(testInfo, 'Form section scrolled into view');
    await recordPause(page);
  });

  test('Submit disabled until name department and agreement', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('form-section').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('submit-btn')).toBeDisabled();
    await page.getByTestId('driver-input').fill('Name');
    await page.getByTestId('team-select').selectOption({ index: 2 });
    await page.getByTestId('agree-checkbox').check();
    await recordPause(page);
    await expect(page.getByTestId('submit-btn')).toBeEnabled();
    await recordPause(page);
  });

  test('Submit shows Name Department Experience', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('form-section').scrollIntoViewIfNeeded();
    await page.getByTestId('driver-input').fill('Jordan');
    await page.getByTestId('team-select').selectOption({ label: /Powertrain/i });
    await page.getByTestId('lap-slider').fill('5');
    await expect(page.getByTestId('lap-count')).toContainText('5');
    await page.getByTestId('agree-checkbox').check();
    await page.getByTestId('submit-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('submitted-team')).toContainText(/Powertrain/i);
    await expect(page.getByTestId('submitted-laps')).toContainText('5');
    demoLog(testInfo, 'Inline form success');
    await recordPause(page);
  });

});

/* ——— Dashboard counter ——— */
test.describe('Design iteration counter', () => {
  test('Three increments then one decrement', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('counter-value')).toHaveText('0');
    for (let i = 0; i < 3; i++) {
      await page.getByTestId('increment-btn').click();
      await recordPause(page);
    }
    await expect(page.getByTestId('counter-value')).toHaveText('3');
    await page.getByTestId('decrement-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('counter-value')).toHaveText('2');
    await recordPause(page);
  });

  test('Reset counter to zero', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await page.getByTestId('increment-btn').click();
    await page.getByTestId('reset-counter-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('counter-value')).toHaveText('0');
    await recordPause(page);
  });
});

/* ——— DRS and toast ——— */
test.describe('Active aero and diagnostics', () => {
  test('DRS Standby then Engaged then Standby', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('drs-status')).toContainText('Standby');
    await page.getByTestId('drs-toggle').click();
    await recordPause(page);
    await expect(page.getByTestId('drs-status')).toContainText('Engaged');
    await page.getByTestId('drs-toggle').click();
    await recordPause(page);
    await expect(page.getByTestId('drs-status')).toContainText('Standby');
    await recordPause(page);
  });

  test('Run Diagnostic toast then auto dismiss', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await page.getByTestId('toast-btn').click();
    await recordPause(page);
    const t = page.getByTestId('toast-notification');
    await expect(t).toBeVisible();
    await expect(t).toContainText(/nominal|diagnostics|passed/i);
    demoLog(testInfo, 'Toast visible');
    await page.waitForTimeout(3500);
    await expect(t).not.toBeVisible();
    await recordPause(page);
  });
});

/* ——— Session list ——— */
test.describe('Test schedule list', () => {
  test('Default three sessions and labels', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('list-item-0')).toContainText(/Wind Tunnel/i);
    await expect(page.getByTestId('list-item-1')).toContainText(/CFD/i);
    await expect(page.getByTestId('list-item-2')).toContainText(/Dyno/i);
    await expect(page.getByTestId('item-count')).toContainText('3');
    await recordPause(page);
  });

  test('Add session by button and by Enter', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await page.getByTestId('add-item-input').fill('Crash Test');
    await page.getByTestId('add-item-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('list-item-3')).toContainText('Crash Test');
    await page.getByTestId('add-item-input').fill('Tire Test');
    await page.getByTestId('add-item-input').press('Enter');
    await recordPause(page);
    await expect(page.getByText('Tire Test')).toBeVisible();
    await recordPause(page);
  });

  test('Remove item decreases count', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    const before = await page.getByTestId('item-count').textContent();
    await page.getByTestId('remove-item-0').click();
    await recordPause(page);
    const after = await page.getByTestId('item-count').textContent();
    expect(parseInt(String(after), 10)).toBeLessThan(parseInt(String(before), 10));
    await recordPause(page);
  });

  test('Empty input add does not change count', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    const c = await page.getByTestId('item-count').textContent();
    await page.getByTestId('add-item-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('item-count')).toHaveText(c);
    await recordPause(page);
  });
});

/* ——— Telemetry hover ——— */
test.describe('Performance metrics hover', () => {
  test('Hover Downforce and Power cards', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('hover-info')).toContainText('Hover for details');
    await page.getByTestId('telemetry-1').hover();
    await recordPause(page);
    await expect(page.getByTestId('hover-info')).toContainText(/847|Downforce/i);
    await page.getByTestId('telemetry-2').hover();
    await recordPause(page);
    await expect(page.getByTestId('hover-info')).toContainText(/1000|Power/i);
    await recordPause(page);
  });

  test('Hover Weight card', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await page.getByTestId('telemetry-3').hover();
    await recordPause(page);
    await expect(page.getByTestId('hover-info')).toContainText(/798|Weight/i);
    await recordPause(page);
  });

  test('Mouse leave restores placeholder', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await page.getByTestId('telemetry-1').hover();
    await page.mouse.move(0, 0);
    await recordPause(page);
    await expect(page.getByTestId('hover-info')).toContainText('Hover for details');
    await recordPause(page);
  });
});

/* ——— Modal ——— */
test.describe('Engineering Brief modal', () => {
  test('Open modal and Acknowledged closes', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await page.getByTestId('open-modal-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('modal-content')).toContainText(/Aero package revision B3/i);
    await page.getByTestId('close-modal-btn').click();
    await recordPause(page);
    await expect(page.getByTestId('modal-overlay')).not.toBeAttached();
    await recordPause(page);
  });

  test('Overlay click closes modal', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
    await page.getByTestId('open-modal-btn').click();
    await recordPause(page);
    await page.getByTestId('modal-overlay').click({ position: { x: 8, y: 8 } });
    await recordPause(page);
    await expect(page.getByTestId('modal-overlay')).not.toBeAttached();
    await recordPause(page);
  });
});

/* ——— Component registry table ——— */
test.describe('Component registry', () => {
  test('Five rows and count', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    for (let i = 0; i <= 4; i++) {
      await expect(page.getByTestId(`table-row-${i}`)).toBeVisible();
    }
    await expect(page.getByTestId('table-count')).toContainText('5');
    await recordPause(page);
  });

  test('Filter diffuser then clear restores full list', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await page.getByTestId('table-filter').fill('diffuser');
    await recordPause(page);
    await expect(page.getByTestId('table-count')).toContainText('1');
    await page.getByTestId('table-filter').clear();
    await recordPause(page);
    await expect(page.getByTestId('table-count')).toContainText('5');
    await recordPause(page);
  });

  test('Filter Aerodynamics two rows', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await page.getByTestId('table-filter').fill('Aerodynamics');
    await recordPause(page);
    await expect(page.getByTestId('table-count')).toContainText('2');
    await recordPause(page);
  });

  test('Sort by position and by weight', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await page.getByTestId('sort-pos').click();
    await recordPause(page);
    await page.getByTestId('sort-pos').click();
    await recordPause(page);
    await page.getByTestId('sort-points').click();
    await recordPause(page);
    await expect(page.getByTestId('standings-table')).toBeVisible();
    await recordPause(page);
  });

  test('Status badges on visible rows', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await page.getByTestId('table-filter').clear();
    await expect(page.getByTestId('status-0')).toBeVisible();
    await expect(page.getByTestId('driver-name-0')).toBeVisible();
    demoLog(testInfo, 'Registry table OK');
    await recordPause(page);
  });
});

/* ——— Schedule ——— */
test.describe('Development Timeline page', () => {
  test('Schedule title and page shell', async ({ page }, testInfo) => {
    await page.goto('/schedule');
    await recordPause(page);
    await expect(page.getByTestId('schedule-title')).toHaveText(/Development Timeline/i);
    await expect(page.getByTestId('schedule-page')).toBeVisible();
    await recordPause(page);
  });

  test('Eight milestones names and phases', async ({ page }, testInfo) => {
    await page.goto('/schedule');
    for (let i = 0; i <= 7; i++) {
      await expect(page.getByTestId(`race-${i}`)).toBeVisible();
    }
    await expect(page.getByTestId('race-name-0')).toContainText('Concept Design Review');
    await expect(page.getByTestId('race-name-7')).toContainText('Homologation');
    demoLog(testInfo, '8 milestones verified');
    await recordPause(page);
  });

  test('Phase numbers and dates visible', async ({ page }, testInfo) => {
    await page.goto('/schedule');
    await expect(page.getByTestId('race-round-0')).toContainText('01');
    await expect(page.getByTestId('race-date-0')).toBeVisible();
    await recordPause(page);
  });

  test('Completed and Upcoming statuses', async ({ page }, testInfo) => {
    await page.goto('/schedule');
    await expect(page.getByTestId('race-status-0')).toContainText('Completed');
    await expect(page.getByTestId('race-status-4')).toContainText('Upcoming');
    await recordPause(page);
  });

  test('Back to home from schedule', async ({ page }, testInfo) => {
    await page.goto('/schedule');
    await page.getByTestId('back-home-link').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\//);
    await recordPause(page);
  });

  test('Schedule nav to Team', async ({ page }, testInfo) => {
    await page.goto('/schedule');
    await page.getByTestId('nav-team-link').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\/team/);
    await recordPause(page);
  });
});

/* ——— Team ——— */
test.describe('Engineering Team page', () => {
  test('Team title six cards and lead names', async ({ page }, testInfo) => {
    await page.goto('/team');
    await recordPause(page);
    await expect(page.getByTestId('team-title')).toContainText('Engineering Team');
    for (let i = 0; i <= 5; i++) {
      await expect(page.getByTestId(`team-member-${i}`)).toBeVisible();
    }
    await expect(page.getByTestId('member-name-0')).toContainText('Marcus Webb');
    await expect(page.getByTestId('member-name-1')).toContainText('Sofia Chen');
    await recordPause(page);
  });

  test('Technical Director and Chief Aero roles', async ({ page }, testInfo) => {
    await page.goto('/team');
    await expect(page.getByTestId('member-role-2')).toContainText('Technical Director');
    await expect(page.getByTestId('member-role-3')).toContainText(/Aerodynamicist/i);
    await recordPause(page);
  });

  test('Driver numbers only on drivers', async ({ page }, testInfo) => {
    await page.goto('/team');
    await expect(page.getByTestId('member-number-0')).toContainText('07');
    await expect(page.getByTestId('member-number-1')).toContainText('22');
    await expect(page.getByTestId('member-number-2')).toHaveCount(0);
    await recordPause(page);
  });

  test('Bios contain key phrases', async ({ page }, testInfo) => {
    await page.goto('/team');
    await expect(page.getByTestId('member-bio-0')).toContainText(/champion/i);
    await expect(page.getByTestId('member-bio-4')).toContainText(/hybrid|power/i);
    await recordPause(page);
  });

  test('Team back to home', async ({ page }, testInfo) => {
    await page.goto('/team');
    await page.getByTestId('back-home-link').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\//);
    await recordPause(page);
  });

  test('Team nav to Schedule', async ({ page }, testInfo) => {
    await page.goto('/team');
    await page.getByTestId('nav-schedule-link').click();
    await recordPause(page);
    await expect(page).toHaveURL(/\/schedule/);
    await recordPause(page);
  });
});

/* ——— Footer routing E2E ——— */
test.describe('Footer and routing', () => {
  test('Footer branding', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('footer').scrollIntoViewIfNeeded();
    await recordPause(page);
    await expect(page.getByTestId('footer')).toContainText('Velocity Racing Engineering');
    await recordPause(page);
  });

  test('404 unknown path', async ({ page }, testInfo) => {
    await page.goto('/this-page-does-not-exist-404');
    await recordPause(page);
    await expect(page.getByText(/404|not found/i)).toBeVisible({ timeout: 15000 });
    await recordPause(page);
  });

  test('End to end Home Schedule Team Home', async ({ page }, testInfo) => {
    try {
      await page.goto('/');
      await recordPause(page);
      await page.getByTestId('start-engine-btn').click();
      await expect(page.getByTestId('schedule-page')).toBeVisible();
      await recordPause(page);
      await page.getByTestId('nav-team-link').click();
      await expect(page.getByTestId('team-page')).toBeVisible();
      await recordPause(page);
      await page.getByTestId('back-home-link').click();
      await expect(page.getByTestId('hero-section')).toBeVisible();
      demoLog(testInfo, 'Cross-page journey OK');
      await recordPause(page);
    } catch (e) {
      await logAssertionError(testInfo, 'E2E Home→Schedule→Team→Home', e);
      throw e;
    }
  });
});

/**
 * Intentional failure for full regression Qase demo: inventory rule not met by current data.
 */
test.describe('Demo compliance check', () => {
  test('Registry must list Titanium skid block assembly', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByTestId('table-section').scrollIntoViewIfNeeded();
    await recordPause(page);
    demoLog(testInfo, 'Searching registry for Titanium skid block (demo assertion)');
    await page.getByTestId('table-filter').clear();
    await page.getByTestId('table-filter').fill('Titanium skid block');
    await recordPause(page);
    const countText = await page.getByTestId('table-count').textContent();
    const match = countText && /[1-9]/.test(countText.replace(/\D/g, '') || '0');
    assertDemo(
      Boolean(match),
      `Component registry: expected at least one row when filtering for "Titanium skid block assembly" (supplier homologation doc §4.2). table-count shows "${countText}". Add part to registry or update procurement test data.`,
    );
  });
});
