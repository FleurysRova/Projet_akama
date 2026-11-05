"""Génère une og-image 1200x630 pour le partage sur LinkedIn/Discord."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

WIDTH, HEIGHT = 1200, 630
OUT = "/home/z/my-project/public/og-image.png"

# Background — deep slate (#030712)
img = Image.new("RGB", (WIDTH, HEIGHT), (3, 7, 18))
draw = ImageDraw.Draw(img, "RGBA")

# Aurora-style radial blobs
for cx, cy, r, color in [
    (180, 130, 280, (6, 182, 212, 70)),
    (1020, 180, 320, (139, 92, 246, 70)),
    (600, 530, 260, (16, 185, 129, 50)),
]:
    layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ld.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    layer = layer.filter(ImageFilter.GaussianBlur(radius=80))
    img.paste(layer, (0, 0), layer)

draw = ImageDraw.Draw(img, "RGBA")

# Grid pattern
for x in range(0, WIDTH, 48):
    draw.line([(x, 0), (x, HEIGHT)], fill=(6, 182, 212, 14), width=1)
for y in range(0, HEIGHT, 48):
    draw.line([(0, y), (WIDTH, y)], fill=(139, 92, 246, 14), width=1)

# Border
draw.rectangle([0, 0, WIDTH - 1, HEIGHT - 1], outline=(6, 182, 212, 60), width=2)

def load_font(size, bold=True):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

mono = load_font(20, bold=False)
h1 = load_font(82, bold=True)
h2 = load_font(42, bold=True)
small = load_font(22, bold=False)

# Top-left tag
draw.text((60, 60), "// PORTFOLIO · IA & AUTOMATION", font=mono, fill=(6, 182, 212, 230))

# Top-right live badge
bx, by = WIDTH - 360, 60
draw.rounded_rectangle([bx, by, bx + 300, by + 36], radius=18, fill=(16, 185, 129, 35), outline=(16, 185, 129, 180), width=1)
draw.ellipse([bx + 14, by + 12, bx + 24, by + 24], fill=(16, 185, 129, 255))
draw.text((bx + 36, by + 7), "Ouvert aux opportunités", font=small, fill=(16, 185, 129, 230))

# Name
draw.text((60, 180), "Elie Tinah", font=h1, fill=(245, 245, 245, 255))
draw.text((60, 280), "Ramanjakavelosoa", font=h1, fill=(139, 92, 246, 255))

# Title (multi-line)
draw.text((60, 410), "Software Engineer  &  Creative", font=h2, fill=(6, 182, 212, 255))
draw.text((60, 460), "Media Specialist", font=h2, fill=(6, 182, 212, 255))

# Subline
draw.text((60, 530), "Madagascar  ·  Mobilité Internationale  ·  Remote", font=small, fill=(180, 180, 200, 255))

# Right side: stylized ET in a box
box_x, box_y = WIDTH - 280, 180
draw.rounded_rectangle([box_x, box_y, box_x + 200, box_y + 200], radius=24, fill=(255, 255, 255, 8), outline=(6, 182, 212, 120), width=2)
draw.text((box_x + 50, box_y + 50), "ET", font=load_font(100, True), fill=(6, 182, 212, 255))
draw.text((box_x + 56, box_y + 56), "ET", font=load_font(100, True), fill=(139, 92, 246, 180))

img.save(OUT, "PNG", optimize=True)
print(f"OK -> {OUT}  ({os.path.getsize(OUT)} bytes)")
