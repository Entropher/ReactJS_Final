export async function GET() {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: "პროდუქტების ჩატვირთვა ვერ მოხერხდა." },
        { status: 502 },
      );
    }

    const products = await response.json();
    return Response.json(products);
  } catch {
    return Response.json(
      { error: "პროდუქტების ჩატვირთვა ვერ მოხერხდა." },
      { status: 502 },
    );
  }
}
