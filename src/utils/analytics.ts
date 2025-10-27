declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    rockPopupConfig?: {
      clientId?: string;
      pageLocation?: string;
      origin?: string;
    };
  }
}

const GA4_MEASUREMENT_ID = 'G-673KD4D1H5';

export const initializeGA4 = (clientId?: string) => {
  if (typeof window === 'undefined') return;

  // Initialize gtag if not already initialized
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
  }

  window.gtag('js', new Date());

  const config: any = {
    send_page_view: false, // We'll manually track popup_display
  };

  if (clientId) {
    config.client_id = clientId;
  }

  window.gtag('config', GA4_MEASUREMENT_ID, config);
};

const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('GA4 gtag not available');
    return;
  }

  window.gtag('event', eventName, parameters);
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
