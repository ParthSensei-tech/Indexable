import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawShop = searchParams.get("shop");

  if (!rawShop) {
    return NextResponse.json(
      { error: "Missing required parameter: shop (e.g. your-store.myshopify.com)" },
      { status: 400 }
    );
  }

  const cleanShop = rawShop.trim().toLowerCase();

  // Security: strict regex validation to prevent open-redirect / SSRF
  if (!SHOPIFY_DOMAIN_REGEX.test(cleanShop)) {
    return NextResponse.json(
      { error: "Invalid Shopify domain format. Must be a valid *.myshopify.com domain." },
      { status: 400 }
    );
  }

  const apiKey = process.env.SHOPIFY_API_KEY || "indexable_shopify_client_key";
  const scopes = "read_products,read_themes,write_themes";
  const host = req.headers.get("host") || "indexable.dev";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/shopify/callback`;

  // Generate cryptographically secure state nonce to prevent CSRF
  const nonce = crypto.randomBytes(16).toString("hex");

  const installUrl = `https://${cleanShop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${nonce}`;

  const response = NextResponse.redirect(installUrl);

  // Set HTTP-only secure cookie for state verification
  response.cookies.set("shopify_oauth_nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return response;
}
