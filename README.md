# Family wallet: admin dashboard + phone app

- `index.html`: the demo page, with Parent A's dashboard on the left and David's phone on the right, both live.
- `dashboard.html`: the admin dashboard on its own.
- `phone.html`: the David's phone app on its own.

Run the sync server (Node, no install needed). It also lets a real phone on the same WiFi join in:

```bash
cd hackathon/agent-wallet
node server.js
# open http://localhost:4321            (side-by-side demo)
# or   http://localhost:4321/dashboard.html and http://localhost:4321/phone.html in two windows
```

"Reset demo" clears the data. `control-centre.html` and `demo.html` are the artifact versions of the same pages.
