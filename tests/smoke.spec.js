// @ts-check
import { test, expect } from '@playwright/test';
import { demoLog, recordPause } from './helpers.js';

test.describe('Smoke', () => {
  test('Home loads with hero and engineering headline', async ({ page }, testInfo) => {
    await test.step('Open Test Track Express home', async () => {
      demoLog(testInfo, 'Navigating to / for smoke check');
      await page.goto('/');
      await recordPause(page);
    });
    await test.step('Verify hero is visible on recording', async () => {
      await expect(page.getByTestId('hero-section')).toBeVisible();
      await expect(page.getByTestId('nav-bar')).toContainText('Test Track Express');
      await expect(page.getByTestId('hero-subtitle')).toContainText('Engineering Excellence');
      demoLog(testInfo, 'Nav brand, hero section and subtitle OK');
      await recordPause(page);
    });
  });

  test('Open Development Timeline from home CTA', async ({ page }, testInfo) => {
    await test.step('Load home', async () => {
      await page.goto('/');
      await recordPause(page);
    });
    await test.step('Click Development Timeline (visible navigation)', async () => {
      demoLog(testInfo, 'Clicking start-engine-btn → Timeline');
      await page.getByTestId('start-engine-btn').click();
      await recordPause(page);
    });
    await test.step('Confirm schedule page', async () => {
      await expect(page).toHaveURL(/\/schedule/);
      await expect(page.getByTestId('schedule-page')).toBeVisible();
      await expect(page.getByTestId('schedule-title')).toContainText('Development Timeline');
      demoLog(testInfo, 'Schedule page loaded');
      await recordPause(page);
    });
  });

  test('Open Engineering Team from home CTA', async ({ page }, testInfo) => {
    await test.step('Load home', async () => {
      await page.goto('/');
      await recordPause(page);
    });
    await test.step('Click Engineering Team', async () => {
      demoLog(testInfo, 'Clicking pit-stop-btn → Team');
      await page.getByTestId('pit-stop-btn').click();
      await recordPause(page);
    });
    await test.step('Confirm team page', async () => {
      await expect(page).toHaveURL(/\/team/);
      await expect(page.getByTestId('team-page')).toBeVisible();
      await expect(page.getByTestId('team-title')).toContainText('Engineering Team');
      demoLog(testInfo, 'Team page loaded');
      await recordPause(page);
    });
  });

  test('Home Engineering Dashboard widgets are visible', async ({ page }, testInfo) => {
    await test.step('Load home', async () => {
      await page.goto('/');
      await recordPause(page);
    });
    await test.step('Scroll to Engineering Dashboard', async () => {
      demoLog(testInfo, 'Scrolling to interactive-section');
      await page.getByTestId('interactive-section').scrollIntoViewIfNeeded();
      await recordPause(page);
    });
    await test.step('Dashboard headline and key controls for recording', async () => {
      await expect(page.getByTestId('interactive-section')).toContainText(
        'Engineering Dashboard',
      );
      await expect(page.getByTestId('counter-value')).toBeVisible();
      await expect(page.getByTestId('increment-btn')).toBeVisible();
      await expect(page.getByTestId('drs-toggle')).toBeVisible();
      demoLog(testInfo, 'Counter and Active Aero controls visible');
      await recordPause(page);
    });
  });

  test('Login screen reachable and skip returns to home', async ({ page }, testInfo) => {
    await test.step('Open Sign In', async () => {
      await page.goto('/');
      await recordPause(page);
      demoLog(testInfo, 'Opening /login');
      await page.goto('/login');
      await recordPause(page);
    });
    await test.step('Login page visible then skip', async () => {
      await expect(page.getByTestId('login-page')).toBeVisible();
      await expect(page.getByTestId('username-input')).toBeVisible();
      demoLog(testInfo, 'Clicking Skip login');
      await page.getByTestId('skip-login-btn').click();
      await recordPause(page);
    });
    await test.step('Back on home', async () => {
      await expect(page).toHaveURL(/\//);
      await expect(page.getByTestId('hero-section')).toBeVisible();
      demoLog(testInfo, 'Skip login returned to home');
      await recordPause(page);
    });
  });

  test('Expo registration route loads from app', async ({ page }, testInfo) => {
    await test.step('Navigate to Expo form', async () => {
      await page.goto('/');
      await recordPause(page);
      demoLog(testInfo, 'Following Expo nav to /form');
      await page.getByTestId('nav-form-link').click();
      await recordPause(page);
    });
    await test.step('Expo page and Register button visible', async () => {
      await expect(page).toHaveURL(/\/form/);
      await expect(page.getByTestId('automation-form-page')).toBeVisible();
      await expect(page.getByTestId('submit-form-btn')).toBeVisible();
      demoLog(testInfo, 'Expo registration page OK');
      await recordPause(page);
    });
  });
});
