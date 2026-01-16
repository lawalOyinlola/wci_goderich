/**
 * Validation utilities for API routes
 * Provides type-safe field normalization and validation
 */

/**
 * Safely normalizes a field to a trimmed string or null
 * Only calls .trim() on strings, treats other types as null
 */
export function normalizeStringField(
  value: unknown,
  allowEmpty = false
): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return allowEmpty || trimmed.length > 0 ? trimmed : null;
  }
  // Treat non-strings as null (don't try to convert)
  return null;
}

/**
 * Safely normalizes a boolean field
 */
export function normalizeBooleanField(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const lower = value.toLowerCase().trim();
    return lower === "true" || lower === "1";
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  return false;
}

/**
 * Safely normalizes a number field
 */
export function normalizeNumberField(
  value: unknown,
  min?: number,
  max?: number
): number | null {
  if (typeof value === "number") {
    if (isNaN(value) || !isFinite(value)) {
      return null;
    }
    if (min !== undefined && value < min) {
      return null;
    }
    if (max !== undefined && value > max) {
      return null;
    }
    return value;
  }
  if (typeof value === "string") {
    const parsed = parseFloat(value.trim());
    if (isNaN(parsed) || !isFinite(parsed)) {
      return null;
    }
    if (min !== undefined && parsed < min) {
      return null;
    }
    if (max !== undefined && parsed > max) {
      return null;
    }
    return parsed;
  }
  return null;
}

/**
 * Safely normalizes an email field
 * Returns null if not a valid email format
 */
export function normalizeEmailField(value: unknown): string | null {
  const email = normalizeStringField(value, true);
  if (!email) {
    return null;
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? email : null;
}

/**
 * Safely normalizes a phone field
 * Returns null if not a valid phone format
 */
export function normalizePhoneField(value: unknown): string | null {
  const phone = normalizeStringField(value, true);
  if (!phone) {
    return null;
  }
  // Basic phone validation (allows international formats)
  const phoneRegex =
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone) ? phone : null;
}

/**
 * Safely parses JSON from a request
 * Returns the parsed body or throws an error
 */
export async function parseRequestBody(
  request: Request
): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body as Record<string, unknown>;
  } catch (error) {
    throw new Error("Invalid JSON payload");
  }
}

/**
 * Validates required string fields
 * Returns an array of missing field names
 */
export function validateRequiredFields(
  fields: Record<string, string | null>,
  required: string[]
): string[] {
  const missing: string[] = [];
  for (const fieldName of required) {
    if (!fields[fieldName]) {
      missing.push(fieldName);
    }
  }
  return missing;
}

/**
 * Type-safe field extraction and normalization helper
 * Extracts and normalizes fields from a request body
 */
export interface NormalizedFields {
  [key: string]: string | null | boolean | number | undefined;
}

export function extractAndNormalizeFields(
  body: Record<string, unknown>,
  fieldConfig: {
    [key: string]: {
      type: "string" | "email" | "phone" | "boolean" | "number";
      required?: boolean;
      allowEmpty?: boolean;
      min?: number;
      max?: number;
    };
  }
): {
  fields: NormalizedFields;
  errors: string[];
} {
  const fields: NormalizedFields = {};
  const errors: string[] = [];

  for (const [fieldName, config] of Object.entries(fieldConfig)) {
    const rawValue = body[fieldName];

    let normalized: string | null | boolean | number | undefined;

    switch (config.type) {
      case "string":
        normalized = normalizeStringField(rawValue, config.allowEmpty);
        break;
      case "email":
        normalized = normalizeEmailField(rawValue);
        break;
      case "phone":
        normalized = normalizePhoneField(rawValue);
        break;
      case "boolean":
        normalized = normalizeBooleanField(rawValue);
        break;
      case "number":
        normalized = normalizeNumberField(rawValue, config.min, config.max);
        break;
    }

    fields[fieldName] = normalized;

    // Check required fields
    if (
      config.required &&
      (config.type === "boolean"
        ? rawValue === undefined || rawValue === null
        : normalized === null || normalized === undefined)
    ) {
      errors.push(`${fieldName} is required`);
    }
  }

  return { fields, errors };
}
