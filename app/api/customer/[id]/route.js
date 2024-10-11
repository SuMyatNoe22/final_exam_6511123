import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET(request, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return new Response('Customer not found', { status: 404 });
        }
        return new Response(JSON.stringify(customer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Error fetching customer', { status: 500 });
    }
}

export async function PUT(request, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const body = await request.json();
        const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true });

        if (!updatedCustomer) {
            return new Response('Customer not found', { status: 404 });
        }

        return new Response(JSON.stringify(updatedCustomer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Error updating customer', { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = params;
  
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(id);
  
      if (!deletedCustomer) {
        return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Customer deleted successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Error deleting customer', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }