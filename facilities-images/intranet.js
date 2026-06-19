// Batech Intranet Script

// 1. Mock Notices Data
const MOCK_NOTICES = [
    {
        id: 5,
        title: "[인사] 2026년 하반기 정기 승진 및 부서 배치 발령 안내",
        dept: "경영지원부",
        date: "2026.06.18",
        content: `안녕하세요, 경영지원부입니다.<br><br>
        2026년 하반기 임직원 정기 승진 및 부서 배치 발령 사항을 공지합니다.<br>
        모든 임직원 여러분께서는 발령 사항을 확인하시어 하반기 업무 수행에 차질이 없으시길 바랍니다.<br><br>
        <strong>[주요 발령 사항]</strong><br>
        - 기술개발실 홍길동 과장 -> 기술개발실 차장 승진<br>
        - 생산관리부 김철수 대리 -> 생산관리부 과장 승진<br>
        - 경영지원부 이영희 사원 -> 경영지원부 대리 승진<br><br>
        승진하신 모든 임직원분들 축하드립니다.`
    },
    {
        id: 4,
        title: "[기술] NotebookLM 기반 사내 규정집 및 펌프 기술 시방서 질문 시스템 가이드",
        dept: "기술연구소",
        date: "2026.06.15",
        content: `안녕하세요, 기술연구소입니다.<br><br>
        구글의 인공지능 지식합성 서비스인 <strong>NotebookLM</strong>을 활용하여 비에이텍 사내 규정집 및 제품 설명서(부스터펌프, 수중펌프 등 11종 기술 시방서)를 손쉽게 질문하고 조회할 수 있는 시스템이 구축되었습니다.<br><br>
        인트라넷 내 [사내 지식 (NotebookLM)] 탭을 클릭하여 공식 사이트로 이동 후 사내 계정으로 로그인하여 이용해주시기 바랍니다.<br>
        기타 질문 데이터 업데이트나 건의사항은 기술연구소 담당자에게 문의 바랍니다.`
    },
    {
        id: 3,
        title: "[교육] 신형 부스터펌프 및 정량펌프 안전 점검 지침 실무 교육",
        dept: "생산관리부",
        date: "2026.06.10",
        content: `안녕하세요, 생산관리부입니다.<br><br>
        신형 부스터펌프와 고정밀 정량펌프 라인업의 조립 공정 안전 관리 및 설치 지침 관련 실무 교육을 아래와 같이 실시하오니, 생산 및 서비스 엔지니어 전원은 참석해주시기 바랍니다.<br><br>
        <strong>1. 일시:</strong> 2026년 6월 10일 (수) 오전 10:00 ~ 12:00 (2시간)<br>
        <strong>2. 장소:</strong> 공장 제1 세미나실 및 생산라인 A동<br>
        <strong>3. 강사:</strong> 기술연구소 조세연 대표 및 외부 수석 엔지니어<br>
        * 교육 후 점심식사가 제공됩니다.`
    },
    {
        id: 2,
        title: "[공지] 퇴계농공단지 공장 화재 대피 및 비상 대응 훈련 실시",
        dept: "소방안전위원회",
        date: "2026.06.05",
        content: `안녕하세요, 소방안전위원회입니다.<br><br>
        춘천소방서와 합동으로 진행하는 2026년도 상반기 합동 소방 대피 훈련을 공장 단지 내에서 실시합니다.<br>
        훈련 사이렌이 울리면 신속하게 비상 대피로를 통해 운동장으로 대피해 주시기 바랍니다.<br><br>
        <strong>- 일시:</strong> 2026년 6월 5일 (금) 오후 14:00 ~ 15:00<br>
        <strong>- 대상:</strong> 비에이텍 공장 및 사무동 전 직원<br>
        <strong>- 내용:</strong> 소방차 진입 유도, 초기 진화 실습, 모의 대피 훈련`
    },
    {
        id: 1,
        title: "[복지] 2026년도 하반기 임직원 사내 동호회 지원 및 신청 안내",
        dept: "경영지원부",
        date: "2026.06.01",
        content: `안녕하세요, 경영지원부입니다.<br><br>
        임직원 상호간 친목 도모와 즐거운 일터 정착을 위해 2026년 하반기 사내 동호회 등록 및 활동비 지원을 실시합니다.<br>
        신규 동호회를 결성하거나 기존 동호회의 연장을 원하는 팀은 신청서를 작성해 기한 내 제출바랍니다.<br><br>
        <strong>- 신청기간:</strong> 2026년 6월 1일 ~ 6월 20일<br>
        <strong>- 지원금액:</strong> 회원 1인당 월 3만원 지원`
    }
];

