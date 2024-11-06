import { clsx, type ClassValue } from 'clsx';
import { Timestamp } from 'firebase/firestore';
import { twMerge } from 'tailwind-merge';

import { monthNames } from '@/constants/monthNames';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * format the Date in iso to this formate ex:-(24 Feb 2024)
 * @param {string} isoDateString
 * @returns {string}
 */
export function formatDateWithISOString(isoDateString: string): string {
  const date = new Date(isoDateString);

  // Options to format the date as: '24 Feb 2024'
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  // Format the date
  return date.toLocaleDateString('en-GB', options);
}

/**
 * format Firestor eTimestamp to this formate 23 Sept 2024
 * @param {Timestamp} timestamp
 * @returns
 */
export function formatDateWithTimestamp(timestamp: Timestamp) {
  // Create a Date object from the seconds
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

  // Define options for date formatting
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  // Format the date
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate; // Outputs: "23 Sept 2024"
}

/**
 * Get the Pagination Status for the table button (next and previous)
 * @param {number} totalCount
 * @param {number} limit
 * @param {number} pageNumber
 * @returns
 */
export function getPaginationStatus(
  totalCount: number,
  limit: number,
  pageNumber: number,
) {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalCount / limit);

  // Determine if Previous and Next buttons should be disabled
  const isNextDisabled = pageNumber === totalPages;

  return {
    isNextDisabled,
    totalPages,
  };
}

export function convertTimestamp(timestamp: Timestamp) {
  const { seconds, nanoseconds } = timestamp;

  // Convert seconds and nanoseconds to milliseconds
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

  // Create a new Date object with the milliseconds
  const date = new Date(milliseconds);

  // Convert to ISO 8601 string format
  return date.toString();
}

export function formatDateWithTimestampInLocale(timestamp: Timestamp) {
  const { seconds, nanoseconds } = timestamp;

  // Convert seconds and nanoseconds to milliseconds
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

  // Create a new Date object
  const date = new Date(milliseconds);

  // Format as dd/mm/yyyy
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Formate timestamp to like this NOVEMBER 09 , 2024
 * @param {Timestamp} timestamp
 * @returns
 */
export function formatFirestoreTimestampForPreview(
  timestamp: Timestamp,
): string {
  // Create a Date object from the seconds
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

  // Get the components of the date
  const month = monthNames[date.getMonth()]; // Get the month in uppercase
  const day = String(date.getDate()).padStart(2, '0'); // Get the day, padded with zero if needed
  const year = date.getFullYear(); // Get the year

  // Construct the formatted date string
  return `${month} ${day}, ${year}`;
}
