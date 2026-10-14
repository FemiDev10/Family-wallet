# Contributing

Anyone can pick up work: teammates and people who saw the demo at ProductTank.

## Getting started

1. Fork the repo (teammates with access can branch directly).
2. Run `node server.js` and open http://localhost:4321.
3. Make your change in a branch named after it, e.g. `team-mode` or `email-report`.
4. Open a pull request describing what changed and how you tested it.

The pages are plain HTML, CSS and JavaScript. `dashboard.html` and `phone.html` are the two apps. `control-centre.html` and `demo.html` are copies packaged for a hosted link without the `<html>` wrapper; if you change one, keep its pair in step.

## Good first pieces of work

- **Team mode:** the same screens for a startup team of 3 to 5 people (Owner, Admin, Members).
- **Real weekly email:** send the Monday report by email, with single-use Stop links.
- **Sign-in and server-side roles:** so the phone can never grant itself anything.
- **Real payment provider:** give each agent its own spend key with the same four rules, and make Stop freeze it.
- **Persistent storage:** keep state when the server restarts.
- **Usability test:** five people who have never seen the app, each asked to "Stop the Code Helper". The target is under 10 seconds each, unaided.

## Ground rules

- Keep **Stop** one tap, red, on the card, and labelled "Stop".
- Show status in words and colour, never colour alone.
- Write UI text in plain words people recognise.
