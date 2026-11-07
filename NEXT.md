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

Updated 2026-11-07. Working state for fletchweb, the source of fletcherbonds.com. There is
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

**The JS bundle hash includes the Web3Forms key.** `VITE_WEB3FORMS_ACCESS_KEY` is read
through `import.meta.env` in `src/components/Chatbot.jsx` and
`src/components/ContactForm.jsx`, and Vite inlines it at build time. A local build without
the same key as Netlify will produce a different `index-*.js` name than the live site, which
looks like an undeployed change when it is not. Compare the CSS and image names instead.
Inferred from the code on 2026-11-07, not yet shown by a build.

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

## In flight

What is being worked on now, and what state it is in. Remove an item when it is finished,
because the git log holds it. Before removing it, move what the git log cannot hold: a
release or deploy goes to the Committed, pushed, released section, with its date and how it
was checked, and anything else, such as a change made on a hosted service, goes to the
section it belongs in.

- **Adopting project-kit.** `CLAUDE.md`, `HOWTOSAVESTATE.md`, `NEXT.md` and
  `.claude/settings.json` are written and approved step by step, not yet committed. The
  build half of the deploy check in `HOWTOSAVESTATE.md` (`npm ci && npm run build`) has not
  been run.

## Queued, unscheduled, and not to be started unprompted

What is agreed but waiting, with a pointer to wherever the full proposal is written out.

Nothing queued as of 2026-11-07.

## Committed, pushed, released: three separate questions

As of 2026-11-07, when this was written.

**Uncommitted.** The four project-kit files above, each approved by Fletcher. Nothing else
in the working tree.

**Unpushed.** Answer with `git rev-list --left-right --count origin/main...main`. Snapshot
after `git fetch` on 2026-11-07: `0 0`, last commit `54271d0` ("navigation and seo
improvements"). Do not trust this: Fletcher pushes, and that moves with no commit here.

**Unreleased or undeployed.** On 2026-11-07 `https://fletcherbonds.com/?cb=...` returned
HTTP 200 from Netlify, serving `/assets/index-Vl2llGIU.js`, `/assets/index-BJYIQj-U.css`
and `/assets/me-transparent-bkgrnd-aLNSf3yJ.png`. Whether that is a build of `54271d0` was
not checked: no local build has been made to compare against.

## Open, not blocking

Anything known, unresolved, and not in the way.

Found by reading the code on 2026-11-07. None has been fixed or tested in a browser.

- **Chatbot keyword bug.** The AI/ML branch in `generateResponse`
  (`src/components/Chatbot.jsx`) runs first and matches the substrings `ai` and `ml`
  anywhere, so "what's your email?", "available", "detail", "html" and "xml" get the AI/ML
  answer.
- **Node version.** `netlify.toml` sets `NODE_VERSION = "18"`, and Vite 7 requires Node
  20.19 or later. Whether a Netlify dashboard setting overrides it is not known; the
  Netlify build log has not been read.
- **Location disagrees.** `index.html` and `src/components/SEO.jsx` say Seattle, WA.
  `src/components/Chatbot.jsx` says Gig Harbor, WA.
- **`README.md`** is the stock Vite template text.
- **`public/sitemap.xml`** lists `#about`, `#testimonials` and `#contact` as separate URLs,
  which search engines treat as the home page, and every `lastmod` is 2025-11-04.
- **Phone number is public**, in `workandrecs.txt`, the resume PDF and the chatbot
  knowledge base. Possibly intended; not asked.
