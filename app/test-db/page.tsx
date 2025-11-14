import { createClient } from '@/lib/supabase/server';

export default async function TestDB() {
  const supabase = await createClient();
  
  // Test database connection - fetch categories
  const { data: categories, error: dbError } = await supabase
    .from('categories')
    .select('*')
    .limit(5);

  // Test auth connection
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-md text-neutral-900 mb-8">
          ✅ Database Connection Test
        </h1>

        {/* Database Status */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <h2 className="text-heading-lg text-neutral-900 mb-4">
            Database Connection
          </h2>
          {dbError ? (
            <div className="text-error">
              <p className="font-semibold">❌ Database Error:</p>
              <p>{dbError.message}</p>
            </div>
          ) : (
            <div className="text-success">
              <p className="font-semibold mb-4">
                ✅ Connected! Found {categories?.length || 0} categories:
              </p>
              <ul className="space-y-2">
                {categories?.map((cat) => (
                  <li key={cat.id} className="flex items-center gap-2">
                    <span className="text-primary-600">•</span>
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-body-sm text-neutral-500">
                      ({cat.slug})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Auth Status */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <h2 className="text-heading-lg text-neutral-900 mb-4">
            Authentication Status
          </h2>
          {user ? (
            <div className="text-success">
              <p className="font-semibold">✅ Logged in as:</p>
              <p>{user.email}</p>
            </div>
          ) : (
            <div className="text-neutral-600">
              <p>Not logged in yet</p>
              <a 
                href="/auth/signup" 
                className="text-primary-600 hover:text-primary-700 underline mt-2 inline-block"
              >
                Create an account
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-neutral-200 text-neutral-900 rounded-lg hover:bg-neutral-300 transition-colors"
          >
            ← Back to Home
          </a>
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Test Sign Up →
          </a>
        </div>
      </div>
    </div>
  );
}
