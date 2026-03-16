---
name: Always create new versioned HTML file for each change
description: Never edit existing prototype HTML files; always create a new tod_vNN.html and update vercel.json
type: feedback
---

Always create a new versioned file (e.g., tod_v30.html, tod_v31.html) for every set of changes. Never edit an existing versioned HTML file directly.

**Why:** Each version should be preserved as a snapshot. Editing tod_v29.html directly breaks the version history.

**How to apply:**
1. Copy the latest vNN.html → v(N+1).html
2. Make all changes in the new file
3. Update vercel.json redirect to point to the new file
4. Commit as vNN
