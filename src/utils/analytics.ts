import { sendPopupEventToParent } from './parentMessaging';

declare global {
  interface Window {
    rockPopupConfig?: {
      clientId?: string;
      pageLocation?: string;
      origin?: string;
      forceShow?: boolean;
      reset?: boolean;
    };
  }
}

const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  // Send to parent window if in iframe
  sendPopupEventToParent(eventName, parameters);
};

export const trackPopupDisplay = (pageLocation?: string) => {
  trackEvent('popup_display', {
    page_location: pageLocation || window.location.href,
  });
};

export const trackPopupInteraction = () => {
  trackEvent('popup_interaction');
};

export const trackPopupStep = (stepNumber: number, stepValue?: string, additionalParams?: Record<string, any>) => {
  const eventName = `popup_step${stepNumber}`;
  const params: Record<string, any> = {};

  if (stepValue !== undefined) {
    params.step_value = stepValue;
  }

  if (additionalParams) {
    Object.assign(params, additionalParams);
  }

  trackEvent(eventName, params);
};

export const trackGenerateLead = (formData: {
  parentName: string;
  email: string;
  phone: string;
}) => {
  const emailDomain = formData.email.split('@')[1] || '';
  
  trackEvent('generate_lead', {
    parent_name: formData.parentName,
    email_domain: emailDomain,
    phone_provided: formData.phone.replace(/\D/g, '').length === 10,
  });
};

export const trackPopupCompletion = () => {
  trackEvent('popup_completion', {
    completed_at: new Date().toISOString(),
  });
};
