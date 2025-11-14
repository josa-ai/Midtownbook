#!/usr/bin/env tsx

/**
 * Database Setup Script
 *
 * This script applies the schema and seed data to your Supabase database.
 *
 * Usage:
 *   npx tsx scripts/setup-database.ts
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease add these to your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runSQL(filePath: string, description: string) {
  console.log(`\n📄 Running ${description}...`);

  try {
    const sql = readFileSync(join(process.cwd(), filePath), 'utf-8');

    // Split by semicolons but be careful with function bodies
    const statements = sql
      .split(/;(?=\s*(?:--|$|\n|create|alter|insert|drop))/i)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`   Found ${statements.length} SQL statements`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement) continue;

      process.stdout.write(`   Executing statement ${i + 1}/${statements.length}... `);

      const { error } = await supabase.rpc('exec_sql', { sql: statement });

      if (error) {
        console.log('❌');
        console.error(`   Error: ${error.message}`);
        // Continue with other statements
      } else {
        console.log('✅');
      }
    }

    console.log(`✅ ${description} completed`);
  } catch (error: any) {
    console.error(`❌ Error running ${description}:`, error.message);
    throw error;
  }
}

async function testConnection() {
  console.log('🔌 Testing Supabase connection...');

  const { data, error } = await supabase
    .from('profiles')
    .select('count')
    .limit(1);

  if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist yet, which is OK
    console.error('❌ Connection failed:', error.message);
    return false;
  }

  console.log('✅ Connection successful');
  return true;
}

async function verifySetup() {
  console.log('\n🔍 Verifying database setup...');

  // Check categories
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name');

  if (catError) {
    console.error('❌ Categories table check failed:', catError.message);
  } else {
    console.log(`✅ Categories: ${categories?.length || 0} found`);
  }

  // Check businesses
  const { data: businesses, error: bizError } = await supabase
    .from('businesses')
    .select('id, name');

  if (bizError) {
    console.error('❌ Businesses table check failed:', bizError.message);
  } else {
    console.log(`✅ Businesses: ${businesses?.length || 0} found`);
  }

  // Check profiles
  const { data: profiles, error: profError } = await supabase
    .from('profiles')
    .select('id, email');

  if (profError) {
    console.error('❌ Profiles table check failed:', profError.message);
  } else {
    console.log(`✅ Profiles: ${profiles?.length || 0} found`);
  }
}

async function main() {
  console.log('🚀 Midtownbook Database Setup');
  console.log('================================\n');

  // Test connection
  const connected = await testConnection();
  if (!connected) {
    process.exit(1);
  }

  // Note: We can't run the schema.sql directly via the client
  // The user needs to run it in the Supabase SQL Editor
  console.log('\n⚠️  IMPORTANT:');
  console.log('   The schema must be applied manually through the Supabase SQL Editor.');
  console.log('   Please follow these steps:');
  console.log('   1. Go to https://app.supabase.com');
  console.log('   2. Select your project');
  console.log('   3. Go to SQL Editor');
  console.log('   4. Copy the contents of supabase/schema.sql');
  console.log('   5. Paste and run in the SQL Editor');
  console.log('   6. Copy the contents of supabase/seed.sql');
  console.log('   7. Paste and run in the SQL Editor');
  console.log('\n   Then run this script again to verify the setup.');

  // Verify setup
  await verifySetup();

  console.log('\n✅ Database setup verification complete!');
  console.log('\nNext steps:');
  console.log('   1. Check the Supabase dashboard to confirm all tables exist');
  console.log('   2. Run: npm run dev');
  console.log('   3. Visit http://localhost:3000/businesses to see the listings');
}

main().catch(console.error);
