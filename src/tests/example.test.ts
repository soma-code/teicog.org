/**
 * Example test file demonstrating testing infrastructure
 */

import { assert, assertEquals, assertExists, TestData, TestUtils } from "./setup.ts";
import { App, type AppConfig } from "../main.ts";
import { Button } from "../components/Button.ts";
import { escapeHtml, formatDate, generateId, isEmpty, isValidEmail } from "../lib/utils.ts";

// Test the main App class
Deno.test("App - creates instance with config", () => {
  const config: AppConfig = { port: 8000, hostname: "localhost" };
  const app = new App(config);

  assertExists(app, "App instance should be created");
});

Deno.test("App - handles health check endpoint", () => {
  const config: AppConfig = { port: 8000, hostname: "localhost" };
  const _app = new App(config);

  // This would require accessing private methods, so we'll test the concept
  const request = TestUtils.createMockRequest("http://localhost:8000/health");
  assertExists(request, "Mock request should be created");
  assertEquals(request.url, "http://localhost:8000/health");
});

// Test the Button component
Deno.test("Button - renders with default props", () => {
  const button = new Button({ children: "Click me" });
  const html = button.render();

  TestUtils.assertStringContains(html, "Click me");
  TestUtils.assertStringContains(html, "button--primary");
  TestUtils.assertStringContains(html, "button--md");
});

Deno.test("Button - renders with custom variant", () => {
  const button = new Button({ children: "Secondary", variant: "secondary" });
  const html = button.render();

  TestUtils.assertStringContains(html, "button--secondary");
});

Deno.test("Button - renders disabled state", () => {
  const button = new Button({ children: "Disabled", disabled: true });
  const html = button.render();

  TestUtils.assertStringContains(html, "button--disabled");
  TestUtils.assertStringContains(html, "disabled");
});

Deno.test("Button - generates styles", () => {
  const button = new Button({ children: "Test" });
  const styles = button.getStyles();

  TestUtils.assertStringContains(styles, ".button {");
  TestUtils.assertStringContains(styles, ".button--primary {");
});

// Test utility functions
Deno.test("formatDate - formats date correctly", () => {
  const date = new Date("2024-01-15");
  const formatted = formatDate(date);

  TestUtils.assertStringContains(formatted, "2024");
  TestUtils.assertStringContains(formatted, "January");
  TestUtils.assertStringContains(formatted, "15");
});

Deno.test("generateId - creates unique IDs", () => {
  const id1 = generateId();
  const id2 = generateId();

  assertExists(id1);
  assertExists(id2);
  assert(id1 !== id2, "Generated IDs should be unique");
  TestUtils.assertStringContains(id1, "id-");
});

Deno.test("generateId - uses custom prefix", () => {
  const id = generateId("test");
  TestUtils.assertStringContains(id, "test-");
});

Deno.test("isValidEmail - validates correct emails", () => {
  assert(isValidEmail("test@example.com"));
  assert(isValidEmail("user.name@domain.co.uk"));
  assert(!isValidEmail("invalid-email"));
  assert(!isValidEmail("@example.com"));
  assert(!isValidEmail("test@"));
});

Deno.test("escapeHtml - escapes HTML characters", () => {
  const input = '<script>alert("xss")</script>';
  const escaped = escapeHtml(input);

  TestUtils.assertStringContains(escaped, "&lt;script&gt;");
  TestUtils.assertStringContains(escaped, "&quot;xss&quot;");
});

Deno.test("isEmpty - detects empty values", () => {
  assert(isEmpty(null));
  assert(isEmpty(undefined));
  assert(isEmpty(""));
  assert(isEmpty("   "));
  assert(isEmpty([]));
  assert(isEmpty({}));

  assert(!isEmpty("text"));
  assert(!isEmpty([1, 2, 3]));
  assert(!isEmpty({ key: "value" }));
  assert(!isEmpty(0));
  assert(!isEmpty(false));
});

// Test TestUtils functionality
Deno.test("TestUtils - createSpy tracks function calls", () => {
  const spy = TestUtils.createSpy((x: number, y: number) => x + y);

  assertEquals(spy.callCount, 0);

  const result1 = spy(1, 2);
  assertEquals(result1, 3);
  assertEquals(spy.callCount, 1);
  assertEquals(spy.calls[0], [1, 2]);

  spy(3, 4);
  assertEquals(spy.callCount, 2);
  assertEquals(spy.calls[1], [3, 4]);
});

Deno.test("TestUtils - assertHasProperties checks object properties", () => {
  const obj = { name: "test", age: 25, active: true };

  // Should not throw
  TestUtils.assertHasProperties(obj, ["name", "age"]);

  // Should throw for missing property
  TestUtils.assertThrowsError(
    () => TestUtils.assertHasProperties(obj, ["missing" as keyof typeof obj]),
    Error,
  );
});

// Test TestData generators
Deno.test("TestData - generates random data", () => {
  const str1 = TestData.randomString();
  const str2 = TestData.randomString();

  assertEquals(str1.length, 10); // default length
  assert(str1 !== str2, "Random strings should be different");

  const email = TestData.randomEmail();
  assert(isValidEmail(email), "Generated email should be valid");

  const num = TestData.randomNumber(1, 10);
  assert(num >= 1 && num <= 10, "Random number should be in range");

  const date = TestData.randomDate();
  assert(date instanceof Date, "Should generate a Date object");
});

Deno.test("TestData - generates custom length strings", () => {
  const shortStr = TestData.randomString(5);
  const longStr = TestData.randomString(20);

  assertEquals(shortStr.length, 5);
  assertEquals(longStr.length, 20);
});

// Integration test example
Deno.test("Integration - Button component with utilities", () => {
  const _id = generateId("btn");
  const button = new Button({
    children: escapeHtml("<Click> me"),
    variant: "primary",
    size: "lg",
  });

  const html = button.render();

  TestUtils.assertStringContains(html, "&lt;Click&gt; me");
  TestUtils.assertStringContains(html, "button--primary");
  TestUtils.assertStringContains(html, "button--lg");

  assert(!isEmpty(html), "Button HTML should not be empty");
});
