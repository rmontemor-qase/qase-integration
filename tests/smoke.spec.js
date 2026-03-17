// @ts-check
import { test, expect } from '@playwright/test';
import { stepDelay } from './helpers.js';

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
});

test.describe('Routing & 404', () => {
  test('Home, Schedule, Team routes load correctly', async ({ page }) => {
    await page.goto('/');
    await stepDelay(page);
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await page.goto('/schedule');
    await stepDelay(page);
    await expect(page.getByTestId('schedule-page')).toBeVisible();
    await page.goto('/team');
    await stepDelay(page);
    await expect(page.getByTestId('team-page')).toBeVisible();
    await stepDelay(page);
  });
});
