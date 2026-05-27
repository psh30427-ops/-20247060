import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import fitz
except ImportError:
    install('PyMuPDF')
    import fitz

try:
    from PIL import Image
except ImportError:
    install('Pillow')
    from PIL import Image

pdf_path = "ISO9001인증서.pdf"
doc = fitz.open(pdf_path)
page = doc.load_page(0)
pix = page.get_pixmap(dpi=150)
img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

w, h = img.size
target_ratio = 3 / 4
current_ratio = w / h

if current_ratio > target_ratio:
    # too wide
    new_w = int(h * target_ratio)
    left = (w - new_w) / 2
    img = img.crop((left, 0, left + new_w, h))
else:
    # too tall
    new_h = int(w / target_ratio)
    top = (h - new_h) / 2
    img = img.crop((0, top, w, top + new_h))

# resize width to 400px
img = img.resize((400, int(400 / target_ratio)), Image.Resampling.LANCZOS)
img.save("iso9001.webp", "WEBP", quality=85)
print("Saved iso9001.webp successfully.")
