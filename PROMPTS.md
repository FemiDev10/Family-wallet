# How we built it with Claude

Family wallet was built in a Claude Code session, with Claude as a pair programmer. These are the prompts we used, in order, lightly tidied for typos, with what each one produced. Anyone can reuse them to rebuild or extend the project.

## What we gave Claude up front

- A photo of the **Challenge 7 brief**: "One wallet, many AI helpers"
- Our team's **PRD and TRD** (product and technical requirements), pasted in full
- Four screenshots of **dashboards we liked**, as visual inspiration: dark, card-based layouts with big numbers, sparklines and status pills

## The prompts

### 1. The admin dashboard

> I'm part of the team building this, and I want to build the dashboard: the admin that solely controls this. I can limit or increase their budgets, etc. This is a hackathon, so be fast. I love good UIs, not generic AI, and I've attached dashboard UIs I love, so get inspiration from them. Make it simple to understand, but make the UI lovely and add nice animations.

**Result:** a single-page admin dashboard with agent cards, a one-tap Stop with Undo, a limits panel, a three-step Add agent flow, a spend chart, alerts, an activity log, members and roles, and a weekly report.

### 2. Match our phone app

> Make it white, we aren't using Vybe, and make it simple. We have an app: [link to our phone prototype]

**Result:** re-skinned to the phone prototype's palette and fonts, the payment provider's name removed, and the layout simplified.

### 3. Two screens working together

> We're presenting the mobile app and the dashboard. The mobile app can buy things with the limit I give him, and I can see what he buys and what he does. I can give him a limit, see the review, and suspend him. So I need two different screens, dashboard and phone, working together.

**Result:** a phone app for the teenager, synced live with the dashboard, plus a side-by-side demo page.

### 4. Bug: sync

> When I add something on the admin, it doesn't show on the teenager's phone.

**Result:** new agents default to the teenager, and the sync was rebuilt to work across tabs, frames and real devices, with a small sync server.

### 5. Shops and names

> Why can't they buy the GCSE maths bundle, chemistry papers, An Inspector Calls e-book, etc.? Put in an option to allow multiple sellers, and use the children's names, say David and Mark.

**Result:** the phone shop shows items from the agent's allowed shops, and a seller picker covers every category with "Allow all". The children are named David and Mark.

### 6. Weekly report and family members

> I should be able to send the weekly report to some members of the family and choose who gets it. If I say David can see it, he sees it on his phone. I should be able to remove a member of the family, or add a name, e.g. give Parent B a name.

**Result:** weekly report recipients that show on David's phone, plus add, rename and remove members.

### 7. Any seller

> When I add an agent, let me select an option for it to buy from all sellers.

**Result:** an "Any seller" switch on Add agent and on the limits panel.

### 8. Request a new agent, and explain the limits

> Let David request a new agent from the phone. Also explain this spend limit stuff to me in a real-life scenario.

**Result:** "Ask for a new agent" on the phone, with Approve, Change limits first and Decline on the dashboard. Claude also explained the limits using Code Helper's day.

### 9. A real checkout

> When David buys something online, there's no payment-successful moment on the phone, and that isn't good. Make it simple: they buy, and we see it got debited and the payment was successful.

**Result:** confirm, then processing, then "Payment successful" with the amount debited and a receipt. The dashboard shows the payment as Paid.

### 10. Bug: grey screen

> When I buy something in the shop with the app, it shows a grey overlay and nothing else.

**Result:** fixed the phone layout so the payment sheet stays inside short screens, such as the phone frame on a laptop.

### 11. The write-up

> Export everything: what we were given, how it was built and how it functions.

**Result:** the ProductTank write-up, with the brief, how it works, how it was built, and the demo script.

## Tips if you build on it

- Start a session in this repo and describe one change at a time, in plain words, as above.
- Report bugs by describing what you see ("it shows a grey overlay"). Screenshots help.
- Ask Claude to test the change in a browser before it pushes.
