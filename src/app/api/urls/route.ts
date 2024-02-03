import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, shortUrl, description, authorId } = await req.json();

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

export async function PATCH(req: NextRequest) {
  try {
    const { url, shortUrl, description, authorId } = await req.json();

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

export async function DELETE(req: NextRequest) {
  try {
    const { shortUrl, authorId } = await req.json();

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
