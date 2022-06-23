import {AxiosError} from 'axios'
import slugify from 'slugify'

const validateEmailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email: string) {
  return validateEmailExpression.test(String(email).toLowerCase());
}

export function encodeQueryData(data: Record<string, string>) {
  const result = [];
  for (const d of Object.keys(data)) {
    result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }

  return result.join('&');
}

export const normErrorMessage = (err: Error | AxiosError) => {
  if ('isAxiosError' in err) {
    return (err?.response?.data as unknown as {error: string})['error'] || err.message;
  }
  return err.message;
}

export const socialIconsMapping = {
  'tg': 'fab fa-telegram-plane',
  'insta': 'fab fa-instagram',
  'fb': 'fab fa-facebook-f',
};

export const getSocialIcon = (social: 'tg' | 'insta' | 'fb') => {
  return socialIconsMapping[social];
}

export const nameToSlug = (name: string) => {
  return (slugify(name || '').toLowerCase()).replace(/[^\w\d\-]/gi, '');
}
