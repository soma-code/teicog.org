/**
 * Test setup and utilities for teicog.org
 */

import {
  assert,
  assertEquals,
  assertExists,
  assertRejects,
  assertThrows,
} from "https://deno.land/std@0.220.0/assert/mod.ts";

// Re-export assertion functions for convenience
export { assert, assertEquals, assertExists, assertRejects, assertThrows };

/**
 * Test utilities and helpers
 */
export class TestUtils {
  /**
   * Creates a mock Request object for testing HTTP handlers
   */
  static createMockRequest(
    url: string,
    options: RequestInit = {},
  ): Request {
    return new Request(url, {
      method: "GET",
      ...options,
    });
  }

  /**
   * Creates a mock Response object for testing
   */
  static createMockResponse(
    body: string,
    options: ResponseInit = {},
  ): Response {
    return new Response(body, {
      status: 200,
      headers: { "content-type": "text/plain" },
      ...options,
    });
  }

  /**
   * Waits for a specified amount of time (useful for testing async operations)
   */
  static wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Creates a spy function that tracks calls
   */
  static createSpy<T extends (...args: unknown[]) => unknown>(
    implementation?: T,
  ): T & { calls: Parameters<T>[]; callCount: number } {
    const calls: Parameters<T>[] = [];

    const spy = ((...args: Parameters<T>) => {
      calls.push(args);
      return implementation ? implementation(...args) : undefined;
    }) as T & { calls: Parameters<T>[]; callCount: number };

    Object.defineProperty(spy, "calls", {
      get: () => calls,
      enumerable: true,
    });

    Object.defineProperty(spy, "callCount", {
      get: () => calls.length,
      enumerable: true,
    });

    return spy;
  }

  /**
   * Asserts that a promise rejects with a specific error message
   */
  static async assertRejectsWithMessage(
    fn: () => Promise<unknown>,
    expectedMessage: string,
  ): Promise<void> {
    try {
      await fn();
      throw new Error("Expected function to reject, but it resolved");
    } catch (error) {
      if (error instanceof Error) {
        assertEquals(error.message, expectedMessage);
      } else {
        throw new Error("Expected error to be an instance of Error");
      }
    }
  }

  /**
   * Asserts that an object has specific properties
   */
  static assertHasProperties<T extends Record<string, unknown>>(
    obj: T,
    properties: (keyof T)[],
  ): void {
    for (const prop of properties) {
      assertExists(obj[prop], `Property '${String(prop)}' should exist on object`);
    }
  }

  /**
   * Asserts that a string contains specific text
   */
  static assertStringContains(
    haystack: string,
    needle: string,
    message?: string,
  ): void {
    assert(
      haystack.includes(needle),
      message || `Expected "${haystack}" to contain "${needle}"`,
    );
  }

  /**
   * Asserts that an array contains a specific item
   */
  static assertArrayContains<T>(
    array: T[],
    item: T,
    message?: string,
  ): void {
    assert(
      array.includes(item),
      message || `Expected array to contain ${JSON.stringify(item)}`,
    );
  }

  /**
   * Asserts that a function throws with a specific error type
   */
  static assertThrowsError<T extends Error>(
    fn: () => unknown,
    ErrorClass: new (...args: unknown[]) => T,
    message?: string,
  ): T {
    try {
      fn();
      throw new Error("Expected function to throw, but it didn't");
    } catch (error) {
      assert(
        error instanceof ErrorClass,
        message || `Expected error to be instance of ${ErrorClass.name}`,
      );
      return error as T;
    }
  }
}

/**
 * Test data generators
 */
export class TestData {
  /**
   * Generates a random string of specified length
   */
  static randomString(length = 10): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a random email address
   */
  static randomEmail(): string {
    return `${this.randomString(8)}@${this.randomString(5)}.com`;
  }

  /**
   * Generates a random number within a range
   */
  static randomNumber(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random date within a range
   */
  static randomDate(start = new Date(2020, 0, 1), end = new Date()): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
