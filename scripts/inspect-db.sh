#!/bin/bash

# Load environment variables
source .env.local

ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY"
URL="https://bwpvhwvgsebthapztiyp.supabase.co/rest/v1"

echo "🔍 Inspecting Supabase Database Structure"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check profiles table
echo "📋 PROFILES TABLE:"
echo ""
PROFILES=$(curl -s -X GET "$URL/profiles?select=*&limit=1" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY")

if echo "$PROFILES" | grep -q "relation.*does not exist"; then
  echo "❌ Table does NOT exist"
elif echo "$PROFILES" | python3 -m json.tool > /dev/null 2>&1; then
  echo "✅ Table EXISTS"
  echo "$PROFILES" | python3 -m json.tool | head -30
  echo ""
  echo "Columns found:"
  echo "$PROFILES" | python3 -c "import sys, json; data=json.load(sys.stdin); print('\n'.join(data[0].keys()) if data else 'No data')" 2>/dev/null
else
  echo "⚠️  Error: $PROFILES"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check categories table
echo "📋 CATEGORIES TABLE:"
echo ""
CATEGORIES=$(curl -s -X GET "$URL/categories?select=*&limit=1" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY")

if echo "$CATEGORIES" | grep -q "relation.*does not exist"; then
  echo "❌ Table does NOT exist"
elif echo "$CATEGORIES" | python3 -m json.tool > /dev/null 2>&1; then
  echo "✅ Table EXISTS"
  echo "$CATEGORIES" | python3 -m json.tool | head -30
  echo ""
  echo "Columns found:"
  echo "$CATEGORIES" | python3 -c "import sys, json; data=json.load(sys.stdin); print('\n'.join(data[0].keys()) if data else 'No data')" 2>/dev/null
else
  echo "⚠️  Error: $CATEGORIES"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check businesses table
echo "📋 BUSINESSES TABLE:"
echo ""
BUSINESSES=$(curl -s -X GET "$URL/businesses?select=*&limit=1" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY")

if echo "$BUSINESSES" | grep -q "relation.*does not exist"; then
  echo "❌ Table does NOT exist"
elif echo "$BUSINESSES" | python3 -m json.tool > /dev/null 2>&1; then
  echo "✅ Table EXISTS"
  echo "$BUSINESSES" | python3 -m json.tool | head -30
  echo ""
  echo "Columns found:"
  echo "$BUSINESSES" | python3 -c "import sys, json; data=json.load(sys.stdin); print('\n'.join(data[0].keys()) if data else 'No data')" 2>/dev/null
else
  echo "⚠️  Error: $BUSINESSES"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check reviews table
echo "📋 REVIEWS TABLE:"
echo ""
REVIEWS=$(curl -s -X GET "$URL/reviews?select=*&limit=1" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY")

if echo "$REVIEWS" | grep -q "relation.*does not exist"; then
  echo "❌ Table does NOT exist"
elif echo "$REVIEWS" | python3 -m json.tool > /dev/null 2>&1; then
  echo "✅ Table EXISTS"
  echo "$REVIEWS" | python3 -m json.tool | head -30
  echo ""
  echo "Columns found:"
  echo "$REVIEWS" | python3 -c "import sys, json; data=json.load(sys.stdin); print('\n'.join(data[0].keys()) if data else 'No data')" 2>/dev/null
else
  echo "⚠️  Error: $REVIEWS"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check events table
echo "📋 EVENTS TABLE:"
echo ""
EVENTS=$(curl -s -X GET "$URL/events?select=*&limit=1" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY")

if echo "$EVENTS" | grep -q "relation.*does not exist"; then
  echo "❌ Table does NOT exist"
elif echo "$EVENTS" | python3 -m json.tool > /dev/null 2>&1; then
  echo "✅ Table EXISTS"
  echo "$EVENTS" | python3 -m json.tool | head -30
  echo ""
  echo "Columns found:"
  echo "$EVENTS" | python3 -c "import sys, json; data=json.load(sys.stdin); print('\n'.join(data[0].keys()) if data else 'No data')" 2>/dev/null
else
  echo "⚠️  Error: $EVENTS"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check deals table
echo "📋 DEALS TABLE:"
echo ""
DEALS=$(curl -s -X GET "$URL/deals?select=*&limit=1" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY")

if echo "$DEALS" | grep -q "relation.*does not exist"; then
  echo "❌ Table does NOT exist"
elif echo "$DEALS" | python3 -m json.tool > /dev/null 2>&1; then
  echo "✅ Table EXISTS"
  echo "$DEALS" | python3 -m json.tool | head -30
  echo ""
  echo "Columns found:"
  echo "$DEALS" | python3 -c "import sys, json; data=json.load(sys.stdin); print('\n'.join(data[0].keys()) if data else 'No data')" 2>/dev/null
else
  echo "⚠️  Error: $DEALS"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "✅ Inspection complete!"
echo ""
