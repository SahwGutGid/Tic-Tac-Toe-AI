# 🎮 Tic-Tac-Toe AI - How to Run Guide

## 📋 Complete Step-by-Step Guide

This guide will walk you through every possible way to run the Tic-Tac-Toe AI game.

---

## 🚀 Method 1: Run Directly in Browser (Easiest)

### Step 1: Download the Files
1. Go to the repository: [https://github.com/SahwGutGid/Tic-Tac-Toe-AI](https://github.com/SahwGutGid/Tic-Tac-Toe-AI)
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to any folder on your computer

### Step 2: Open the Game
1. Navigate to the extracted folder
2. Find the file named **`index.html`**
3. **Double-click** on `index.html`
4. The game will open in your default web browser

✅ **That's it!** The game should now be running.

---

## 🌐 Method 2: Run via Local Server (Recommended for Development)

### Step 1: Install a Local Server

#### Option A: Using Python (Built-in)
1. Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
2. Navigate to the game folder:
   ```bash
   cd path/to/Tic-Tac-Toe-AI
   ```
3. Run one of these commands:
   - **Python 3:**
     ```bash
     python -m http.server 8000
     ```
   - **Python 2:**
     ```bash
     python -m SimpleHTTPServer 8000
     ```

#### Option B: Using Node.js (npm)
1. Install Node.js from [https://nodejs.org](https://nodejs.org)
2. Install http-server globally:
   ```bash
   npm install -g http-server
   ```
3. Navigate to the game folder and run:
   ```bash
   http-server -p 8000
   ```

#### Option C: Using VS Code
1. Open the folder in VS Code
2. Install the **"Live Server"** extension
3. Right-click on `index.html` and select **"Open with Live Server"**

### Step 2: Access the Game
1. Open your web browser
2. Go to: **http://localhost:8000**
3. The game will load automatically

✅ **The game is now running with a local server!**

---

## 🌍 Method 3: Deploy to GitHub Pages (Free Hosting)

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub: [https://github.com/SahwGutGid/Tic-Tac-Toe-AI](https://github.com/SahwGutGid/Tic-Tac-Toe-AI)
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"main"** branch
5. Click **"Save"**

### Step 2: Access Your Live Game
1. Wait 1-2 minutes for deployment
2. Refresh the GitHub Pages settings page
3. You'll see a link like: **https://sahwgutgid.github.io/Tic-Tac-Toe-AI/**
4. Click the link to play the game online!

✅ **Your game is now live on the internet!**

---

## 📱 Method 4: Run on Mobile Device

### For Android:
1. Download the ZIP file on your phone
2. Extract it using a file manager app
3. Open `index.html` with Chrome or Firefox
4. The game will work on mobile!

### For iPhone/iPad:
1. Use the **Files** app to download the ZIP
2. Extract the files
3. Open `index.html` in Safari
4. For best experience, add to Home Screen:
   - Tap the **Share** button
   - Select **"Add to Home Screen"**

---

## 🎯 Method 5: Run via Code Editor

### Using VS Code:
1. Open VS Code
2. Click **File > Open Folder** and select the game folder
3. Install the **"Live Server"** extension (if not already installed)
4. Right-click on `index.html`
5. Select **"Open with Live Server"**
6. The game will open in your default browser

### Using Sublime Text:
1. Open the folder in Sublime Text
2. Install the **"LiveReload"** plugin
3. Open `index.html` in your browser
4. The page will auto-refresh when you save changes

---

## ⚙️ Troubleshooting

### Problem: Game doesn't load
**Solution:**
- Make sure all files are in the same folder
- Check that you have `index.html`, `styles.css`, `game.js`, and `audio-generator.js`
- Try opening with a different browser (Chrome, Firefox, Edge)

### Problem: No sounds
**Solution:**
- Make sure sound is enabled in the game settings (⚙️ button)
- Check your browser's sound settings
- Some browsers block autoplay - click anywhere on the page first

### Problem: Animations are laggy
**Solution:**
- Disable animations in settings
- Close other tabs to free up memory
- Try a different browser

### Problem: Can't save progress
**Solution:**
- Make sure you're not in Private/Incognito mode
- Check if your browser allows local storage
- Try a different browser

---

## 🎮 Game Controls

### Mouse Controls:
- **Click** on any empty cell to place your symbol
- **Hover** over cells to see where you can place

### Keyboard Shortcuts:
| Key | Action |
|-----|--------|
| `R` | Restart current game |
| `U` | Undo last move |
| `H` | Show hint |
| `ESC` | Go back / Close modal |

### Touch Controls (Mobile):
- **Tap** on any empty cell to place your symbol
- **Tap** action buttons at the bottom

---

## 🎨 Game Features

### Main Menu:
- **PLAY** - Start a new game
- **⚙️ SETTINGS** - Customize game options
- **📊 STATS** - View your statistics and achievements

### Settings:
- **Player Symbol** - Choose X or O
- **Difficulty** - Easy, Medium, or Hard
- **Sound Effects** - Toggle sounds on/off
- **Animations** - Toggle animations on/off
- **Theme** - Light, Dark, or Neon

### In-Game:
- **Turn Indicator** - Shows whose turn it is
- **Timer** - Shows game duration
- **Score Display** - Your wins vs AI wins
- **Action Buttons:**
  - **↻ Restart** - Reset current game
  - **↪ Undo** - Undo last move
  - **💡 Hint** - Show suggested move

### Progression System:
- Earn **XP** for playing games
- **Level up** as you gain XP
- **10 Achievements** to unlock
- All progress saved automatically

---

## 💡 Tips for Best Experience

1. **Use Chrome or Firefox** for best performance
2. **Enable sounds** for full immersion
3. **Try Hard difficulty** for a challenge (AI is unbeatable!)
4. **Use keyboard shortcuts** for faster gameplay
5. **Check achievements** to see what you've unlocked
6. **Switch themes** to match your mood

---

## 📊 Understanding the Difficulty Levels

| Difficulty | AI Behavior | XP Reward |
|------------|-------------|-----------|
| **Easy** | Makes random moves | 20-30 XP |
| **Medium** | 70% optimal, 30% random | 25-75 XP |
| **Hard** | Uses Minimax algorithm (unbeatable) | 40-100 XP |

**Note:** On Hard difficulty, the AI will never lose. The best you can do is draw!

---

## 🎉 Achievements List

| Achievement | How to Unlock | Icon |
|-------------|---------------|------|
| First Blood | Win your first game | 🩸 |
| Lesson Learned | Lose a game | 📚 |
| Peace Maker | Draw a game | ☮️ |
| On a Roll | Win 5 games in a row | 🔥 |
| Unstoppable | Win 10 games in a row | 💪 |
| AI Slayer | Beat the AI on Hard difficulty | 🤖 |
| Veteran | Reach level 5 | 🎖️ |
| Master | Reach level 10 | 👑 |
| Dedicated | Play 100 games | 🎮 |
| Perfect | Win without AI scoring | ✨ |

---

## 🔧 Technical Requirements

### Minimum:
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (only for first load, then works offline)
- 100MB free disk space

### Recommended:
- Latest version of Chrome or Firefox
- Desktop or laptop computer
- Mouse or touchscreen

---

## 📝 File Structure

```
Tic-Tac-Toe-AI/
├── index.html          # Main HTML file
├── styles.css          # All styles and themes
├── game.js             # Main game logic
├── audio-generator.js  # Sound effects generator
├── sounds/             # (Optional) Folder for sound files
└── HOW_TO_RUN.md       # This guide
```

---

## 🌟 Bonus: Customize the Game

### Change Colors:
1. Open `styles.css`
2. Find the `:root` section at the top
3. Modify the color variables (e.g., `--accent-primary`)
4. Save and refresh

### Add Custom Sounds:
1. Create a `sounds` folder
2. Add your sound files (MP3 format)
3. Update `audio-generator.js` to use your files

### Modify Difficulty:
1. Open `game.js`
2. Find the `aiMove()` function
3. Adjust the probabilities or add new difficulty levels

---

## 🤝 Need Help?

If you encounter any issues:
1. **Check this guide** for troubleshooting
2. **Try a different browser**
3. **Clear your cache** and reload
4. **Check the console** (F12 > Console) for errors
5. **Create an issue** on GitHub if the problem persists

---

## 🎓 Enjoy the Game!

You're now ready to play Tic-Tac-Toe AI with a beautiful, minimalistic interface, satisfying sounds, and a complete progression system. Have fun challenging the AI!

**Pro Tip:** Try to beat the AI on Hard difficulty. If you manage to draw, you're a Tic-Tac-Toe master! 🏆
