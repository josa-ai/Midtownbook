import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(3);

    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      categories: data,
      count: data?.length || 0
    });
  } catch (err: any) {
    return NextResponse.json({ 
      success: false, 
      error: err.message,
      type: err.constructor.name,
      cause: err.cause?.message || 'No cause'
    }, { status: 500 });
  }
}
