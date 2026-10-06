# Transilk realtime hero

Run `python3 -m http.server 8000 --bind 127.0.0.1` in this directory, then open http://localhost:8000/.

Default index.html uses Three.js and actual Blender assets in assets/realtime. Pointer movement orbits the camera around the geode; Replay intro restarts the7-second sequence. Reduced motion holds the final pose. WebGL failure uses the poster. Old video version is available at film.html.

Entry: js/realtime-hero.js. Materials: js/gem-optics.js and js/mud-lens.js. Source/export instructions and known visual limitations: /Users/hasa/Documents/blender/my home/TRANSILK_GPU_HANDOVER.md.

Desktop/mobile/replay/camera-tracking/reduced-motion QA passed2026-10-06 using Playwright/Brave. Initial assets about25MB; measured desktop~30FPS on the test M2. This is a hero preview, with existing commerce/navigation placeholders.
