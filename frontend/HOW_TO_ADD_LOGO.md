# How to Add Your CCS Logo

## Current Status
The system is configured to use a logo file. Currently using an SVG placeholder.

## Steps to Add Your Logo

### Step 1: Get Your Logo File
Make sure you have your `ccs.png` or `ccs.jpg` file ready.

### Step 2: Add to Public Folder
1. Navigate to: `frontend/public/`
2. Copy your logo file into this folder
3. Name it exactly: `ccs.png` (or `ccs.jpg`)

### Step 3: File Structure Should Look Like:
```
frontend/
├── public/
│   ├── ccs.png          ← Your logo here
│   ├── ccs.svg          ← Current placeholder (can be deleted)
│   └── vite.svg
├── src/
└── ...
```

### Step 4: Restart Development Server
```bash
cd frontend
npm run dev
```

## Logo Specifications

### Recommended:
- **Format**: PNG with transparent background
- **Size**: 200x200 pixels (square)
- **File Size**: Under 100KB
- **Colors**: Should work with orange theme

### Acceptable:
- **Format**: JPG, PNG, or SVG
- **Size**: Minimum 100x100 pixels
- **Aspect Ratio**: Square (1:1) works best

## Fallback System
The system has a fallback mechanism:
1. First tries to load: `/ccs.svg`
2. If not found, tries: `/ccs.png`
3. If neither exists, shows broken image icon

## Testing Your Logo
1. Add your logo file to `frontend/public/`
2. Refresh your browser
3. Check the sidebar - your logo should appear
4. Test hover effect (should scale and rotate slightly)

## Troubleshooting

### Logo Not Showing?
- Check file name is exactly `ccs.png` or `ccs.svg`
- Check file is in `frontend/public/` folder
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

### Logo Too Large/Small?
The logo is automatically sized to 50x50px in the sidebar.
If it looks distorted, ensure your source image is square.

### Logo Quality Issues?
- Use PNG format with transparent background
- Ensure minimum 200x200px resolution
- Avoid JPEG if logo has transparency

## Need Help?
If you're having issues, check:
1. File path: `frontend/public/ccs.png`
2. File permissions (should be readable)
3. Browser console for error messages