// 2. Mock Calendar Events
const MOCK_EVENTS = {
    "2026-06-05": { title: "공장 합동 소방 훈련", desc: "오후 2시, 전 직원 공장 내 소방 훈련 및 소방차 진입 유도 실습" },
    "2026-06-10": { title: "신형 부스터 펌프 교육", desc: "오전 10시, 제1세미나실. 신형 펌프 조립 및 유지보수 실무 교육" },
    "2026-06-15": { title: "KC인증 보완서류 마감", desc: "조달청 제출용 슬러지 펌프 보완 서류 최종 업로드 기한" },
    "2026-06-18": { title: "하반기 정기 인사 발령", desc: "임직원 승진 및 부서 배치 대내외 공식 공고일" },
    "2026-06-25": { title: "퇴계공단 환경 점검", desc: "공장 주변 안전 상태 점검 및 대청소 실시" },
    "2026-07-05": { title: "주요 관공서 펌프 납품", desc: "춘천시 상수도 사업소 부스터 펌프 납품 및 검수일" },
    "2026-07-15": { title: "3분기 경영 실적 회의", desc: "오전 11시, 중회의실. 상반기 마감 및 3분기 목표 설정 회의" }
};

const INQUIRY_STORAGE_KEY = "batech_inquiries";
const TYPE_LABELS = {
    manufacture: "펌프 제작/구매",
    install: "설치 문의",
    repair: "A/S 및 수리",
    other: "기타 문의"
};

let currentYear = 2026;
let currentMonth = 5; // 0-indexed (June = 5)
let selectedInquiryId = null;

