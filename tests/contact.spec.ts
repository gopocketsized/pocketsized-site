import { test, expect } from '@playwright/test';

test.describe('Contact Section & Form E2E Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Ensure the page loads and scroll smoothly to the contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    await contactSection.scrollIntoViewIfNeeded();
  });

  test('should render section headers and all input fields correctly', async ({ page }) => {
    // Check heading & subtext
    await expect(page.getByRole('heading', { name: "We would love to work with you." })).toBeVisible();
    await expect(page.getByText("Have a project, an idea, or a question?")).toBeVisible();

    // Check form fields
    await expect(page.locator('#firstName')).toBeVisible();
    await expect(page.locator('#lastName')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    
    // Check CTA button
    await expect(page.getByRole('button', { name: 'Submit Inquiry' })).toBeVisible();
  });

  test('should show inline Zod validation errors on invalid form submission', async ({ page }) => {
    // Fill fields with intentionally failing inputs
    await page.locator('#firstName').fill('A'); // < 2 characters
    await page.locator('#lastName').fill('B');  // < 2 characters
    await page.locator('#email').fill('invalid-email-format');
    await page.locator('#message').fill('Short'); // < 10 characters

    await page.getByRole('button', { name: 'Submit Inquiry' }).click();

    // Verify error messages match your Zod schema
    await expect(page.getByText('First name must be at least 2 characters')).toBeVisible();
    await expect(page.getByText('Last name must be at least 2 characters')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    await expect(page.getByText('Message must be at least 10 characters')).toBeVisible();
  });

  test('should trigger silent abort when hidden honeypot field is filled by bot', async ({ page }) => {
    let apiEndpointHit = false;

    // Intercept network requests to /api/contact
    await page.route('/api/contact', async (route) => {
      apiEndpointHit = true;
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    // Populate legitimate fields
    await page.locator('#firstName').fill('Automated');
    await page.locator('#lastName').fill('BotTester');
    await page.locator('#email').fill('bot@example.com');
    await page.locator('#message').fill('Testing the honeypot detection mechanism.');

    // Inject value into the hidden honeypot input
    await page.locator('input[name="user_system_validation"]').fill('spam-bot-value', { force: true });

    await page.getByRole('button', { name: 'Submit Inquiry' }).click();

    // Confirm form execution aborted before making an API call
    expect(apiEndpointHit).toBe(false);
  });

  test('should display success state after successful form transmission', async ({ page }) => {
    // Intercept API call and return mock HTTP 200
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('#firstName').fill('Alex');
    await page.locator('#lastName').fill('Morgan');
    await page.locator('#email').fill('you@example.com');
    await page.locator('#message').fill('We need help building an automated testing pipeline for our site.');

    await page.getByRole('button', { name: 'Submit Inquiry' }).click();

    // Check loading button state briefly
    // Verify success banner appears
    await expect(page.getByText('Inquiry Received.')).toBeVisible();
    await expect(page.getByText('Your info has been sent. We will review the details')).toBeVisible();

    // Confirm inputs are reset back to blank
    await expect(page.locator('#firstName')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
  });

  test('should display error message on server/API failure', async ({ page }) => {
    // Intercept API call and force mock HTTP 500
    await page.route('/api/contact', async (route) => {
      await route.fulfill({ status: 500 });
    });

    await page.locator('#firstName').fill('Alex');
    await page.locator('#lastName').fill('Morgan');
    await page.locator('#email').fill('you@example.com');
    await page.locator('#message').fill('Testing server failure UI state response.');

    await page.getByRole('button', { name: 'Submit Inquiry' }).click();

    // Verify error alert box appears
    await expect(page.getByText('Submission Failed.')).toBeVisible();
    await expect(page.getByText('Something went wrong. Please try again or reach out to us directly.')).toBeVisible();
  });

});