# 🌙 Whispers in the Moonlight - Romantic Mystery Scavenger Hunt

A beautiful, immersive romantic mystery scavenger hunt with 7 progressive levels featuring multimedia clues, atmospheric audio, and enchanting storytelling.

## ✨ Features

- **7 Progressive Levels**: Each level unlocks after completing the previous one
- **Multimedia Clues**: Images, videos, and animated GIFs as clues
- **Atmospheric Audio**: Immersive soundscapes and music for each level
- **Romantic Storytelling**: A beautiful narrative that unfolds with each completed level
- **Progress Tracking**: Save and resume your progress
- **Social Sharing**: Share your progress and achievements on social media
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🎵 Audio Experience

- **Homepage**: Moonlight Serenade theme music
- **Level 1**: Cinema ambience with romantic chimes
- **Level 2**: Old music box melodies with magical sparkles
- **Level 3**: Night wind whispers with ghostly effects
- **Level 4**: Garden night sounds with nature harmony
- **Level 5**: Library whispers with mystical chimes
- **Level 6**: Haunted waltz with ethereal bells
- **Level 7**: Warm fireplace with victory bells

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager

### Installation & Setup

1. **Download and Extract**
   \`\`\`bash
   # If you downloaded as ZIP, extract it to your desired location
   # If using git:
   git clone <repository-url>
   cd scavenger-hunt
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   # or if you prefer yarn:
   yarn install
   \`\`\`

3. **Run Development Server**
   \`\`\`bash
   npm run dev
   # or with yarn:
   yarn dev
   \`\`\`

4. **Open in Browser**
   Open [http://localhost:3000](http://localhost:3000) in your browser to start the hunt!

### 🎮 How to Play

1. **Start**: Click "Begin the Hunt" on the homepage
2. **Solve Clues**: Each level presents a multimedia clue to solve
3. **Progress**: Complete levels in order to unlock the next one
4. **Share**: Share your progress with friends and loved ones
5. **Complete**: Finish all 7 levels to see the complete story

### 🔧 Development Commands

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
\`\`\`

### 📁 Project Structure

\`\`\`
scavenger-hunt/
├── app/                    # Next.js app directory
│   ├── level/[id]/        # Individual level pages
│   ├── complete/          # Completion page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── level-card.tsx    # Level display component
│   ├── share-modal.tsx   # Social sharing modal
│   └── sound-visualizer.tsx # Audio visualization
├── lib/                  # Utility functions
├── public/               # Static assets
└── README.md            # This file
\`\`\`

### 🎨 Customization

#### Adding Real Audio Files

To add real audio files instead of console logging:

1. **Create audio directory**:
   \`\`\`bash
   mkdir public/audio
   \`\`\`

2. **Add your audio files**:
   \`\`\`
   public/audio/
   ├── homepage-theme.mp3
   ├── cinema-ambience.mp3
   ├── old-music-box.mp3
   ├── night-wind.mp3
   ├── garden-night.mp3
   ├── library-whispers.mp3
   ├── haunted-waltz.mp3
   ├── warm-fireplace.mp3
   └── success-sounds/
       ├── romantic-chime.mp3
       ├── magical-sparkle.mp3
       └── ...
   \`\`\`

3. **Update audio components** to use actual file paths instead of console.log

#### Customizing Levels

Edit the `levelsData` array in `app/level/[id]/page.tsx` to:
- Change clues and answers
- Update story text
- Modify atmospheric themes
- Add new media content

#### Styling

The project uses:
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Custom gradients** for atmospheric effects

### 🌐 Deployment

#### Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

#### Netlify
\`\`\`bash
npm run build
# Upload the 'out' directory to Netlify
\`\`\`

#### Other Platforms
\`\`\`bash
npm run build
# Deploy the generated files from the build output
\`\`\`

### 🎵 Audio Setup (Optional)

For the full audio experience:

1. **Obtain audio files** (royalty-free music and sound effects)
2. **Place in public/audio/** directory
3. **Update audio references** in components
4. **Test audio playback** across different browsers

### 📱 Mobile Experience

The hunt is fully responsive and includes:
- Touch-friendly navigation
- Mobile-optimized layouts
- Swipe gestures support
- Progressive Web App features

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### 📄 License

This project is open source and available under the [MIT License](LICENSE).

### 🎭 Credits

- **Design**: Romantic mystery theme with atmospheric gradients
- **Icons**: Lucide React icon library
- **UI Components**: shadcn/ui component library
- **Framework**: Next.js 14 with TypeScript

---

## 💕 Enjoy Your Romantic Mystery Adventure!

*"In the end, every whisper becomes a promise, every shadow reveals light, and every mystery finds its answer in love."*

For support or questions, please open an issue in the repository.
