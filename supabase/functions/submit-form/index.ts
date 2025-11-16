import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAKE_WEBHOOK_FIRST = Deno.env.get('MAKE_WEBHOOK_FIRST');
const MAKE_WEBHOOK_SECOND = Deno.env.get('MAKE_WEBHOOK_SECOND');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // New window or expired window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log(`Request from IP: ${clientIp}`);

    // Check rate limit
    const rateLimitCheck = checkRateLimit(clientIp);
    if (!rateLimitCheck.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: rateLimitCheck.retryAfter 
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': rateLimitCheck.retryAfter?.toString() || '60'
          },
        }
      );
    }

    const body = await req.json();
    const { step, formData } = body;

    if (!step || !formData) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: step and formData' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Processing form submission for step ${step}`);

    // Handle first webhook (step 4 -> 5)
    if (step === 'first') {
      if (!MAKE_WEBHOOK_FIRST) {
        console.error('MAKE_WEBHOOK_FIRST not configured');
        return new Response(
          JSON.stringify({ error: 'Webhook not configured' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Fire and forget
      fetch(MAKE_WEBHOOK_FIRST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }).catch(error => {
        console.error("First webhook error:", error.message);
      });

      return new Response(
        JSON.stringify({ success: true, message: 'First webhook triggered' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle second webhook (step 5 -> 6)
    if (step === 'second') {
      if (!MAKE_WEBHOOK_SECOND) {
        console.error('MAKE_WEBHOOK_SECOND not configured');
        return new Response(
          JSON.stringify({ error: 'Webhook not configured' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Calling second webhook...');
      const response = await fetch(MAKE_WEBHOOK_SECOND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const html = await response.text();
        console.log('Second webhook successful');
        return new Response(
          JSON.stringify({ success: true, html }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } else {
        console.error(`Second webhook failed with status: ${response.status}`);
        return new Response(
          JSON.stringify({ success: false, html: '' }),
          {
            status: 200, // Still return 200 to allow graceful fallback
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Invalid step parameter' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in submit-form function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
