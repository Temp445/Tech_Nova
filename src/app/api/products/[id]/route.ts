import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    await dbConnect();

    const { id } = await context.params; 
    const product = await Product.findById(id);

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
}
