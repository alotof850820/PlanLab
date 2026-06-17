import { chromium } from '@playwright/test'

const baseUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:3000'

const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL ?? 'msedge',
  headless: true,
})

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

const fail = async (message) => {
  await browser.close()
  throw new Error(message)
}

const setRangeValue = async (locator, value) => {
  await locator.evaluate((input, nextValue) => {
    input.value = String(nextValue)
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }, value)
}

await page.goto(new URL('/', baseUrl).toString(), { waitUntil: 'networkidle' })

const startPlanning = page.locator('[data-transition="landing-to-dashboard"]').first()
await startPlanning.waitFor({ state: 'visible' })
await startPlanning.click({ noWaitAfter: true })
await page.locator('.landing-page.is-exiting').waitFor({ state: 'visible', timeout: 800 })
await page.waitForURL(/\/dashboard$/, { timeout: 3000 })

await page.locator('[data-shell-animation="staggered"]').waitFor({ state: 'visible' })
await page.locator('main[data-page-transition="fade-slide"]').waitFor({ state: 'visible' })

await page.goto(new URL('/stocks', baseUrl).toString(), { waitUntil: 'networkidle' })

const stockDetailCard = page.locator('[data-impact-card="stock-detail"]')
await stockDetailCard.waitFor({ state: 'visible' })

const returnRate = page
  .locator('label.range-field')
  .filter({ hasText: '年化報酬' })
  .locator('input[type="range"]')
await setRangeValue(returnRate, 15)
await page.locator('[data-impact-card="stock-detail"].is-changing').waitFor({ state: 'visible' })

await page.goto(new URL('/house', baseUrl).toString(), { waitUntil: 'networkidle' })
await page.getByLabel('啟用買房規劃').check()

const houseYear = page
  .locator('label.range-field')
  .filter({ hasText: '買房' })
  .locator('input[type="range"]')
await setRangeValue(houseYear, 10)

await page.getByRole('link', { name: /明細/ }).click()

const eventRow = page.locator('tr[data-event-row="house-purchase"][data-event-year="10"]')
await eventRow.waitFor({ state: 'visible' })

const rowClass = await eventRow.getAttribute('class')
if (!rowClass?.includes('is-event-row')) {
  await fail(`Expected house purchase row to include is-event-row class, got: ${rowClass}`)
}

await eventRow.getByText('買房事件', { exact: false }).waitFor({ state: 'visible' })

await browser.close()
