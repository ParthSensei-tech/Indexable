import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const hmac = searchParams.get("hmac");

  if (!shop || !SHOPIFY_DOMAIN_REGEX.test(shop)) {
    return NextResponse.json({ error: "Invalid or missing shop domain." }, { status: 400 });
  }

  // Validate state against cookie to prevent CSRF attacks
  const cookieNonce = req.cookies.get("shopify_oauth_nonce")?.value;
  if (!state || !cookieNonce || state !== cookieNonce) {
    return NextResponse.json({ error: "Invalid OAuth state. Potential CSRF detected." }, { status: 403 });
  }

  // If Shopify API Secret is provided in env, verify HMAC
  const secret = process.env.SHOPIFY_API_SECRET;
  if (secret && hmac) {
    const params = new URLSearchParams(searchParams);
    params.delete("hmac");
    params.delete("signature");
    params.sort();

    const digest = crypto
      .createHmac("sha256", secret)
      .update(params.toString())
      .digest("hex");

    if (digest !== hmac) {
      return NextResponse.json({ error: "HMAC validation failed." }, { status: 401 });
    }
  }

  // Clear the nonce cookie
  const redirectUrl = new URL("/?authenticated=true&shop=" + encodeURIComponent(shop), req.url);
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.delete("shopify_oauth_nonce");

  return response;
}
