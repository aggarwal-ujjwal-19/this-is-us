# 🎵 Media Replacement Guide

This guide explains how to replace the dummy audio, video, and image files with your own content.

## 📁 File Structure

\`\`\`
public/
├── audio/                          # All audio files
│   ├── homepage-theme.mp3          # Homepage background music
│   ├── completion-celebration.mp3  # Completion page celebration music
│   ├── level1-cinema-ambience.mp3  # Level 1 ambient sound
│   ├── level1-romantic-chime.mp3   # Level 1 success sound
│   ├── level2-old-music-box.mp3    # Level 2 ambient sound
│   ├── level2-magical-sparkle.mp3  # Level 2 success sound
│   ├── level3-night-wind.mp3       # Level 3 ambient sound
│   ├── level3-ghostly-whisper.mp3  # Level 3 success sound
│   ├── level4-garden-night.mp3     # Level 4 ambient sound
│   ├── level4-nature-harmony.mp3   # Level 4 success sound
│   ├── level5-library-whispers.mp3 # Level 5 ambient sound
│   ├── level5-mystical-chime.mp3   # Level 5 success sound
│   ├── level6-haunted-waltz.mp3    # Level 6 ambient sound
│   ├── level6-ethereal-bells.mp3   # Level 6 success sound
│   ├── level7-warm-fireplace.mp3   # Level 7 ambient sound
│   ├── level7-victory-bells.mp3    # Level 7 success sound
│   ├── ui-hover.mp3                # Button hover sound
│   ├── ui-click.mp3                # Button click sound
│   └── error-sound.mp3             # Error notification sound
├── images/                         # Image and GIF files
│   ├── level1-cinema.jpg           # Level 1 clue image
│   ├── level2-dance-hall.jpg       # Level 2 clue image
│   ├── level3-bridge.jpg           # Level 3 clue image
│   ├── level3-bridge.gif           # Level 3 clue GIF
│   ├── level4-garden.jpg           # Level 4 clue image
│   ├── level5-library.jpg          # Level 5 clue image
│   ├── level6-ballroom.jpg         # Level 6 clue image
│   ├── level6-ballroom.gif         # Level 6 clue GIF
│   └── level7-home.jpg             # Level 7 clue image
└── videos/                         # Video files
    ├── level1-cinema.mp4           # Level 1 clue video
    ├── level2-dance-hall.mp4       # Level 2 clue video
    ├── level3-bridge.mp4           # Level 3 clue video
    ├── level4-garden.mp4           # Level 4 clue video
    ├── level5-library.mp4          # Level 5 clue video
    ├── level6-ballroom.mp4         # Level 6 clue video
    └── level7-home.mp4             # Level 7 clue video
\`\`\`

## 🎵 Audio Files

### Background Music (Loop)
- **homepage-theme.mp3**: Romantic, atmospheric music for the homepage
- **completion-celebration.mp3**: Triumphant, celebratory music for the completion page
- **level1-cinema-ambience.mp3**: Cinema/theater ambient sounds
- **level2-old-music-box.mp3**: Vintage music box melody
- **level3-night-wind.mp3**: Spooky night wind and whispers
- **level4-garden-night.mp3**: Peaceful garden night sounds
- **level5-library-whispers.mp3**: Quiet library atmosphere
- **level6-haunted-waltz.mp3**: Eerie ballroom waltz music
- **level7-warm-fireplace.mp3**: Cozy fireplace crackling

### Success Sounds (Short)
- **level1-romantic-chime.mp3**: Romantic bell chime
- **level2-magical-sparkle.mp3**: Magical sparkle sound
- **level3-ghostly-whisper.mp3**: Ethereal whisper
- **level4-nature-harmony.mp3**: Nature harmony chime
- **level5-mystical-chime.mp3**: Mystical bell sound
- **level6-ethereal-bells.mp3**: Ghostly bell sounds
- **level7-victory-bells.mp3**: Triumphant victory bells

### UI Sounds (Very Short)
- **ui-hover.mp3**: Subtle hover sound (0.1-0.2 seconds)
- **ui-click.mp3**: Button click sound (0.1-0.2 seconds)
- **error-sound.mp3**: Error notification (0.5-1 second)

## 🖼️ Images & Videos

### Level 1 - Cinema Theme
- **level1-cinema.jpg**: Movie theater, cinema seats, or film projector
- **level1-cinema.mp4**: Video of cinema, movie theater, or film projection

### Level 2 - Dance Hall Theme
- **level2-dance-hall.jpg**: Dance hall, ballroom, or dance floor image
- **level2-dance-hall.mp4**: Video of dancing, ballroom, or vintage dance hall

### Level 3 - Bridge Theme
- **level3-bridge.jpg**: Old bridge, stone bridge, or romantic bridge at night
- **level3-bridge.mp4**: Video of bridge with flowing water or moonlight
- **level3-bridge.gif**: Animated GIF of an old bridge, preferably at night

### Level 4 - Garden Theme
- **level4-garden.jpg**: Rose garden, romantic garden setting, or garden bench
- **level4-garden.mp4**: Video of garden with gentle breeze or moonlit flowers

### Level 5 - Library Theme
- **level5-library.jpg**: Old library, bookshelves, or reading room
- **level5-library.mp4**: Video of library, books, or reading atmosphere

### Level 6 - Ballroom Theme
- **level6-ballroom.jpg**: Abandoned ballroom, vintage dance hall, or chandelier
- **level6-ballroom.mp4**: Video of empty ballroom or dancing shadows
- **level6-ballroom.gif**: Animated GIF of abandoned ballroom or ghostly dancing

### Level 7 - Home Theme
- **level7-home.jpg**: Cozy home interior, fireplace, or romantic home setting
- **level7-home.mp4**: Video of home interior with warm lighting or fireplace

## 🔄 How to Replace Files

### Step 1: Prepare Your Files
1. **Audio Format**: Use MP3 format for best compatibility
2. **Video Format**: Use MP4 format (H.264 codec recommended)
3. **Image Format**: Use JPG for photos, GIF for animations
4. **File Naming**: Keep the exact same filenames as listed above

### Step 2: Audio Guidelines
- **Background Music**: 2-5 minutes long, seamlessly loopable
- **Success Sounds**: 1-3 seconds long, celebratory
- **UI Sounds**: 0.1-0.5 seconds long, subtle

### Step 3: Video Guidelines
- **Resolution**: 1280x720 (720p) or higher
- **Duration**: 10-60 seconds, loopable if possible
- **File Size**: Keep under 10MB for web performance

### Step 4: Image Guidelines
- **Resolution**: 800x600 minimum, 1920x1080 maximum
- **Aspect Ratio**: 16:9 or 4:3 preferred
- **File Size**: Keep under 2MB for web performance

### Step 5: Replace Files
1. Navigate to the `public` folder in your project
2. Replace the dummy files with your own files
3. **Keep the exact same filenames**
4. Test the application to ensure all media loads correctly

## 🎨 Content Suggestions

### Audio Sources
- **Freesound.org**: Free sound effects and ambient audio
- **Zapsplat**: Professional sound library
- **YouTube Audio Library**: Free music and sound effects
- **Incompetech**: Royalty-free music

### Video Sources
- **Pexels Videos**: Free stock videos
- **Pixabay Videos**: Free video clips
- **Unsplash**: Some video content available

### Image Sources
- **Unsplash**: High-quality free photos
- **Pexels**: Free stock photography
- **Pixabay**: Free images and GIFs

## ⚠️ Important Notes

1. **Copyright**: Ensure you have rights to use all media files
2. **File Size**: Keep files optimized for web to ensure fast loading
3. **Testing**: Test on different devices and browsers after replacement
4. **Backup**: Keep backups of your original files
5. **Format Support**: Stick to widely supported formats (MP3, MP4, JPG, GIF)

## 🔧 Troubleshooting

### Audio Not Playing
- Check file format (MP3 recommended)
- Verify file path and naming
- Test in different browsers
- Check browser autoplay policies

### Video Not Loading
- Ensure MP4 format with H.264 codec
- Check file size (keep under 10MB)
- Verify file path is correct

### Images Not Displaying
- Check file format (JPG/PNG/GIF)
- Verify file path and naming
- Ensure files are in correct directories

## 🎯 Quick Replacement Checklist

- [ ] Replace homepage-theme.mp3 with your background music
- [ ] Replace completion-celebration.mp3 with celebratory music
- [ ] Replace all level ambient sounds (level1-cinema-ambience.mp3, etc.)
- [ ] Replace all success sounds (level1-romantic-chime.mp3, etc.)
- [ ] Replace UI sounds (ui-hover.mp3, ui-click.mp3, error-sound.mp3)
- [ ] Replace all level images (level1-cinema.jpg, etc.)
- [ ] Replace all level videos (level1-cinema.mp4, etc.)
- [ ] Replace level GIFs (level3-bridge.gif, level6-ballroom.gif)
- [ ] Test all media files in the application
- [ ] Verify audio loops correctly
- [ ] Check video playback controls work
- [ ] Ensure images display properly
- [ ] Test media type switching functionality

## 🔄 Media Type Switching

Each level now supports multiple media types (image, video, and sometimes GIF). Users can switch between these types using the toggle button in the top-right corner of each level card. This allows for a more dynamic experience and lets you provide different perspectives on each clue.

When replacing media files, make sure to provide both image and video versions for each level to take full advantage of this feature!

Your romantic mystery scavenger hunt will come to life with your custom media! 🌙💕
