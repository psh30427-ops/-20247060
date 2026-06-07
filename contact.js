const INQUIRY_STORAGE_KEY = "batech_inquiries";

const TYPE_LABELS = {
    manufacture: "펌프 제작/구매",
    install: "설치 문의",
    repair: "A/S 및 수리",
    other: "기타 문의"
};

const getInquiries = () => {
    try {
        return JSON.parse(localStorage.getItem(INQUIRY_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
};

const saveInquiries = (inquiries) => {
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
};

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${y}.${m}.${d} ${h}:${min}`;
};

const generateInquiryId = (inquiries) => {
    const today = new Date();
    const datePart = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("");

    const todayPrefix = `BT-${datePart}-`;
    const todayCount = inquiries.filter((item) => item.id.startsWith(todayPrefix)).length;
    return `${todayPrefix}${String(todayCount + 1).padStart(3, "0")}`;
};

const renderInquiries = (filter = "") => {
    const inquiries = getInquiries();
    const keyword = filter.trim().toLowerCase();
    const filtered = keyword
        ? inquiries.filter((item) =>
            item.id.toLowerCase().includes(keyword) ||
            item.name.toLowerCase().includes(keyword)
        )
        : inquiries;

    const listEl = document.getElementById("inquiry-list");
    const emptyEl = document.getElementById("inquiry-empty");
    const totalEl = document.getElementById("inquiry-total");
    const tableWrapper = document.querySelector(".inquiry-table-wrapper");

    if (!listEl) return;

    if (totalEl) totalEl.textContent = String(filtered.length);

    if (filtered.length === 0) {
        listEl.innerHTML = "";
        emptyEl?.classList.remove("hidden");
        tableWrapper?.classList.add("hidden");
        return;
    }

    emptyEl?.classList.add("hidden");
    tableWrapper?.classList.remove("hidden");

    listEl.innerHTML = filtered
        .slice()
        .reverse()
        .map((item) => `
            <tr data-id="${item.id}">
                <td class="inquiry-id">${item.id}</td>
                <td>${formatDate(item.createdAt)}</td>
                <td>${escapeHtml(item.name)}</td>
                <td>${TYPE_LABELS[item.type] || item.type}</td>
                <td><span class="inquiry-status">${item.status}</span></td>
            </tr>
        `)
        .join("");

    listEl.querySelectorAll("tr").forEach((row) => {
        row.addEventListener("click", () => showDetail(row.dataset.id));
    });
};

const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
};

const showDetail = (id) => {
    const inquiry = getInquiries().find((item) => item.id === id);
    if (!inquiry) return;

    const body = document.getElementById("inquiry-detail-body");
    const modal = document.getElementById("inquiry-detail-modal");
    if (!body || !modal) return;

    body.innerHTML = `
        <dt>접수번호</dt><dd>${inquiry.id}</dd>
        <dt>접수일시</dt><dd>${formatDate(inquiry.createdAt)}</dd>
        <dt>이름 / 회사명</dt><dd>${escapeHtml(inquiry.name)}</dd>
        <dt>연락처</dt><dd>${escapeHtml(inquiry.phone)}</dd>
        <dt>문의 유형</dt><dd>${TYPE_LABELS[inquiry.type] || inquiry.type}</dd>
        <dt>상태</dt><dd><span class="inquiry-status">${inquiry.status}</span></dd>
        <dt>문의 내용</dt><dd class="inquiry-message">${escapeHtml(inquiry.message)}</dd>
    `;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
};

const closeModal = (modal) => {
    modal?.classList.add("hidden");
    document.body.style.overflow = "";
};

const showSuccessModal = (inquiryId) => {
    const modal = document.getElementById("inquiry-success-modal");
    const idEl = document.getElementById("success-inquiry-id");
    if (idEl) idEl.textContent = inquiryId;
    modal?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const searchInput = document.getElementById("inquiry-search");
    const successModal = document.getElementById("inquiry-success-modal");
    const detailModal = document.getElementById("inquiry-detail-modal");

    renderInquiries();

    form?.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const type = document.getElementById("type")?.value;
        const message = document.getElementById("message")?.value.trim();

        if (!name || !phone || !message) return;

        const inquiries = getInquiries();
        const inquiry = {
            id: generateInquiryId(inquiries),
            name,
            phone,
            type,
            message,
            status: "접수완료",
            createdAt: new Date().toISOString()
        };

        inquiries.push(inquiry);
        saveInquiries(inquiries);
        renderInquiries(searchInput?.value || "");
        form.reset();

        showSuccessModal(inquiry.id);
    });

    searchInput?.addEventListener("input", (e) => {
        renderInquiries(e.target.value);
    });

    document.getElementById("inquiry-success-close")?.addEventListener("click", () => {
        closeModal(successModal);
        document.getElementById("inquiry-board")?.scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("inquiry-detail-close")?.addEventListener("click", () => {
        closeModal(detailModal);
    });

    successModal?.addEventListener("click", (e) => {
        if (e.target === successModal) closeModal(successModal);
    });

    detailModal?.addEventListener("click", (e) => {
        if (e.target === detailModal) closeModal(detailModal);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (!successModal?.classList.contains("hidden")) closeModal(successModal);
        if (!detailModal?.classList.contains("hidden")) closeModal(detailModal);
    });
});
