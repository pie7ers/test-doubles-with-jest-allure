import { IRESPONSE } from '../request/control/httpRequests'

export function attachJson(name: string, response: IRESPONSE): void {
  // @ts-ignore
  const allure = global.allure;
  allure.attachment(
    name,
    JSON.stringify(response, null, 2),
    'application/json'
  );
}