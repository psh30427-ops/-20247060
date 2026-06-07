import io
import os
import subprocess
import sys

from PIL import Image

HWPS = "사진대장 - 비에이텍(주) 공장.hwp"
OUT_DIR = "facilities-images"
HWPPROC = os.path.join(
    os.path.dirname(sys.executable), "Scripts", "hwp5proc.exe"
)

STREAMS = [
    f"BinData/BIN{i:04X}.bmp" for i in range(1, 17)
]


def extract_stream(stream: str) -> bytes:
    result = subprocess.run(
        [HWPPROC, "cat", HWPS, stream],
        capture_output=True,
        check=True,
    )
    return result.stdout


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)

    for index, stream in enumerate(STREAMS, 1):
        data = extract_stream(stream)
        bmp_path = os.path.join(OUT_DIR, f"raw_{index:02d}.bmp")
        jpg_path = os.path.join(OUT_DIR, f"photo_{index:02d}.jpg")

        with open(bmp_path, "wb") as file:
            file.write(data)

        img = Image.open(io.BytesIO(data))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.save(jpg_path, "JPEG", quality=85)
        print(f"{jpg_path}: {img.size[0]}x{img.size[1]} ({len(data)} bytes)")


if __name__ == "__main__":
    main()
