# Where we are

> **Read this before acting on anything below.** Every fact in this file is dated and may
> be stale. It records what was true when it was checked, not what is true now. Anything
> outside this repo moves without a commit here to show it, so re-check it first:
>
> ```sh
> git ls-remote --heads --tags origin | tail -5   # what the remote actually has
> git rev-list --left-right --count origin/main...main   # left = behind, right = unpushed
> git status -sb
> curl -sS -o /tmp/live.html -w '%{http_code}\n' "https://fletcherbonds.com/?cb=$(date +%s)"
> grep -o '/assets/[^"]*' /tmp/live.html | sort   # live asset names; compare per HOWTOSAVESTATE.md
> ```
>
> The rest of the checks, and the procedure for updating this file at the end of a session,
> are in `HOWTOSAVESTATE.md`. Stored memories load before any file and go stale the same
> way: check them against the repo rather than trusting them.

Updated 2026-11-11. Working state for fletchweb, the source of fletcherbonds.com. There is
no design document or roadmap. `SETUP.md` is the closest thing to a design description,
and the live site is the public documentation. This file is neither.

## Standards

How work is done here, and why. Each one carries its reason, or it reads as taste and gets
dropped under time pressure. In this template the reason is the failure that produced it,
except rule 4, which carries two occasions it caught something before it was built, and rule
10, which says plainly that no failure sits behind it.

The examples below come from the project this kit was built in. **Replace each with your own
the first time this project produces one**, since a local failure argues better than a
borrowed one. Do not delete an example and leave a bare rule behind.

**1. No check counts as verified until it has been shown failing on deliberately broken
input, and the report says what was broken.** A check that cannot fail is not evidence, and
it is indistinguishable from a passing one in the report. Three checks were once reported as
verification when none of them could fail, and a guard test written to catch a drifted
dependency tree was invalid because the build regenerated what had been stripped to break
it.

**2. Never verify through a path that can resolve to your own development copy.** The
failure is not that the check was wrong; it is that the check never looked at the thing
being shipped. A linked or globally installed copy, a symlinked directory, a dev server
still running, a mounted volume, a cached build, a tool that falls back to a local default:
each of these will answer as though it were the artifact. Name the path explicitly, resolve
it, and prove the resolved path is the one you meant, inside the location you meant. A
release once shipped a broken binary through four separate checks, every one of which
silently resolved to the working copy rather than to what users would download.

**3. Check claims against the artifact, not the description of it.** The published file, the
fetched page, the built package. Not a commit message, a changelog, a dashboard label, or
this file. A published page told readers that a shipped file had five entries. It had eight.
The page was correct when written and was falsified by a build change nobody re-read it
against.

**4. Proposal before code, for anything with a surface.** A command, a flag, an API, a
schema, a page, a public string. Show the surface and wait for approval before writing the
implementation. It is cheaper to reject a design than a branch, and it has already caught a
feature that should not have existed and a scope that would have overpromised, both before
anything was built.

**5. Stage explicitly.** Never `git commit -am`, `git add -A` or `git add .`. Run `git add`
with the paths, confirm with `git diff --cached --stat`, then commit. Check first whether the
tree already holds approved but uncommitted work from an earlier step. One commit swept an
unrelated file rewrite in under a message that described neither change, and it took a diff
of the wrong file to notice.

**6. Describe contents and order, not counts and pagination.** A count derived from another
file, or a reference to a page number, goes stale silently when something else changes. Three
sentences describing a document's pagination broke at once when a single table row was added
to a page ahead of them, and one of them sent a reviewer backwards past the thing it cited.

**7. Say what was not checked**, rather than leaving it out, and say where a fact came from.
An omission reads as a verified negative. A disclosure was read off a public listing page
rather than off the form that produces it, and because the source went unstated it produced a
full analysis of a conflict that did not exist.

**8. Never point at the conversation.** A cold session can read every file here and none of
the chat. "As discussed", "per the earlier decision", "recover it from the conversation" are
dead ends. A saved note once told a future session that four agreed items "were agreed but
not restated; recover them from the original list", and the original list was a chat log. The
four were nearly lost and had to be rebuilt from the README, the changelog and the git log.
Write it out where it belongs, or record in plain words that it is lost.

**9. Check stored memories against the repo.** They load before any file is read, so a stale
memory outranks a correct `NEXT.md`. Anything a memory asserts about a file, a branch, a flag
or a version is checkable; check it rather than assuming it still holds. Two were wrong
within one week: one described a branch rebase that had never been done, and the other a tool
setup that had been replaced months earlier.

**10. One item at a time: show the diff, wait for approval.** Commit and push only when
asked. **No failure sits behind this one.** It is a working agreement rather than a scar: it
keeps a wrong direction visible while it is still cheap to change, and batching removes that
moment.

<!-- Add project-specific standards here as they are earned, with the reason. -->

## Traps

Things that cost time once and would cost it again: a tool that lies, a check that cannot
fail, an environment that behaves differently here. Add one the same session it bites,
with enough detail to recognise it, not just to remember it happened.

Start with these questions. Answer each for this project. An answer of "none" is a claim like
any other fact in this file, so it carries the date and how it was checked. Write "not known
yet" if you cannot tell. Do not delete one. Specific traps go below them.

- Which dashboard or console here lags, and by how much? Not known yet. The Netlify
  dashboard has not been read (2026-11-07).
- Which listing shows the published state and hides the pending one? Not known yet.
- Which registry reports metadata that differs from the artifact? None. Nothing is
  published to a registry: `package.json` has `"private": true` (read 2026-11-07).
- Which cache can serve an old copy? Netlify's CDN and the browser can serve an old
  `index.html`, so fetch with a `?cb=` cache buster. `/assets/*` is cached for a year
  (`netlify.toml`), which is safe only because Vite puts a content hash in each asset
  filename. Not tested against a real stale copy (2026-11-07).

