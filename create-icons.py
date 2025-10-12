#!/usr/bin/env python3
"""
Create PNG icons for Chrome extension
Uses Python PIL (Pillow) library
"""

from PIL import Image, ImageDraw
import os

# Create icons directory
os.makedirs('icons', exist_ok=True)

# Icon sizes needed
sizes = [16, 32, 48, 128]

# Spotify green color
GREEN = '#1db954'
BLACK = '#000000'

def create_icon(size):
    """Create an icon with rising bar chart design"""
    # Create new image with green background
    img = Image.new('RGB', (size, size), GREEN)
    draw = ImageDraw.Draw(img)

    # Calculate dimensions
    padding = int(size * 0.15)
    bar_width = int((size - padding * 4) / 3)
    max_height = size - padding * 2

    # Draw three rising bars (representing stock gains)
    bars = [
        {'x': padding, 'height': int(max_height * 0.5)},
        {'x': padding * 2 + bar_width, 'height': int(max_height * 0.7)},
        {'x': padding * 3 + bar_width * 2, 'height': int(max_height * 0.9)}
    ]

    for bar in bars:
        x1 = bar['x']
        y1 = size - padding - bar['height']
        x2 = x1 + bar_width
        y2 = size - padding
        draw.rectangle([x1, y1, x2, y2], fill=BLACK)

    # Draw upward arrow in top right
    arrow_size = int(size * 0.12)
    arrow_x = size - padding - arrow_size
    arrow_y = padding

    # Triangle pointing up
    arrow_points = [
        (arrow_x + arrow_size // 2, arrow_y),  # Top point
        (arrow_x, arrow_y + arrow_size),        # Bottom left
        (arrow_x + arrow_size, arrow_y + arrow_size)  # Bottom right
    ]
    draw.polygon(arrow_points, fill=BLACK)

    return img

# Generate all icon sizes
for size in sizes:
    img = create_icon(size)
    filename = f'icons/icon{size}.png'
    img.save(filename, 'PNG')
    print(f'✓ Created {filename}')

print('\n✅ All icons generated successfully!')
print('📁 Icons saved in the icons/ directory')
