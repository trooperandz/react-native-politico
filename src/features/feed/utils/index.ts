export const setAcceptanceValue = (
  thumbValue: string,
  record: { [key: string]: any },
) => {
  switch (thumbValue) {
    case 'UP':
      record.NumUp += 1;
      break;
    case 'DOWN':
      record.NumDown += 1;
      break;
    case 'CANCEL_UP':
      record.NumUp -= 1;
      break;
    case 'CANCEL_DOWN':
      record.NumDown -= 1;
      break;
    default:
  }

  return record;
};

export const mockInterestData = [
  'Agriculture and Food',
  'Armed Forces and National Security',
  'Civil Rights and Liberties, Minority Issues',
  'Commerce',
  'Congress',
  'Crime and Law Enforcement',
  'Education',
  'Environmental Protection',
  'Finance and Financial Sector',
  'Government Operations and Politics',
  'Health',
  'Housing and Community Development',
  'Immigration',
  'International Affairs',
  'Labor and Employment',
  'Public Lands and Natural Resources',
  'Science, Technology, Communications',
  'Social Welfare',
  'Sports and Recreation',
  'Taxation',
  'Transportation and Public Works',
];
