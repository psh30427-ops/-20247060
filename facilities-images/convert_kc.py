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

pdf_path = "KC인증서.pdf"
doc = fitz.open(pdf_path)
page = doc.load_page(0)
# High resolution rendering for sharp text (dpi=200)
pix = page.get_pixmap(dpi=200)
img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

img.save("kc.png", "PNG")
print("Saved kc.png successfully with high resolution.")
