export enum SortBy {
  ASC_NAME = 'asc_name',
  DESC_NAME = 'desc_name',
  ASC_USEREMAIL = 'asc_user_email',
  DESC_USERNAME = 'desc_user_email',
  ASC_DATE = 'asc_date',
  DESC_DATE = 'desc_date',
}

export const ROWS_PER_PAGE = 10;

export enum SortByOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortConfigKey {
  NAME = 'name',
  USER_EMAIL = 'user_email',
  DATE = 'date',
}

export type SortByType = SortConfigKey.USER_EMAIL | null;
