const GUIDES = {
    booster: {
        title: "부스터펌프 유지관리지침서",
        file: "부스터펌프 유지관리지침서.hwp",
        type: "hwp"
    },
    submersible: {
        title: "수중펌프 유지관리지침서",
        file: "수중펌프 유지관리지침서.hwp",
        type: "hwp"
    },
    sludge: {
        title: "슬러지펌프 유지관리지침서",
        file: "슬러지펌프 유지관리지침서.hwp",
        type: "hwp"
    },
    mono: {
        title: "일축나사식 모노펌프 유지관리지침서",
        file: "일축나사식 모노펌프 유지관리지침서.hwp",
        type: "hwp"
    },
    metering: {
        title: "정량펌프 유지관리지침서",
        file: "정량펌프 유지관리지침서.pdf",
        type: "pdf"
    },
    volute: {
        title: "편흡입볼류트펌프 유지관리지침서",
        file: "편흡입볼류트펌프 유지관리지침서.hwp",
        type: "hwp"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const guideId = params.get("id");
    const guide = GUIDES[guideId];

    const titleEl = document.getElementById("guide-title");
    const pdfView = document.getElementById("guide-pdf-view");
    const hwpView = document.getElementById("guide-hwp-view");
    const errorView = document.getElementById("guide-error");

    if (!guide) {
        if (titleEl) titleEl.textContent = "지침서를 찾을 수 없습니다";
        if (errorView) {
            errorView.classList.remove("hidden");
            errorView.classList.add("active");
        }
        return;
    }

    document.title = `(주) 비에이텍 | ${guide.title}`;
    if (titleEl) titleEl.textContent = guide.title;

    const showPanel = (panel) => {
        if (!panel) return;
        panel.classList.remove("hidden");
        panel.classList.add("active");
    };

    if (guide.type === "pdf") {
        const pdfFrame = document.getElementById("pdf-frame");
        if (pdfFrame) {
            pdfFrame.src = encodeURI(guide.file);
        }
        showPanel(pdfView);
    } else {
        const hwpTitle = document.getElementById("hwp-title");
        const hwpDownload = document.getElementById("hwp-download");
        if (hwpTitle) hwpTitle.textContent = guide.title;
        if (hwpDownload) {
            hwpDownload.href = encodeURI(guide.file);
            hwpDownload.setAttribute("download", guide.file);
        }
        showPanel(hwpView);
    }
});
