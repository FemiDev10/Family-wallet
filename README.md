# Family wallet: admin dashboard + phone app

- `index.html`: the demo page, with Parent A's dashboard on the left and Teenager's phone on the right, both live.
- `dashboard.html`: the admin dashboard on its own.
- `phone.html`: the Teenager's phone app on its own.

Both screens share one store in the browser (localStorage + BroadcastChannel), so they must be served from the same localhost:

```bash
cd hackathon/agent-wallet
python3 -m http.server 4321
# open http://localhost:4321            (side-by-side demo)
# or   http://localhost:4321/dashboard.html and http://localhost:4321/phone.html in two windows
```

"Reset demo" clears the data. `control-centre.html` and `demo.html` are the artifact versions of the same pages.