// Helper: Format Date
function formatDate(isoString) {
    const date = new Date(isoString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${y}.${m}.${d} ${h}:${min}`;
}

// 3. Tab Switching
function initTabs() {
    const tabs = document.querySelectorAll(".intra-tab");
    const panels = document.querySelectorAll(".intra-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => p.style.display = "none");

            tab.classList.add("active");
            const panel = document.getElementById(`panel-${target}`);
            if (panel) {
                panel.style.display = "block";
            }
        });
    });
}

// 4. Render Notices
function renderNotices(filter = "") {
    const listEl = document.getElementById("notice-list");
    if (!listEl) return;

    const keyword = filter.trim().toLowerCase();
    const filtered = keyword 
        ? MOCK_NOTICES.filter(n => n.title.toLowerCase().includes(keyword))
        : MOCK_NOTICES;

    listEl.innerHTML = filtered.map(n => `
        <tr data-id="${n.id}" style="cursor: pointer; border-bottom: 1px solid #edf2f7; transition: background 0.15s;">
            <td style="padding: 12px 16px;">${n.id}</td>
            <td style="padding: 12px 16px; font-weight: 600; color: #2d3748;">${n.title}</td>
            <td style="padding: 12px 16px; color: #4a5568;">${n.dept}</td>
            <td style="padding: 12px 16px; color: #718096;">${n.date}</td>
        </tr>
    `).join("");

    listEl.querySelectorAll("tr").forEach(row => {
        row.addEventListener("mouseenter", () => row.style.background = "#f7fafc");
        row.addEventListener("mouseleave", () => row.style.background = "none");
        row.addEventListener("click", () => showNoticeDetail(parseInt(row.dataset.id)));
    });
}

function showNoticeDetail(id) {
    const notice = MOCK_NOTICES.find(n => n.id === id);
    if (!notice) return;

    const body = document.getElementById("notice-detail-body");
    const modal = document.getElementById("notice-detail-modal");
    if (!body || !modal) return;

    body.innerHTML = `
        <div style="margin-bottom: 15px;">
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #2d3748; margin-bottom: 6px;">${notice.title}</h4>
            <div style="font-size: 0.85rem; color: #718096;">
                <span>작성부서: <strong>${notice.dept}</strong></span>
                <span style="margin-left: 15px;">등록일: <strong>${notice.date}</strong></span>
            </div>
        </div>
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #edf2f7; font-size: 0.95rem; color: #4a5568; line-height: 1.7; min-height: 180px;">
            ${notice.content}
        </div>
    `;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

// 5. Render Calendar
function renderCalendar() {
    const daysEl = document.getElementById("calendar-days");
    const titleEl = document.getElementById("calendar-title");
    if (!daysEl || !titleEl) return;

    daysEl.innerHTML = "";
    
    // Set Calendar Title
    const monthNames = ["01월", "02월", "03월", "04월", "05월", "06월", "07월", "08월", "09월", "10월", "11월", "12월"];
    titleEl.textContent = `${currentYear}년 ${monthNames[currentMonth]}`;

    // Get dates
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();

    // Previous month blank days
    for (let i = firstDayIndex; i > 0; i--) {
        const day = prevLastDate - i + 1;
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell empty";
        cell.style.cssText = "background: #f7fafc; color: #cbd5e0; padding: 10px; border: 1px solid #edf2f7; text-align: left;";
        cell.innerHTML = `<span style="font-size:0.85rem; font-weight:500;">${day}</span>`;
        daysEl.appendChild(cell);
    }

    // Current month days
    for (let date = 1; date <= lastDate; date++) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell";
        cell.style.cssText = "background: #fff; padding: 10px; border: 1px solid #edf2f7; min-height: 100px; text-align: left; position: relative; cursor: pointer; transition: background 0.2s;";
        
        // Weekend color
        const dayOfWeek = new Date(currentYear, currentMonth, date).getDay();
        let colorStyle = "color: #2d3748;";
        if (dayOfWeek === 0) colorStyle = "color: #e53e3e;"; // Sun
        if (dayOfWeek === 6) colorStyle = "color: #3182ce;"; // Sat

        cell.innerHTML = `<span style="font-size:0.9rem; font-weight:700; ${colorStyle}">${date}</span>`;

        // Check if there is an event
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
        const event = MOCK_EVENTS[dateString];
        if (event) {
            const badge = document.createElement("div");
            badge.style.cssText = "background: #0077b6; color: #fff; font-size: 0.72rem; padding: 4px 6px; border-radius: 4px; margin-top: 8px; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,119,182,0.15);";
            badge.textContent = event.title;
            cell.appendChild(badge);

            cell.addEventListener("click", () => showCalendarEvent(dateString, event));
            cell.addEventListener("mouseenter", () => cell.style.background = "rgba(0,119,182,0.03)");
            cell.addEventListener("mouseleave", () => cell.style.background = "#fff");
        } else {
            cell.addEventListener("mouseenter", () => cell.style.background = "#f7fafc");
            cell.addEventListener("mouseleave", () => cell.style.background = "#fff");
        }

        daysEl.appendChild(cell);
    }

    // Next month blank days
    const totalCells = firstDayIndex + lastDate;
    const nextDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= nextDays; i++) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell empty";
        cell.style.cssText = "background: #f7fafc; color: #cbd5e0; padding: 10px; border: 1px solid #edf2f7; text-align: left;";
        cell.innerHTML = `<span style="font-size:0.85rem; font-weight:500;">${i}</span>`;
        daysEl.appendChild(cell);
    }
}

function showCalendarEvent(dateStr, event) {
    const titleEl = document.getElementById("cal-detail-title");
    const dateEl = document.getElementById("cal-detail-date");
    const descEl = document.getElementById("cal-detail-desc");
    const modal = document.getElementById("cal-detail-modal");

    if (!titleEl || !dateEl || !descEl || !modal) return;

    // Convert date string to korean format
    const parsedDate = new Date(dateStr);
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const koreanDate = `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 ${parsedDate.getDate()}일 (${dayNames[parsedDate.getDay()]})`;

    titleEl.textContent = event.title;
    dateEl.textContent = koreanDate;
    descEl.textContent = event.desc;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

// 6. Customer Inquiries Management
function getInquiries() {
    try {
        return JSON.parse(localStorage.getItem(INQUIRY_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveInquiries(inquiries) {
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
}

function renderInquiries(filter = "") {
    const listEl = document.getElementById("intra-inquiry-list");
    const emptyEl = document.getElementById("intra-inquiry-empty");
    const tableEl = document.querySelector("#panel-inquiries .inquiry-table");
    
    if (!listEl) return;

    const inquiries = getInquiries();
    const keyword = filter.trim().toLowerCase();
    const filtered = keyword
        ? inquiries.filter(item => 
            item.id.toLowerCase().includes(keyword) || 
            item.name.toLowerCase().includes(keyword)
          )
        : inquiries;

    if (filtered.length === 0) {
        listEl.innerHTML = "";
        emptyEl?.classList.remove("hidden");
        if (tableEl) tableEl.style.display = "none";
        return;
    }

    emptyEl?.classList.add("hidden");
    if (tableEl) tableEl.style.display = "table";

    // Sort by date descending
    const sorted = filtered.slice().reverse();

    listEl.innerHTML = sorted.map(item => {
        let statusBadge = "";
        if (item.status === "접수완료") statusBadge = `<span style="background:rgba(0,119,182,0.1);color:#0077b6;padding:4px 8px;border-radius:4px;font-size:0.8rem;font-weight:600;">접수완료</span>`;
        else if (item.status === "처리중") statusBadge = `<span style="background:rgba(214,158,46,0.1);color:#d69e2e;padding:4px 8px;border-radius:4px;font-size:0.8rem;font-weight:600;">처리중</span>`;
        else if (item.status === "답변완료") statusBadge = `<span style="background:rgba(3,199,90,0.1);color:#03C75A;padding:4px 8px;border-radius:4px;font-size:0.8rem;font-weight:600;">답변완료</span>`;
        else statusBadge = `<span style="background:#eee;color:#666;padding:4px 8px;border-radius:4px;font-size:0.8rem;font-weight:600;">${item.status}</span>`;

        return `
            <tr data-id="${item.id}" style="border-bottom: 1px solid #edf2f7; transition: background 0.15s;">
                <td style="padding: 12px 16px; font-weight: 700; color: #0077b6;">${item.id}</td>
                <td style="padding: 12px 16px; color: #718096;">${formatDate(item.createdAt)}</td>
                <td style="padding: 12px 16px; font-weight: 600; color: #2d3748;">${escapeHtml(item.name)}</td>
                <td style="padding: 12px 16px; color: #4a5568;">${TYPE_LABELS[item.type] || item.type}</td>
                <td style="padding: 12px 16px;">${statusBadge}</td>
                <td style="padding: 12px 16px; text-align: center;">
                    <button class="btn-manage-inquiry" data-id="${item.id}" style="background:#2d3748; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer; transition:background 0.2s;">관리</button>
                </td>
            </tr>
        `;
    }).join("");

    listEl.querySelectorAll("tr").forEach(row => {
        row.addEventListener("mouseenter", () => row.style.background = "rgba(0,0,0,0.01)");
        row.addEventListener("mouseleave", () => row.style.background = "none");
    });

    listEl.querySelectorAll(".btn-manage-inquiry").forEach(btn => {
        btn.addEventListener("click", () => {
            showInquiryManage(btn.dataset.id);
        });
        btn.addEventListener("mouseenter", () => btn.style.background = "#0077b6");
        btn.addEventListener("mouseleave", () => btn.style.background = "#2d3748");
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function showInquiryManage(id) {
    const inquiry = getInquiries().find(item => item.id === id);
    if (!inquiry) return;

    selectedInquiryId = id;

    const body = document.getElementById("intra-inquiry-body");
    const modal = document.getElementById("intra-inquiry-modal");
    const statusSelect = document.getElementById("update-status-select");

    if (!body || !modal || !statusSelect) return;

    body.innerHTML = `
        <dt style="font-weight:700;color:#718096;font-size:0.85rem;margin-top:10px;">접수번호</dt>
        <dd style="font-weight:700;color:#0077b6;font-size:1.05rem;margin-left:0;margin-bottom:10px;">${inquiry.id}</dd>
        <dt style="font-weight:700;color:#718096;font-size:0.85rem;">접수일시</dt>
        <dd style="margin-left:0;margin-bottom:10px;color:#2d3748;">${formatDate(inquiry.createdAt)}</dd>
        <dt style="font-weight:700;color:#718096;font-size:0.85rem;">고객명 / 회사명</dt>
        <dd style="margin-left:0;margin-bottom:10px;font-weight:600;color:#2d3748;">${escapeHtml(inquiry.name)}</dd>
        <dt style="font-weight:700;color:#718096;font-size:0.85rem;">연락처</dt>
        <dd style="margin-left:0;margin-bottom:10px;color:#2d3748;">${escapeHtml(inquiry.phone)}</dd>
        <dt style="font-weight:700;color:#718096;font-size:0.85rem;">문의 유형</dt>
        <dd style="margin-left:0;margin-bottom:10px;color:#2d3748;">${TYPE_LABELS[inquiry.type] || inquiry.type}</dd>
        <dt style="font-weight:700;color:#718096;font-size:0.85rem;">문의 내용</dt>
        <dd style="margin-left:0;background:#f7fafc;padding:12px;border-radius:6px;border:1px solid #edf2f7;color:#4a5568;line-height:1.6;white-space:pre-line;margin-bottom:15px;">${escapeHtml(inquiry.message)}</dd>
    `;

    // Bind current status
    statusSelect.value = inquiry.status;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function saveInquiryStatus() {
    if (!selectedInquiryId) return;

    const select = document.getElementById("update-status-select");
    if (!select) return;

    const inquiries = getInquiries();
    const inquiryIndex = inquiries.findIndex(item => item.id === selectedInquiryId);
    
    if (inquiryIndex > -1) {
        inquiries[inquiryIndex].status = select.value;
        saveInquiries(inquiries);
        
        // Re-render
        const searchInput = document.getElementById("intra-inquiry-search");
        renderInquiries(searchInput ? searchInput.value : "");
        
        // Close modal
        closeIntraModal(document.getElementById("intra-inquiry-modal"));
        
        // Notify
        const existing = document.querySelector(".auth-alert");
        if (existing) existing.remove();
        
        const alert = document.createElement("div");
        alert.className = "auth-alert auth-alert-success";
        alert.innerHTML = `<i class="fa-solid fa-circle-check"></i> 문의 진행 상태가 '${select.value}'(으)로 업데이트되었습니다.`;
        alert.style.cssText = `
            position: fixed; top: 90px; left: 50%; transform: translateX(-50%);
            padding: 14px 24px; border-radius: 10px; font-size: 0.95rem; font-weight: 500;
            z-index: 9999; display: flex; align-items: center; gap: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15); background: #d4edda; color: #155724; border: 1px solid #c3e6cb;
            animation: slideDown 0.3s ease;
        `;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 2500);
    }
}

function closeIntraModal(modal) {
    modal?.classList.add("hidden");
    document.body.style.overflow = "";
}

// 7. Initialization
document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    renderNotices();
    renderCalendar();
    renderInquiries();

    // Notice search
    const noticeSearch = document.getElementById("notice-search");
    noticeSearch?.addEventListener("input", (e) => {
        renderNotices(e.target.value);
    });

    // Inquiry search
    const inquirySearch = document.getElementById("intra-inquiry-search");
    inquirySearch?.addEventListener("input", (e) => {
        renderInquiries(e.target.value);
    });

    // Notice detail close
    const noticeDetailModal = document.getElementById("notice-detail-modal");
    document.getElementById("notice-detail-close")?.addEventListener("click", () => {
        closeIntraModal(noticeDetailModal);
    });

    // Calendar navigation
    document.getElementById("prev-month")?.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById("next-month")?.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Calendar detail close
    const calDetailModal = document.getElementById("cal-detail-modal");
    document.getElementById("cal-detail-close")?.addEventListener("click", () => {
        closeIntraModal(calDetailModal);
    });

    // Inquiry detail close
    const intraInquiryModal = document.getElementById("intra-inquiry-modal");
    document.getElementById("intra-inquiry-close")?.addEventListener("click", () => {
        closeIntraModal(intraInquiryModal);
    });

    // Save inquiry status
    document.getElementById("btn-save-status")?.addEventListener("click", () => {
        saveInquiryStatus();
    });

    // Background clicks to close modals
    [noticeDetailModal, calDetailModal, intraInquiryModal].forEach(modal => {
        modal?.addEventListener("click", (e) => {
            if (e.target === modal) closeIntraModal(modal);
        });
    });

    // Escape key press to close modals
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeIntraModal(noticeDetailModal);
            closeIntraModal(calDetailModal);
            closeIntraModal(intraInquiryModal);
        }
    });
});
