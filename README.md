# 💖 Operation: Say Yes 💖

A retro, pixel-art styled dating simulator web game where your planning skills and emotional intelligence are put to the test. Will you design the perfect date for Anna, or will you end up heartbroken? 

Choose wisely—every choice impacts her mood!

---

## 🎮 Game Features

* **Interactive Dialogue System:** Features a dynamic text typewriter effect for immersive pixel-RPG conversations.
* **Real-time Mood Meter:** A classic retro progress bar that tracks Anna's mood based on your interactions and date choices.
* **Dynamic Character Reactions:** Animated sprites that jump, shake, or change expressions dynamically based on your dialogue choices.
* **Cheating Mechanic (Character Preferences):** An integrated popup system that lets you sneaky-peek into Anna's authentic likes and dislikes.
* **Responsive Retro Audio:** Background music, victory tracks, game-over soundscapes, and character SFX (with full mute/unmute support).
* **Summary & Final Choices:** Review your date plan dynamically compiled on a side panel before making your definitive choice: *Go on a date* or... *Ghost her*?

---

## 🛠️ Built With

* **HTML5** – Semantic game markup structure.
* **CSS3 (Custom Retro Animations)** – Floating text bubbles, pixelated rendering, text alignments, shake/jump animations, and full mobile-responsive adjustments.
* **Bootstrap 5.3** – Used for clean grid management and quick UI alignment.
* **Vanilla JavaScript (ES6)** – Powering the entire game state, audio-toggle setups, event listeners, timer timeouts, and screen sequence switchers.

---

## 📂 Project Structure

```text
├── assets/                    # Image sprites, pixel art assets, background images
├── sounds/                    # Game background music and SFX audio files
├── index.html                 # Main webpage entry point
├── style.css                  # Custom pixel aesthetics, typography, and animations
└── script.js                  # Core game logic, state machine, and interaction handlers
```

---

## 🚀 How to Run the Project Locally
Since the game loads local audio elements, modern web browsers might block features due to CORS policies if you just double-click the index.html file. It's best to run it through a local web server.

# Method 1: VS Code Live Server (Recommended)
Open the project folder in Visual Studio Code.

Install the Live Server extension by Ritwick Dey.

Click the Go Live button at the bottom right of the VS Code editor window.

# Method 2: Python HTTP Server
If you have Python installed, open your terminal/command prompt inside the project folder and run:

* **Python 3.x**: python -m http.server 8000

* **Python 2.x**: python -m SimpleHTTPServer 8000

Then, open your browser and navigate to http://localhost:8000.

## 🕹️ How to Play (Spoiler Alert!)
* **The Golden Rule**: Pay attention to Anna's signals. Hovering too long on sections or selecting non-ideal options will cause an index trigger lowering her mood.

* **Cheating Button**: Use the pixel info icon (?) in the top left corner to understand her true preferences regarding movies, sushi places, and local parks.

* **Time limits**: Anna values her time! Setting date times too early or too late will test her patience.
