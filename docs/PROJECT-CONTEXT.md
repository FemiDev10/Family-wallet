# Family wallet: full project context

Everything about this project in one place: what we were given, what we built, how it works, how it got onto GitHub, and where to pick it up. It's written so a teammate, or a new AI chat, can continue without the original conversation.

Last updated: 31 October 2026.

---

## 1. At a glance

| | |
| --- | --- |
| **What** | A control centre where a family manages every AI agent that can spend its money, and stops any one in a single tap |
| **Where it came from** | ProductTank buildathon, **Challenge 7: One wallet, many AI helpers** (Agentic wallet track) |
| **Team** | Femi (@FemiDev10), Aysegul Sumeyra Kanca (@sumeyramr), Yuki (@Yukidrew65), Stephanie (@stephm) |
| **Repo** | https://github.com/FemiDev10/family-wallet (public, MIT licence) |
| **Stack** | Plain HTML, CSS and JavaScript, plus a tiny Node server. No framework, no build step, no dependencies |
| **Run it** | `node server.js`, then open http://localhost:4321 |
| **Status** | Working prototype on sample data. No real money moves |

### Links

| What | Link | Notes |
| --- | --- | --- |
| Code | https://github.com/FemiDev10/family-wallet | Public |
| Prompts used to build it | [PROMPTS.md](../PROMPTS.md) | With the brief and the reference images |
| Hosted side-by-side demo | https://claude.ai/artifact/RHSMrpBqYeASrrSiYuoncv | A claude.ai artifact on Femi's account. Private until shared from its Share menu |
| Earlier dashboard-only version | https://claude.ai/artifact/8t62YNTanojQDEowubCFN4 | Superseded by the demo above |
| ProductTank write-up | [docs/PRODUCTTANK-WRITEUP.md](PRODUCTTANK-WRITEUP.md) | Full copy in the repo. The original is a claude.ai doc on Femi's account: https://claude.ai/code/artifact/6110cd01-1887-4e1f-ae0d-04fc11015608 |
| Teammates' original phone prototype | https://claude.ai/artifact/C2hyqmskWtU9ohMHQEwNmb | Made by the phone-app teammates. Its palette and fonts were adopted for both screens |

---

## 2. What we were given

### The brief (Challenge 7, verbatim)

**The problem.** Soon one person, family or small team might use five different AIs. One does research, one writes code, one books travel. Each needs its own budget. You need to see what each has spent, and switch one off without affecting the others.

**Your mission.** Design a control centre where a person or small team manages all the AI agents that can spend their money.

**What to do**
1. Pick your user: a family, or a small startup team of 3 to 5 people.
2. List the AI agents they might use and what each one buys.
3. Decide the rules for each agent: how much it can spend per payment and per day, which sellers it can pay, and when its permission ends. These match Vybe's spend key settings.
4. Design the control centre. It should answer three questions at a glance: Which agents can spend my money? What has each one spent this week? How do I stop one right now?
5. For teams: who is allowed to create or change an agent's limits?

**What to hand in:** your user and their list of agents; a clickable prototype or working screen of the control centre; a short demo: add a new agent, check its spending, then switch it off.

**What great looks like.** A new user can switch off one misbehaving agent in under 10 seconds, without help.

**Bonus.** A simple weekly report email or message the owner would receive.

A photo of the handout is in [docs/references/challenge-7-brief.webp](references/challenge-7-brief.webp).

### Our PRD and TRD (by Stephanie, 30 Sept 2026), summarised

**Product principle:** stopping is easy, spending is hard. Any adult can stop any agent in one tap; creating an agent or raising a limit needs the right role.

**User:** a UK family of four sharing one wallet. Amounts are in GBP. A team mode for 3 to 5 people uses the same screens.

