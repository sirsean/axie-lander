# axie-lander

Scripts for interacting with Axie Infinity land/staking contracts.

# Installation

We're using Hardhat, which complained at me when I was on the wrong
version of Node, so first make sure you're on `v18.12.1` like me.

```bash
nvm use
npm install
```

# Wallet File

This app does not need to sign transactions, but the Ronin RPC doesn't seem
to like it if it isn't connected to an account. So I've got my account hooked
up in my wallet file even though I'm not really using it.

So, create a file at `~/.wallet` that looks like this:

```json
{
    "ronin": "https://api.roninchain.com/rpc",
    "key": "YOUR-PRIVATE-KEY"
}
```

# Plot Owner

If a land plot isn't staked, you can just look and see who owns it. But if
the owner has staked it, then technically the plot is owned by the staking
contract. We can go ask the staking contract who _really_ owns it.

```bash
npx hardhat plot-owner --row -30 --col -16
```

# Donate

Kick in some coins if you think this is useful or whatever.

`ronin:560ebafd8db62cbdb44b50539d65b48072b98277`
