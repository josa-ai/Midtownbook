#!/usr/bin/env tsx

/**
 * Database Inspector Script v2
 *
 * Uses Supabase REST API with service role key to inspect database structure
 *
 * Run with: npx tsx scripts/inspect-database-v2.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

// Create admin client with service role key
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function inspectDatabase() {
  console.log('🔍 Inspecting Supabase Database Structure\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const expectedTables = ['profiles', 'categories', 'businesses', 'reviews', 'events', 'deals'];

  console.log('📋 CHECKING TABLES:\n');

  const existingTables: string[] = [];
  const missingTables: string[] = [];

  // Check each table
  for (const tableName of expectedTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        if (error.code === 'PGRST204' || error.code === '42P01') {
          console.log(`❌ Table does NOT exist: ${tableName}`);
          missingTables.push(tableName);
        } else {
          console.log(`⚠️  Table ${tableName}: ${error.message}`);
          existingTables.push(tableName); // Assume it exists but has issues
        }
      } else {
        console.log(`✅ Table EXISTS: ${tableName}`);
        existingTables.push(tableName);
      }
    } catch (err: any) {
      console.log(`⚠️  Error checking ${tableName}: ${err.message}`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log(`📊 SUMMARY:\n`);
  console.log(`  Existing tables: ${existingTables.length}`);
  console.log(`  Missing tables: ${missingTables.length}\n`);

  if (existingTables.length > 0) {
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('📝 ANALYZING EXISTING TABLES:\n');

    for (const tableName of existingTables) {
      console.log(`\n┌─ Table: ${tableName}`);
      console.log('│');

      try {
        // Fetch one row to see column structure
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);

        if (error) {
          console.log(`│  ⚠️  Could not fetch data: ${error.message}`);
          console.log('└─');
          continue;
        }

        // Check if table is empty
        if (!data || data.length === 0) {
          console.log('│  ⚠️  Table is EMPTY (no rows)');
          console.log('│  Cannot determine column structure from empty table');
          console.log('└─');
          continue;
        }

        // Analyze the row structure
        const sample = data[0];
        const columns = Object.keys(sample);

        console.log(`│  Found ${columns.length} columns:`);
        console.log('│');

        columns.forEach(col => {
          const value = sample[col];
          const type = value === null ? 'null' : typeof value;
          const displayValue = value === null ? 'NULL' :
            typeof value === 'object' ? JSON.stringify(value).substring(0, 50) :
              String(value).substring(0, 50);

          console.log(`│    - ${col.padEnd(30)} (${type})`);
          console.log(`│      Sample: ${displayValue}`);
        });

        console.log('└─');

      } catch (err: any) {
        console.log(`│  ⚠️  Error: ${err.message}`);
        console.log('└─');
      }
    }
  }

  if (missingTables.length > 0) {
    console.log('\n═══════════════════════════════════════════════════════════════\n');
    console.log('❌ MISSING TABLES:\n');
    missingTables.forEach(table => {
      console.log(`  - ${table}`);
    });
    console.log('\n⚠️  These tables need to be created from schema.sql\n');
  }

  // Try to count rows in existing tables
  if (existingTables.length > 0) {
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('📊 ROW COUNTS:\n');

    for (const tableName of existingTables) {
      try {
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.log(`  ${tableName}: ⚠️  ${error.message}`);
        } else {
          console.log(`  ${tableName}: ${count} rows`);
        }
      } catch (err: any) {
        console.log(`  ${tableName}: ⚠️  ${err.message}`);
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log('✅ Database inspection complete!\n');

  // Recommendations
  console.log('💡 RECOMMENDATIONS:\n');

  if (missingTables.length === expectedTables.length) {
    console.log('  - Database appears to be empty');
    console.log('  - Run the full schema.sql in Supabase SQL Editor\n');
  } else if (missingTables.length > 0) {
    console.log('  - Some tables exist, some are missing');
    console.log('  - Create a migration to add only missing tables');
    console.log('  - Missing: ' + missingTables.join(', ') + '\n');
  } else if (existingTables.length === expectedTables.length) {
    console.log('  - All tables exist!');
    console.log('  - Check if they have the correct structure');
    console.log('  - Run seed.sql to add sample data if needed\n');
  }
}

// Run the inspection
inspectDatabase().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
