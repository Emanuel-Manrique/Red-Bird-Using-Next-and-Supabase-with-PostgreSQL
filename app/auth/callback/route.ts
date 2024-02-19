import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code || !code.trim()) {
    return NextResponse.redirect(requestUrl.origin);
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    await supabase.auth.exchangeCodeForSession(code);
  } catch (error) {
    console.error(error);
  }

  return NextResponse.redirect(requestUrl.origin);
}
