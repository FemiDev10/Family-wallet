# Family wallet

**One wallet, many AI helpers.** A control centre where a family manages every AI agent that can spend its money, and can stop any one of them in a single tap without touching the others.

Built by a team at a ProductTank buildathon for **Challenge 7: One wallet, many AI helpers** (Agentic wallet track).

Two screens that sync live:

- **Admin dashboard** (Parent A): create agents, set budgets, approve requests, stop spending, manage the family, send the weekly report.
- **Phone app** (David, 15): his agents buy things inside those limits, he sees every payment, asks for more, and gets told when anything changes.

No real money moves. Everything runs on sample data.

## Run it

You need [Node.js](https://nodejs.org). Nothing to install.

```bash
node server.js
```

- Side-by-side demo: http://localhost:4321
- Dashboard only: http://localhost:4321/dashboard.html
- Phone only: http://localhost:4321/phone.html
- A real phone on the same WiFi: open the "Phone (WiFi)" address the server prints

Press **Reset demo** to start again from clean sample data.

## How it works

Every agent has four rules: **max per payment**, **max per day**, **allowed sellers** (or Any seller), and **when permission ends**. Each payment passes five checks in order, and the first failure is the reason shown:

1. Is the agent switched on (not stopped)?
2. Is it before its end date?
3. Is the seller allowed?
4. Is the amount within the per-payment cap?
5. Would today's total stay within the daily cap?

**Stop** pauses one agent by failing check 1, so stopping one agent can never affect another. A 5-second Undo is the safety net.

### Features

| Dashboard | Phone |
| --- | --- |
| Agent cards: status, spend this week, today vs daily cap, last payment, red Stop button | Money left today, this week's spend, limits shown read-only |
| Limits panel: caps, sellers from every category, Any seller, end date | Shop with a real checkout: confirm, processing, payment successful, receipt |
| Add agent in three steps | Request a higher cap, or ask for a new agent |
| Needs you: approve, edit or decline David's requests; alerts at 80% of a cap | Alerts for every change a parent makes |
| Activity: every payment attempt and a change log | Weekly report, when a parent shares it |
| Members: add, rename, remove, change roles | Stop his own agent |
| Weekly report: pick who receives it, Send now | |

### Files

| File | What it is |
| --- | --- |
| `index.html` | Demo page: dashboard and phone side by side |
| `dashboard.html` | Admin dashboard |
| `phone.html` | Phone app |
| `server.js` | Sync server, Node with no dependencies |
| `control-centre.html`, `demo.html` | The same pages packaged for a hosted link |

Plain HTML, CSS and JavaScript: no framework, no build step. Both screens share one JSON state and sync through localStorage + BroadcastChannel (same browser), a message relay in the demo page, and the sync server's event stream (other devices).

## Team

Built together by:

| Who | GitHub | Worked on |
| --- | --- | --- |
| Femi | [@FemiDev10](https://github.com/FemiDev10) | Admin dashboard, combined both into one system |
| Aysegul Sumeyra Kanca | [@sumeyramr](https://github.com/sumeyramr) | Admin dashboard |
| Yuki | [@Yukidrew65](https://github.com/Yukidrew65) | Phone app |
| Stephanie | GitHub to come | Phone app |

## Contributing

We'd love help. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to pick something up.

## Licence

[MIT](LICENSE)
