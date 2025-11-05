import { NextRequest, NextResponse } from "next/server";

/**
 * API Route для проксирования favicon через Google Favicons API
 * Возвращает favicon или 404 если иконка не найдена
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  const size = searchParams.get("size") || "64";

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 });
  }

  try {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`;
    
    const response = await fetch(faviconUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FaviconProxy/1.0)",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Favicon not found" }, { status: 404 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Проверяем размер ответа - Google возвращает очень маленькую заглушку если иконка не найдена
    // Обычная favicon весит больше 100 байт
    if (buffer.length < 100) {
      return NextResponse.json({ error: "Favicon not found (too small)" }, { status: 404 });
    }

    const contentType = response.headers.get("content-type") || "image/png";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Кэш на 24 часа
      },
    });
  } catch (error) {
    console.error("Error fetching favicon:", error);
    return NextResponse.json({ error: "Failed to fetch favicon" }, { status: 500 });
  }
}

