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

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
