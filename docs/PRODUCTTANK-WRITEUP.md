# One Wallet, Many AI Helpers: Family Wallet Build

The ProductTank write-up, as of 14 October 2026. The original was a claude.ai doc; this copy keeps it with the code. The two diagrams from the doc are described in words.

## TL;DR

We built **Family wallet**: one shared wallet where a parent controls every AI agent that can spend the family's money, and can stop any one of them in a single tap.

It is two working screens that sync live. Parent A gets a desktop **admin dashboard** to create agents, set budgets, approve requests and stop spending. David, 15, gets a **phone app** where his agents buy things inside those limits and he can ask for more.

Everything runs in the browser on sample data, with a tiny Node server so a real phone on the same WiFi can join the demo. No real money moves.

- Live demo (side by side): [Family wallet demo](https://claude.ai/artifact/RHSMrpBqYeASrrSiYuoncv)
- Code (open source, MIT): [github.com/FemiDev10/family-wallet](https://github.com/FemiDev10/family-wallet)

## What we were given

We took **Challenge 7: One wallet, many AI helpers** on the Agentic wallet track. The brief, as handed out:

**The problem.** Soon one person, family or small team might use five different AIs. One does research, one writes code, one books travel. Each needs its own budget. You need to see what each has spent, and switch one off without affecting the others.

**Your mission.** Design a control centre where a person or small team manages all the AI agents that can spend their money.

**What to do**

1. Pick your user: a family, or a small startup team of 3 to 5 people.
2. List the AI agents they might use and what each one buys.
3. Decide the rules for each agent: how much it can spend per payment and per day, which sellers it can pay, and when its permission ends.
4. Design the control centre. It should answer three questions at a glance: Which agents can spend my money? What has each one spent this week? How do I stop one right now?
5. For teams: who is allowed to create or change an agent's limits?

**What to hand in**

- Your user and their list of agents
- A clickable prototype or working screen of the control centre
- A short demo: add a new agent, check its spending, then switch it off

**What great looks like.** A new user can switch off one misbehaving agent in under 10 seconds, without help.

**Bonus.** A simple weekly report email or message the owner would receive.

Our team turned this into a PRD and TRD (by @Stephanie, 30 Sept 2026). Its product principle drove every design call: **stopping is easy, spending is hard.** Any adult can stop any agent in one tap; creating an agent or raising a limit needs the right role.

We were also shown four dashboard designs as visual references: dark, card-based layouts with big numbers, sparklines and clear status pills.

## Our user and their agents

Our user is a UK family of four sharing one wallet. All amounts are in pounds (£).

| Person | Role | What they can do |
| --- | --- | --- |
| Parent A | Owner | Everything: create agents, set any limit, add, rename or remove family members |
| Parent B | Admin | Create agents and raise limits up to a £500 ceiling set by the Owner |
| David, 15 | Member | Uses his agents on the phone, stops his own, asks for more |
| Mark, 8 | Viewer | No access in this version |

The family runs these agents. Homework Tutor is created live during the demo, and David can ask for new ones from his phone.

| Agent | Used by | What it buys | Per payment | Per day | Allowed sellers |
| --- | --- | --- | --- | --- | --- |
| Research Scout | Parent A | Paywalled articles, data API credits | £5 | £15 | FT.com, Nature, JSTOR, Statista API |
| Code Helper | Parent B | Cloud hosting, API credits, dev tools | £20 | £30 | AWS, Vercel, Anthropic API, GitHub |
| Trip Planner | Parent A | Train and flight tickets, hotels | £400 | £800 | LNER, Trainline, British Airways, Booking.com |
| Grocery Runner | Parent B | Weekly food shop | £120 | £150 | Tesco, Sainsbury's |
| Homework Tutor | David | Revision apps, e-books, practice papers | £10 | £20 | Revision Hub, PaperStack, Study Books |

Every agent has exactly four rules, matching the brief: **max per payment**, **max per day**, **allowed sellers**, and **when permission ends**. The seller list is an allowlist, so any shop not ticked is declined. A parent can also switch on **Any seller** for an agent that should be able to shop anywhere; the money caps still apply.

In real life: Code Helper pays Vercel £12 at 9am (approved). At 11am it tries AWS £45 and is declined, because that is over the £20 per-payment cap. At 2pm it pays £15 for API credits, making £27 today. At 4pm a £8 GitHub charge is declined, because £35 would break the £30 daily cap. The worst it can ever cost the family is £30 a day.

## How it works

The home screen answers the brief's three questions at a glance: one card per agent with its status, what it spent this week, and a red **Stop** button on the card itself.

### Admin dashboard (Parent A)

| Area | What it does |
| --- | --- |
| Agent cards | Name, who uses it, status in words and colour, spend this week, today against its daily cap, last payment, a 7-day sparkline |
| Stop | One tap pauses only that agent, with a 5-second Undo. The card turns grey: "Paused by Parent A at 18:42". No confirm dialog; Undo is the safety net |
| Limits panel | Sliders and +/− steppers for per payment and per day, a seller picker across every category with "Allow all", Any seller switch, end date. Shows the changes before you save |
| Add agent | Three steps: who it is, spend rules, review. Will not save without an end date |
| Needs you | David's requests (raise a limit or create a new agent) with Approve, Change limits first, Decline. Alerts at 80% of a daily cap, on declines, and before an agent expires |
| Activity | Every payment attempt this week with the decline reason, plus a change log of who changed what, old value and new value |
| Members | Rename anyone, add someone to the family, remove a member (their agents are paused and moved to the Owner), change roles |
| Weekly report | The Monday email, with a working Stop button per agent. Pick which family members receive it; Send now |
| Stop all | Emergency pause of every agent, behind a confirm step |

### Phone app (David)

| Area | What it does |
| --- | --- |
| Home | His agents: money left today, this week's spend, his limits shown read-only as "set by Parent A" |
| Shop | Items from his allowed shops, plus a few from shops he is not allowed to use, to show the rules working |
| Checkout | Confirm, then Processing, then **Payment successful** with the amount debited and a receipt (shop, item, time, reference, left today). A decline says why and that no money was taken |
| Request more | Ask for a higher per-payment or daily cap, with a reason |
| Ask for a new agent | Name, what it buys, where it would shop, suggested caps, why |
| Alerts | Every change Parent A makes: paused, restarted, limits changed, request decided, weekly report shared |
| Stop | He can stop his own agent. He cannot restart one a parent paused |

### The payment rules engine

Every payment passes five checks in order, and the first failure is the reason shown. The same engine runs on both screens.

*Diagram in the original doc: "A payment goes through only if all five checks pass".* Five checks run left to right, ending in **Paid**:

1. Agent on (not stopped)?
2. Before its end date?
3. Seller on the list?
4. Within the per-payment cap?
5. Today's total within the daily cap?

A "no" at any check drops down to a red decline: agent stopped, permission ended, seller not allowed, over the per-payment cap, or over the daily cap.

A declined attempt moves no money but is still logged, so the parent sees exactly what the agent tried and why it was blocked. Stop works by failing check 1, which is why stopping one agent can never affect another.

## How we built it

We built it in one sitting with Claude Code as a pair programmer, as plain HTML, CSS and JavaScript: no framework, no build step, no install.

| File | What it is |
| --- | --- |
| `index.html` | The demo page: dashboard on the left, phone in a phone frame on the right |
| `dashboard.html` | Parent A's admin dashboard |
| `phone.html` | David's phone app |
| `server.js` | A sync server in Node with no dependencies (about 30 lines). Serves the files and shares state between devices |
| `control-centre.html`, `demo.html` | The same pages packaged for the hosted demo link |

**Shared state.** Both screens read and write one JSON record: agents, payments, change log, requests, family members and who gets the weekly report. Every change is saved and sent out at once. Each screen ignores a copy identical to what it already has, so updates never bounce back and forth.

**Design choices**

- Plain words over system words: the button says **Stop**, not Disable or Revoke, so a new user finds it unaided.
- Status is shown in words and colour, never colour alone. Stop buttons are at least 44 px tall, red, on the card.
- No confirm dialog on a single Stop; a 5-second Undo is the safety net. Stop all does ask first.
- We started with a dark theme inspired by the reference dashboards, then switched to white to match our teammate's phone prototype: same palette and fonts (Bricolage Grotesque and Figtree).
- Motion has a job: numbers count up, budget bars fill, a stopped card fades to grey, a payment draws a green tick.

**Testing.** We scripted the full demo with Playwright: the dashboard and phone in two separate browser sessions, as if on two devices, checking that each action shows on the other screen. That caught three real bugs before the demo: a race when both screens load at once, an ID clash after reloads, and the payment screen opening off-screen inside the phone frame.

**How it evolved during the day**

1. A dark admin dashboard with agent cards, Stop, limits, add agent and a weekly report.
2. Re-skinned to white to match the phone app; all mentions of the payments provider removed.
3. Added David's phone app, synced live with the dashboard.
4. Made sync reliable across tabs, frames and real devices with the sync server.
5. Sellers from every category with Allow all, plus an Any seller switch.
6. Family members: rename, add, remove. Weekly report recipients, shown on David's phone when he is picked.
7. David can ask for a new agent; Parent A approves, edits or declines it.
8. A real checkout on the phone: confirm, processing, payment successful with a receipt.

### Live sync between the two screens

*Diagram in the original doc: "Every change reaches the other screen through whichever channel is available".* The admin dashboard (Parent A, laptop: creates, limits, stops) and the phone app (David, phone: buys, asks, gets alerts) are connected through three channels:

- **Same browser:** localStorage + BroadcastChannel (two tabs or two windows)
- **Side-by-side demo page:** relays messages between frames (what we presented on stage)
- **Sync server (`node server.js`):** pushes each change to every device (a real phone on the same WiFi)

Each screen sends every change down all three channels at once and keeps whichever copy arrives first; a change shows on the other screen in about a second.

## Demo script

The demo runs in about two minutes with the dashboard and David's phone side by side. It covers the brief's hand-in: add a new agent, check its spending, then switch it off.

1. **Dashboard:** Add agent, then "Fill in the demo: Homework Tutor for David": £10 per payment, £20 per day, three study shops, ends Fri 23 Oct. Create it. It appears on David's phone with a notification.
2. **Phone:** David opens Shop and buys the £15 GCSE Maths revision bundle. It is declined: over the £10 per-payment cap, no money taken.
3. **Phone:** he taps Ask Parent A for more and requests £20. The request lands under Needs you on the dashboard.
4. **Dashboard:** Parent A approves £15, not £20. David's cap updates on the phone straight away.
5. **Phone:** he buys the bundle again. Payment successful, £15.00 debited. The dashboard shows "David paid £15.00" and the agent's spend goes up.
6. **Dashboard:** Parent A taps Stop on Homework Tutor. The phone shows "Paused by Parent A" and blocks every purchase. The other four agents stay active.
7. **Bonus:** open Weekly report, tick David, and it appears on his phone.

Press Reset demo before each run to start from clean sample data.

## Run it, what's mocked, what's next

It runs on any laptop with Node installed, and nothing needs installing:

```bash
git clone https://github.com/FemiDev10/family-wallet.git
cd family-wallet
node server.js
```

Then open `http://localhost:4321` for the side-by-side demo. To use a real phone, open the "Phone (WiFi)" address the server prints on a phone on the same WiFi.

**What is mocked**

- No real money moves. Payments, shops and products are sample data, and the history is generated.
- The payment provider is not connected. In a real build, each agent would hold its own spend key at the provider with the same four rules as a second line of defence.
- No logins: the dashboard is always Parent A and the phone is always David.
- State lives in the browser and in the sync server's memory, so it resets when the server restarts.

**What we would build next**

- Connect a real payment provider, so Stop also freezes the agent's spend key there.
- Proper sign-in and server-side role checks, so the phone can never grant itself anything.
- Send the weekly report by email every Monday at 08:00, with single-use Stop links.
- A team mode for startups of 3 to 5 people, using the same screens and roles.
- Run the brief's success test: 5 people who have never seen the app, each asked to "Stop the Code Helper", all under 10 seconds.

## The team and how to contribute

Family wallet was built by a team at the ProductTank buildathon, and it is now open source under the MIT licence so any of us, or anyone who saw the demo, can keep building it.

| Who | GitHub | Worked on |
| --- | --- | --- |
| Femi | [@FemiDev10](https://github.com/FemiDev10) | Admin dashboard, combined both into one system |
| Aysegul Sumeyra Kanca | [@sumeyramr](https://github.com/sumeyramr) | Admin dashboard |
| Yuki | [@Yukidrew65](https://github.com/Yukidrew65) | Phone app |
| Stephanie | [@stephm](https://github.com/stephm) | Phone app |

To contribute, fork [the repo](https://github.com/FemiDev10/family-wallet), run `node server.js`, and open a pull request. The contributing guide lists good first pieces of work: team mode for startups, a real weekly email, sign-in with server-side roles, a real payment provider, and the 10-second Stop usability test.
