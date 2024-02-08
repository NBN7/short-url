import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import type { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { shortUrl } = params;

    // find url
    const shortUrlExists = await prisma.link.findUnique({
      where: { shortUrl },
      select: {
        url: true,
      },
    });
    if (shortUrlExists) {
      const redirectUrl = shortUrlExists.url;
      return NextResponse.json({ url: redirectUrl });
    }

    return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_URL}` });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    const { url, description, authorId } = await req.json();
    const { shortUrl } = params;

    // check if description is less than 40 characters
    if (description.length > 40) {
      return NextResponse.json({
        error: "Description must have a length fewer than 40 characters",
      });
    }

    // check if shortUrl already exists
    const shortUrlExists = await prisma.link.findUnique({
      where: { shortUrl },
    });
    if (shortUrlExists) {
      return NextResponse.json(
        { error: "Short URL already exists" },
        { status: 400 }
      );
    }

    // create new short url
    const createdUrl = await prisma.link.create({
      data: {
        url,
        shortUrl,
        description,
        authorId,
      },
    });

    return NextResponse.json(createdUrl);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { url, description, authorId } = await req.json();
    const { shortUrl } = params;

    // check if the url is property of the author
    const isAuthor = await prisma.link.findUnique({
      where: { shortUrl, authorId },
    });
    if (!isAuthor) {
      return NextResponse.json(
        { error: "You are not the author of this URL" },
        { status: 400 }
      );
    }

    // check if description is less than 40 characters
    if (description.length > 40) {
      return NextResponse.json({
        error: "Description must have a length fewer than 40 characters",
      });
    }

    // update url
    const updatedUrl = await prisma.link.update({
      where: { shortUrl },
      data: { url, description },
    });

    return NextResponse.json(updatedUrl);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { authorId } = await req.json();
    const { shortUrl } = params;

    // check if shortUrl exists
    const shortUrlExists = await prisma.link.findUnique({
      where: { shortUrl },
    });
    if (!shortUrlExists) {
      return NextResponse.json(
        { error: "Short URL does not exist" },
        { status: 400 }
      );
    }

    // check if the url is property of the author
    const isAuthor = await prisma.link.findUnique({
      where: { shortUrl, authorId },
    });
    if (!isAuthor) {
      return NextResponse.json(
        { error: "You are not the author of this URL" },
        { status: 400 }
      );
    }

    // delete url
    const deletedUrl = await prisma.link.delete({
      where: { shortUrl },
    });

    return NextResponse.json(deletedUrl);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
