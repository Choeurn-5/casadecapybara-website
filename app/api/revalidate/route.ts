import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-demand revalidation endpoint for WordPress Webhooks
 * Trigger with:
 * GET or POST /api/revalidate?secret=casadecapybara_revalidate_secret&path=/
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") || "/";
  const tag = searchParams.get("tag");

  const expectedSecret =
    process.env.REVALIDATION_SECRET || "casadecapybara_revalidate_secret";

  if (secret && secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
  }

  try {
    if (tag) {
      revalidateTag(tag, "max");
    }
    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Error revalidating", error: errorMsg },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