**Any file in the repo can change the built CSS and JS.** Tailwind v4 scans the project
for class names, Markdown included, so a docs-only commit changes `index-*.css`, and the
entry JS hash changes with it. Shown on 2026-11-11: an export of `54271d0` built
`index-BJYIQj-U.css` and `index-DAWyMMHO.js`; the same export with `NEXT.md` added built
`index-AK_RcK26.css` and `index-CI1GMlpp.js`. A changed asset name after a push therefore
does not mean the site's code changed.

**A missing asset returns 200.** The `/*` to `/index.html` redirect in `netlify.toml` serves
`index.html` with status 200 for any path, including a deleted `/assets/` file. Seen
2026-11-11 fetching the 2026-11-07 `index-Vl2llGIU.js`. Check content, not status.

**The Web3Forms key is compiled into the JS.** `VITE_WEB3FORMS_ACCESS_KEY` is inlined at
build time from `src/components/Chatbot.jsx` and `src/components/ContactForm.jsx`, so the
JS only matches between two builds made with the same key.

## Decided, do not redo

What was settled and why, what was ruled out and why, and anything the owner said not to
do. A resumed session that sees only the remaining tasks will rebuild something already
rejected, or argue for an option already refused.

An entry here is not rewritten. To change a decision, get the owner's approval, then add a
new entry with its date, its reasoning and the entry it replaces. The only edit to the old
entry is one added line saying what replaced it and when.

**2026-11-07: adopt project-kit.** Fletcher chose to bring in the files from
https://github.com/fbonds/project-kit (`template/`, commit c1e240d) so sessions start from a
written state rather than re-explaining the project. All ten standards kept, none deleted.
The Writing section in `CLAUDE.md` kept, because the site has public prose. The optional
`.claude/settings.json` (push and broad-add deny rules, SessionStart hook) included, with
the knowledge that this repo is public and the file will be visible.
Committed as `3b8f51f` and pushed by Fletcher; seen on `origin/main` after `git fetch` on
2026-11-10.

## In flight

What is being worked on now, and what state it is in. Remove an item when it is finished,
because the git log holds it. Before removing it, move what the git log cannot hold: a
release or deploy goes to the Committed, pushed, released section, with its date and how it
was checked, and anything else, such as a change made on a hosted service, goes to the
section it belongs in.

Nothing in flight as of 2026-11-11.

## Queued, unscheduled, and not to be started unprompted

What is agreed but waiting, with a pointer to wherever the full proposal is written out.

Nothing queued as of 2026-11-11.

## Committed, pushed, released: three separate questions

As of 2026-11-11, when this was written.

**Uncommitted.** Nothing but this save-state commit, approved by the request to save state.

**Unpushed.** Answer with `git rev-list --left-right --count origin/main...main`. Snapshot
on 2026-11-11 after `git fetch`: `0 0` with `origin/main` at `0eb1b7d`, so Fletcher has
pushed both project-kit commits. The save-state commit that wrote this line makes it `0 1`. Do not trust this: Fletcher pushes, and that moves with no commit here.

**Unreleased or undeployed.** Nothing. On 2026-11-11 `https://fletcherbonds.com/?cb=...`
returned 200 and served `index-CI1GMlpp.js`, `index-AK_RcK26.css` and
`me-transparent-bkgrnd-aLNSf3yJ.png`. A local `npm ci && npm run build` of `0eb1b7d` (Node
22.20.0, no `.env`) produced the same three names, and `cmp` found the live JS and CSS
byte-identical to `dist/`. Shown failing: a build of `54271d0` produced
`index-BJYIQj-U.css` and `index-DAWyMMHO.js`, which the comparison reports as different.
The image was compared by name only.

On 2026-11-07 the live site served `index-BJYIQj-U.css`, which matches a local build of
`54271d0`, but `index-Vl2llGIU.js`, which does not (local gives `index-DAWyMMHO.js`). That
file is gone from the live site, so the difference cannot be inspected now. One possible
cause is a non-empty key in that build; not established.

## Open, not blocking

Anything known, unresolved, and not in the way.

Found by reading the code on 2026-11-07 unless dated otherwise. None has been fixed or
tested in a browser.

- **Contact form and chatbot feedback send an empty key in production.** The live JS
  fetched on 2026-11-11 contains `access_key:""` in both Web3Forms calls. Netlify is
  building without `VITE_WEB3FORMS_ACCESS_KEY`, or under another name. What Web3Forms
  does with an empty key was not tested: that means submitting to the live service. The
  Netlify environment settings have not been read.

- **Chatbot keyword bug.** The AI/ML branch in `generateResponse`
  (`src/components/Chatbot.jsx`) runs first and matches the substrings `ai` and `ml`
  anywhere, so "what's your email?", "available", "detail", "html" and "xml" get the AI/ML
  answer.
- **Node version.** `netlify.toml` sets `NODE_VERSION = "18"`, and Vite 7 requires Node
  20.19 or later. Netlify did build `0eb1b7d` (live matches it, 2026-11-11), so something
  overrides 18 or the requirement did not bite. The Netlify build log has not been read.
- **Location disagrees.** `index.html` and `src/components/SEO.jsx` say Seattle, WA.
  `src/components/Chatbot.jsx` says Gig Harbor, WA.
- **`README.md`** is the stock Vite template text.
- **`public/sitemap.xml`** lists `#about`, `#testimonials` and `#contact` as separate URLs,
  which search engines treat as the home page, and every `lastmod` is 2025-11-04.
- **Phone number is public**, in `workandrecs.txt`, the resume PDF and the chatbot
  knowledge base. Possibly intended; not asked.