**Four rules per agent** (matching the payment provider's spend key settings): max per payment, max per day, allowed sellers (an allowlist, never allowed by default), and when permission ends (required). A day resets at 00:00 UK time, and a week runs Monday to Sunday.

**Control centre requirements**

| ID | Requirement | Priority |
| --- | --- | --- |
| CC-1 | One card per agent: name, icon, sponsor, status (Active, Paused, Expired) | Must |
| CC-2 | Spent this week, today against the daily cap, last payment | Must |
| CC-3 | A red Stop button on every card, with no menu or swipe | Must |
| CC-4 | Stop takes one tap, pauses only that agent, and shows a 5-second Undo | Must |
| CC-5 | A header total for this week across all agents | Must |
| CC-6 | Add Agent: name, what it buys, the four rules, create | Must |
| CC-7 | Agent detail: this week's payments, declines with reasons, edit rules | Must |
| CC-8 | Resume or Revoke a stopped agent | Should |
| CC-9 | Alert at 80% of the daily cap, or on a declined payment | Should |
| CC-10 | Stop all agents, behind a confirm step | Could |

**Roles:** Owner (everything), Admin (create agents; raise limits up to an Owner-set ceiling), Member (stop any agent, resume own, request more), Viewer (see only).

**Two surfaces:** a desktop admin dashboard for Owners and Admins, and a phone app for Members. Grants flow one way, dashboard to phone, and a change should show on the other screen within 2 seconds.

**TRD highlights**
- One Wallet API between people, agents and the payment provider. Agents call `POST /pay`.
- A five-check payment engine, where the first failure wins: agent active → before end date → seller allowed → within per-payment cap → within daily cap.
- Stop sets the agent to paused and freezes its spend key in one transaction, then freezes it at the provider with retries.
- Data model: Wallet, Member, Agent, SpendKey, Seller, Transaction, AuditEvent, LimitRequest.
- Targets: Stop confirmed in under 1 s, isolation (Stop touches only one agent), an atomic daily cap, an append-only audit log, WCAG 2.2 AA.

---

## 3. The team

| Who | GitHub | Worked on |
| --- | --- | --- |
| Femi | [@FemiDev10](https://github.com/FemiDev10) | Admin dashboard, combined both into one system |
| Aysegul Sumeyra Kanca | [@sumeyramr](https://github.com/sumeyramr) | Admin dashboard |
| Yuki | [@Yukidrew65](https://github.com/Yukidrew65) | Phone app |
| Stephanie | [@stephm](https://github.com/stephm) | Phone app (and author of the PRD/TRD) |

**GitHub co-author emails** (GitHub's private noreply addresses, used in `Co-authored-by:` commit trailers):

| Person | Email |
| --- | --- |
| Aysegul Sumeyra Kanca | `60796823+sumeyramr@users.noreply.github.com` |
| Yuki | `133772922+Yukidrew65@users.noreply.github.com` |
| Stephanie | `3534280+stephm@users.noreply.github.com` |

**Collaborator status (as of 18 Oct 2026):** sumeyramr has accepted and has write access. Yukidrew65 and stephm were invited and were pending.

---

## 4. What we built

### The family in the demo

| Person | Role | Internal id in the code |
| --- | --- | --- |
| Parent A (the user presenting) | Owner | `femi` |
| Parent B | Admin, with a £500 raise ceiling | `bunmi` |
| David, 15 | Member, and the phone app user | `ada` |
| Mark, 8 | Viewer | `tobi` |

Names can be changed in the Members screen. The ids stay fixed.

### Seeded agents (with 14 days of generated history)

| Agent | Used by | Per payment | Per day | Allowed sellers |
| --- | --- | --- | --- | --- |
| Research Scout | Parent A | £5 | £15 | FT.com, Nature, JSTOR, Statista API |
| Code Helper | Parent B | £20 | £30 | AWS, Vercel, Anthropic API, GitHub |
| Trip Planner | Parent A | £400 | £800 | LNER, Trainline, British Airways, Booking.com |
| Grocery Runner | Parent B | £120 | £150 | Tesco, Sainsbury's |

Homework Tutor (David: £10 per payment, £20 per day, Revision Hub, PaperStack and Study Books, ends Fri 23 Oct) is created live in the demo with one click.

### Admin dashboard (`dashboard.html`)

- **Overview:** a greeting, and four KPI tiles: spent this week vs last week, agents that can spend now, payments approved or declined, and items needing attention.
- **Agent cards:** status in words and colour, spend this week (counts up), a 7-day sparkline, today against the daily cap (an animated bar), last payment, rule chips, and a red **Stop** button. Paused cards turn grey with "Paused by … at …".
- **Stop:** one tap, with a 5-second Undo toast. It never shows a confirm dialog. **Stop all** has a confirm step.
- **Limits drawer:** sliders and steppers for per payment and per day, a seller picker across every category with "Allow all", an **Any seller** switch, the end date with quick buttons, a preview of changes before saving, this week's payments, and the change log. Revoke needs two taps.
- **Add agent:** three steps (who it is, spend rules, review). The "Who uses it" field defaults to David, and a demo-fill button creates Homework Tutor.
- **Needs you:** limit requests and new-agent requests from David, with Approve, Change limits first and Decline. Alerts at 80% of a cap, on declines, and before an agent expires.
- **Activity:** every payment attempt this week, with filters, plus a change log of who changed what, the old value and the new value.
- **Members:** rename anyone, add a person, remove a person (their agents are paused and moved to the Owner, and their pending requests declined), change roles, and choose who gets the weekly report.
- **Weekly report:** pick the recipients, Send now, and preview the email with a working Stop per agent.
- **Spend chart:** 14 days of stacked bars per agent, with a "This week" band and hover tooltips.
- **Simulate payment:** run any agent, seller and amount through the five checks, with an animated trace.

### Phone app (`phone.html`, David's view)

- **Home:** each agent's money left today, this week's spend, and read-only limits marked "set by Parent A". It shows pending requests, a weekly report card when David is a recipient, and Ask for a new agent.
- **Shop:** items from the agent's allowed shops, plus a few from other shops that will be declined. With Any seller on, every item is shown.
- **Checkout:** confirm → "Processing payment…" → **Payment successful** with an animated tick, "£X debited from <agent>", and a receipt (shop, item, time, reference, left today). A decline gives the reason and says no money was taken, with "Ask Parent A for more".
- **Request more:** a higher per-payment or daily cap, with a reason.
- **Ask for a new agent:** name, what it buys, shop category, suggested caps, and why.
- **Alerts and banners:** paused, restarted, limits changed, shops changed, request decided, weekly report shared or sent, name or role changed.
- **Stop:** David can stop his own agent, but can't resume one a parent paused.
- **Removed state:** if David is removed from the family, the app shows "You've been removed from the family wallet".

### Demo page (`index.html`)

The dashboard on the left and the phone in a phone frame on the right, a five-step demo script in the header, and a **Reset demo** button.

---

## 5. How it works technically

### Files

| File | Role |
| --- | --- |
| `control-centre.html` | **Source** of the admin dashboard. It has no `<html>`/`<head>` wrapper, so it can be hosted as a claude.ai artifact |
| `dashboard.html` | `control-centre.html` wrapped in `<!doctype html><html><head>…</head><body>…</body></html>`, for running locally |
| `demo.html` | **Source** of the side-by-side demo page, also without a wrapper |
| `index.html` | `demo.html` wrapped, for running locally |
| `phone.html` | The phone app, a complete standalone page |
| `server.js` | The sync server and static file server. Node, no dependencies |
| `PROMPTS.md` | The prompts used to build it |
| `docs/references/` | The brief photo, the inspiration screenshots, and the limits-panel screenshot |
| `docs/PRODUCTTANK-WRITEUP.md` | The ProductTank write-up |
| `tools/build.py` | Regenerates `dashboard.html` and `index.html` from their sources |

**Important:** when you change `control-centre.html` or `demo.html`, run `python3 tools/build.py` to regenerate `dashboard.html` and `index.html`. The wrapper inserts `<!doctype html>`, `<html lang="en"><head><meta charset="utf-8"><meta name="viewport" …>`, moves everything up to the end of the first `</style>` into `<head>`, and puts the rest in `<body>`.

### Shared state

Both apps read and write one JSON record under the localStorage key `fw-state-v1`:

```
{
  agents:    [{ id, name, purpose, icon, color, cat, sponsor, perPayment, perDay,
                sellers[], anySeller, expires, status, pausedBy, pausedAt }],
  tx:        [{ id, agent, seller, item, amount, ok, reason, t, via, ref }],
  audit:     [{ who, act, target, before, after, t, kind }],
  requests:  [{ id, agent, by, field: 'perPayment'|'perDay'|'seller'|'newAgent',
                from, to, proposal?, note, status, decided, dt, granted }],
  members:   [{ id, name, short, ini, role, note, color }],
  reportTo:  [memberId…],
  reportSent:{ t, to[] } | null
}
```

Dates are serialised as ISO strings and revived on load for the keys `expires`, `pausedAt`, `t` and `dt`. `status` is one of `active`, `paused`, `expired` or `revoked`.

### Sync: three channels, all used at once

1. **Same browser:** `localStorage` + `BroadcastChannel('fw-sync')`, plus a 1.5-second localStorage poll as a fallback.
2. **Demo page:** each iframe posts `{fw:'state', str}` to its parent, which relays it to the other iframe.
3. **Sync server:** `GET /api/state`, `POST /api/state`, `POST /api/reset`, and the event stream at `GET /api/events`. This lets a real phone on the same WiFi join in.

Loop protection: each screen ignores a state string identical to the last one it saved or received. When a screen receives state, it also writes it to localStorage, so the poll can't bring back older data. The dashboard re-sends after taking the server's state, so the demo page's phone never keeps stale seed data.

### The payment engine (in both apps)

Five checks run in order, and the first failure is the reason shown:
1. Agent is active (`Agent stopped`, or `Permission ended` if expired)
2. Now is before `expires` (`Permission ended`)
3. `anySeller` is on, or the seller is in `sellers` (`Seller not allowed`)
4. amount ≤ `perPayment` (`Over per-payment cap (£X)`)
5. today's approved total + amount ≤ `perDay` (`Over daily cap (£X)`)

Every attempt is stored in `tx`, declines included.

### Design system (matches the teammates' phone prototype)

- Background `#EEF1F6`, cards white, ink `#17203A`, muted text `#5B6682`, indigo accent `#3F51D8`, good `#1E8A58`, warning `#A86300`, stop red `#D23B3B`.
- Fonts: **Bricolage Grotesque** for display, **Figtree** for body (Google Fonts).
- Rules: Stop is labelled "Stop", is red, is at least 44 px, and sits on the card. Status uses words and colour. Plain words are used everywhere.

---

## 6. Build timeline

| Date (2026) | What happened |
| --- | --- |
| 30 Sep | First admin dashboard: a dark theme inspired by four reference dashboards, with agent cards, Stop and Undo, limits, add agent, chart, activity, members and weekly report |
| 30 Sep | Re-skinned to white to match the teammates' phone prototype. The payment provider's name removed and the layout simplified |
| 30 Sep | David's phone app added, synced live with the dashboard. Side-by-side demo page |
| 30 Sep | Sync rebuilt (relay + sync server). Agents default to David. Shops from every category. Children named David and Mark |
| 30 Sep | Weekly report recipients, add/rename/remove members, Any seller |
| 30 Sep | Ask for a new agent from the phone. Spend limits explained with a real-life example |
| 30 Sep | Real checkout on the phone. Fixed the grey-overlay bug |
| 14 Oct | ProductTank write-up created as a claude.ai doc |
| 14–15 Oct | Prepared for open source: README, MIT licence, contributing guide. Moved to its own public repo with history. Team credited |
| 15–18 Oct | Teammates' usernames collected and verified, co-authors added, collaborators invited. PROMPTS.md written with the reference images |

### Bugs found and fixed

| Bug | Cause | Fix |
| --- | --- | --- |
| Agents added on the dashboard didn't appear on the phone | New agents defaulted to Parent A, and the phone only shows David's agents | Default "Who uses it" to David, with a hint |
| Phone showed old data in the side-by-side demo | The storage poll re-applied stale seed data | Write received state to localStorage; re-send after loading the server's state |
| David couldn't buy the study items | The phone shop always listed study shops, whatever the agent allowed | Build the shop from the agent's own sellers |
| A new agent could clash with an old one after a reload | The id counter reset on reload | Random ids |
| "−£10" buttons showed "£10" | A missing minus sign | Fixed the label |
| Buying showed only a grey overlay | Inside a short frame, the phone grew taller than the screen and the sheet opened off-screen | A flex layout with a height cap, and `overflow: clip` |

### Testing

Playwright scripts drove the full demo with the dashboard and phone in two separate browser contexts, as if on two devices. They checked that each action shows on the other screen: create an agent, a declined purchase, a request, approval, a successful purchase, Stop, report sharing, renaming, removal, and Any seller.

---

## 7. How it got onto GitHub

1. The prototype was first built in a folder (`hackathon/agent-wallet`) inside a separate private repository.
2. Femi created the empty public repo `FemiDev10/family-wallet`.
3. The folder was split out with `git subtree split --prefix=hackathon/agent-wallet`, which keeps the project's own commit history, and pushed as `main`. Nothing from the other repository came across.
4. The team was credited in the README and with `Co-authored-by:` trailers. An account called "stepm" was credited by mistake (it belongs to someone else). That trailer was removed by amending the commit and force-pushing, and the correct account is **stephm**.
5. Collaborators were invited from Settings → Collaborators.

Note: an early commit's README briefly linked to `@stepm`. It doesn't credit that account.

---

## 8. What's mocked and what's next

**Mocked:** no real money, products or payment provider; history is generated; there are no logins (the dashboard is always Parent A, the phone always David); state lives in the browser and the server's memory and resets when the server restarts.

**Next steps (also in CONTRIBUTING.md):**
- Team mode for startups of 3 to 5 people
- Send the weekly report by email on Mondays at 08:00, with single-use Stop links
- Sign-in and server-side role checks
- A real payment provider, with one spend key per agent and Stop freezing it there
- Persistent storage
- The usability test: five newcomers each asked to "Stop the Code Helper", all under 10 seconds

---

## 9. Continuing in a new AI chat

Open a session on this repo and paste:

> This is Family wallet (https://github.com/FemiDev10/family-wallet), a prototype from a ProductTank buildathon. Read `docs/PROJECT-CONTEXT.md` first for full context, then `PROMPTS.md`. The admin dashboard source is `control-centre.html` (regenerate `dashboard.html` from it after edits), the phone app is `phone.html`, and `node server.js` runs it at http://localhost:4321. Credit teammates with the `Co-authored-by` lines in the context file. My next change is: …
