# Deployment Guide

## Important: NODE_ENV Configuration

**CRITICAL**: Do NOT set `NODE_ENV=development` in your shell or environment variables.

### Issue
Next.js 15 has a known issue where setting `NODE_ENV` to anything other than the default causes build failures with the error:
```
Error: <Html> should not be imported outside of pages/_document.
```

### Solution
1. **Check if NODE_ENV is set**: `echo $NODE_ENV`
2. **If it shows "development" or any value**, unset it: `unset NODE_ENV`
3. **For permanent fix**, remove any `export NODE_ENV=development` from your:
   - `~/.zshrc` or `~/.bashrc`
   - `~/.bash_profile`
   - `.env.local` (if present)

### Building for Production
```bash
# Make sure NODE_ENV is not set
unset NODE_ENV

# Clean and build
rm -rf .next
npm run build
```

### Vercel Deployment
Vercel handles NODE_ENV automatically. Do not set it in:
- Vercel environment variables
- `.env.local`
- Any configuration files

The build will succeed automatically once NODE_ENV is removed from your local environment and not pushed to Vercel.

---

## Build Success Confirmation

When built correctly (without NODE_ENV set), you should see:
```
✓ Compiled successfully
✓ Generating static pages (47/47)
Route (app)                              Size     First Load JS
... (build output)
```

If you see the `<Html>` error, NODE_ENV is still set somewhere.
