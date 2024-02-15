import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import type { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { authorId } = params;

    const urls = await prisma.link.findMany({
      where: {
        authorId,
      },
    });

    return NextResponse.json(urls);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
