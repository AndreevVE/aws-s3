// Преобразует строковое значение env в boolean или возвращает fallback.
export const parseBoolean = (value, fallback) => {
  if (value === undefined) return fallback;

  return value === 'true';
};

// Возвращает true, если значение имеет тип string.
export const isString = (value) => typeof value === 'string';

// Возвращает true, если значение является непустой строкой после trim.
export const hasText = (value) => isString(value) && value.trim().length > 0;

// Проверяет, что значение отсутствует или является строкой.
export const isOptionalString = (value) => value === undefined || value === null || isString(value);

// Возвращает true для положительного безопасного целого числа.
export const isPositiveInteger = (value) => Number.isSafeInteger(value) && value > 0;

// Проверяет, что целое число находится между min и max включительно.
export const isIntegerBetween = (value, min, max) =>
  Number.isInteger(value) && value >= min && value <= max;

// Проверяет, что значение содержится в переданном списке.
export const isOneOf = (value, values) => values.includes(value);

// Проверяет наличие всех обязательных полей в объекте.
export const hasRequiredFields = (object, fields) =>
  fields.every((field) => object?.[field] !== undefined && object[field] !== null);

// Проверяет, что поля объекта совпадают с ожидаемыми значениями.
export const matchesFields = (object, expected) =>
  Object.entries(expected).every(([field, value]) => object?.[field] === value);
