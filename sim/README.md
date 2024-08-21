# Simulator for the pxt-arcadeshield extension

Simulates an Arcade Shield accessory attached to a BBC micro:bit. When the pxt-arcadeshield extension is added to a [MakeCode for BBC micro:bit](https://makecode.microbit.org) project, this simulator will instantiate below MakeCode's main simulator.

## Local testing and development

### First-time setup
```
cd sim
npm i
```

### Start the dev server
```
npm run dev
```

This starts the sim's local development server.

### Load into the MakeCode editor

1. Open the MakeCode editor for BBC micro:bit (https://makecode.microbit.org)
2. Add the URL parameter `localhostmessagesims=1`
3. Create a project
4. Add the pxt-arcadeshield extension to your project

The `localhostmessagesims=1` parameter will cause sim messages to be routed to your locally running development server.

