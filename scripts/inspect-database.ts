#!/usr/bin/env tsx

/**
 * Database Inspector Script
 *
 * Connects to Supabase and inspects the actual database structure:
 * - Lists all tables
 * - Shows columns for each table with their types
 * - Shows indexes
 * - Shows RLS policies
 *
 * Run with: npx tsx scripts/inspect-database.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface Column {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}

interface Table {
  table_name: string;
}

interface Index {
  tablename: string;
  indexname: string;
  indexdef: string;
}

interface Policy {
  tablename: string;
  policyname: string;
  permissive: string;
  roles: string[];
  cmd: string;
  qual: string | null;
  with_check: string | null;
}

async function inspectDatabase() {
  console.log('🔍 Inspecting Supabase Database Structure\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  try {
    // 1. Get all tables in the public schema
    console.log('📋 TABLES IN PUBLIC SCHEMA:\n');
    const { data: tables, error: tablesError } = await supabase
      .rpc('exec_sql', {
        query: `
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `
      }) as { data: Table[] | null, error: any };

    if (tablesError) {
      // If exec_sql doesn't exist, try direct query
      console.log('⚠️  Cannot execute custom SQL. Using alternative method...\n');

      // Try to query each expected table directly to see if it exists
      const expectedTables = ['profiles', 'categories', 'businesses', 'reviews', 'events', 'deals'];

      for (const tableName of expectedTables) {
        const { error } = await supabase
          .from(tableName)
          .select('*')
          .limit(0);

        if (!error) {
          console.log(`✅ Table exists: ${tableName}`);

          // Get column info by attempting to select from it
          const { data: sample, error: sampleError } = await supabase
            .from(tableName)
            .select('*')
            .limit(1);

          if (!sampleError && sample && sample.length > 0) {
            const columns = Object.keys(sample[0]);
            console.log(`   Columns detected: ${columns.join(', ')}\n`);
          } else if (!sampleError) {
            console.log(`   (Table is empty, cannot detect columns)\n`);
          }
        } else if (error.code === '42P01') {
          console.log(`❌ Table does not exist: ${tableName}\n`);
        } else {
          console.log(`⚠️  Error checking table ${tableName}: ${error.message}\n`);
        }
      }

      return;
    }

    if (!tables || tables.length === 0) {
      console.log('❌ No tables found in public schema.\n');
      console.log('This might mean:');
      console.log('1. The database is completely empty');
      console.log('2. Tables exist in a different schema');
      console.log('3. Permission issues preventing table listing\n');
      return;
    }

    const tableNames = tables.map(t => t.table_name);
    console.log(`Found ${tableNames.length} tables:\n`);
    tableNames.forEach(name => console.log(`  - ${name}`));
    console.log('\n');

    // 2. Get columns for each table
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('📊 TABLE STRUCTURES:\n');

    for (const tableName of tableNames) {
      console.log(`\n┌─ Table: ${tableName}`);
      console.log('│');

      const { data: columns, error: columnsError } = await supabase
        .rpc('exec_sql', {
          query: `
            SELECT
              column_name,
              data_type,
              is_nullable,
              column_default
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = '${tableName}'
            ORDER BY ordinal_position;
          `
        }) as { data: Column[] | null, error: any };

      if (columnsError || !columns) {
        console.log(`│  ⚠️  Could not retrieve columns: ${columnsError?.message || 'Unknown error'}`);
        continue;
      }

      console.log('│  Columns:');
      columns.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const defaultVal = col.column_default ? `DEFAULT ${col.column_default}` : '';
        console.log(`│    - ${col.column_name.padEnd(30)} ${col.data_type.padEnd(20)} ${nullable.padEnd(10)} ${defaultVal}`);
      });
      console.log('└─');
    }

    // 3. Get indexes
    console.log('\n═══════════════════════════════════════════════════════════════\n');
    console.log('🔑 INDEXES:\n');

    const { data: indexes, error: indexesError } = await supabase
      .rpc('exec_sql', {
        query: `
          SELECT
            tablename,
            indexname,
            indexdef
          FROM pg_indexes
          WHERE schemaname = 'public'
          ORDER BY tablename, indexname;
        `
      }) as { data: Index[] | null, error: any };

    if (indexesError || !indexes) {
      console.log('⚠️  Could not retrieve indexes\n');
    } else {
      let currentTable = '';
      indexes.forEach(idx => {
        if (idx.tablename !== currentTable) {
          if (currentTable !== '') console.log('');
          console.log(`Table: ${idx.tablename}`);
          currentTable = idx.tablename;
        }
        console.log(`  - ${idx.indexname}`);
        console.log(`    ${idx.indexdef}\n`);
      });
    }

    // 4. Get RLS policies
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('🔒 ROW LEVEL SECURITY POLICIES:\n');

    const { data: policies, error: policiesError } = await supabase
      .rpc('exec_sql', {
        query: `
          SELECT
            schemaname,
            tablename,
            policyname,
            permissive,
            roles,
            cmd,
            qual,
            with_check
          FROM pg_policies
          WHERE schemaname = 'public'
          ORDER BY tablename, policyname;
        `
      }) as { data: Policy[] | null, error: any };

    if (policiesError || !policies) {
      console.log('⚠️  Could not retrieve RLS policies\n');
    } else if (policies.length === 0) {
      console.log('⚠️  No RLS policies found. Tables are not protected!\n');
    } else {
      let currentTable = '';
      policies.forEach(policy => {
        if (policy.tablename !== currentTable) {
          if (currentTable !== '') console.log('');
          console.log(`Table: ${policy.tablename}`);
          currentTable = policy.tablename;
        }
        console.log(`  - ${policy.policyname}`);
        console.log(`    Command: ${policy.cmd}`);
        console.log(`    Roles: ${policy.roles.join(', ')}`);
        if (policy.qual) console.log(`    USING: ${policy.qual}`);
        if (policy.with_check) console.log(`    WITH CHECK: ${policy.with_check}`);
        console.log('');
      });
    }

    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('✅ Database inspection complete!\n');

  } catch (error: any) {
    console.error('❌ Error inspecting database:', error.message);
    process.exit(1);
  }
}

// Run the inspection
inspectDatabase();
