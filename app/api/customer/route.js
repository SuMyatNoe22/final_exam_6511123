import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET(request) {
    await dbConnect();
    const pno = request.nextUrl.searchParams.get("pno");

    if (pno) {
        const size = 3; // Pagination size, you can adjust as needed
        const startIndex = (pno - 1) * size;
        const customers = await Customer.find()
            .sort({ memberNumber: 1 })
            .skip(startIndex)
            .limit(size);
        return new Response(JSON.stringify(customers), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const s = request.nextUrl.searchParams.get("s");
    if (s) {
        const customers = await Customer
            .find({ name: { $regex: s, $options: 'i' } })
            .sort({ memberNumber: 1 });
        return new Response(JSON.stringify(customers), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const customers = await Customer.find().sort({ memberNumber: 1 });
    return new Response(JSON.stringify(customers), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request) {
    await dbConnect();
    
    try {
      const body = await request.json();
      const customer = new Customer(body);
      await customer.save();
  
      return new Response(JSON.stringify(customer), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Error creating customer', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }