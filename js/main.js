// COMPONENT
function loadComponent(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;

      // menjalankan menu yang sedang aktif
      setActiveMenu();
    });
}

// untuk memanggil component ke pages
loadComponent("sidebar", "../components/sidebar.html");
loadComponent("topbar", "../components/topbar.html");

// SIDEBAR
document.addEventListener("click", function (e) {
  const sidebar = document.querySelector(".sidebar");
  const burger = document.getElementById("burger-btn");
  const overlay = document.getElementById("overlay");

  // buka sidebar
  if (burger && e.target === burger) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    burger.style.display = "hidden";
  }

  // tutup sidebar
  if (overlay && (e.target.id === "overlay" || e.target.id === "content")) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    if (burger) {
      burger.classList.remove("block");
    }
  }
});

// MENU AKTIF
function setActiveMenu() {
  const links = document.querySelectorAll(".list-item a");

  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (currentPath.includes(linkPath)) {
      document.querySelectorAll(".list-item").forEach((item) => {
        item.classList.remove("active");
      });

      link.closest(".list-item").classList.add("active");
    }
  });
}

// MODAL TAMBAH PENGHUNI
document.addEventListener("DOMContentLoaded", () => {
  const addKamarBtn = document.getElementById("addKamarBtn");
  if (!addKamarBtn) return;

  const modalTambah = document.getElementById("modal-TambahKamar");
  const modalAkun = document.getElementById("modalBuatAkunPenghuni");

  const overlay = document.getElementById("overlayModal");
  const successOverlay = document.getElementById("successOverlay");

  const btnNext = modalTambah.querySelector(".btn-next");
  const btnCancel = modalTambah.querySelector(".btn-cancel");
  const btnCloseTambah = modalTambah.querySelector(".close-btn");

  const btnBack = document.getElementById("btnBack");
  const btnCloseAkun = modalAkun.querySelector(".close-btn");

  const formAkun = document.getElementById("formAkunPenghuni");

  // BUKA MODAL TAMBAH
  const toggleModalTambah = (show = false) => {
    const display = show ? "block" : "none";
    modalTambah.style.display = display;
    overlay.style.display = display;
  };

  addKamarBtn.onclick = () => toggleModalTambah(true);

  // TUTUP MODAL TAMBAH
  const closeModalTambah = () => {
    modalTambah.style.display = "none";
    overlay.style.display = "none";
  };

  btnCancel.onclick = closeModalTambah;
  btnCloseTambah.onclick = closeModalTambah;

  // LANJUT KE MODAL AKUN
  btnNext.onclick = () => {
    modalTambah.style.display = "none";
    modalAkun.style.display = "block";
  };

  // KEMBALI KE MODAL PERTAMA
  btnBack.onclick = () => {
    modalAkun.style.display = "none";
    modalTambah.style.display = "block";
  };

  // TUTUP MODAL AKUN
  btnCloseAkun.onclick = () => {
    modalAkun.style.display = "none";
    overlay.style.display = "none";
  };

  // SUBMIT AKUN
  formAkun.onsubmit = (e) => {
    e.preventDefault();

    modalAkun.style.display = "none";
    overlay.style.display = "none";

    successOverlay.style.display = "flex";

    setTimeout(() => {
      successOverlay.style.display = "none";
    }, 2000);

    console.log("Penghuni dan akun berhasil dibuat");
  };

  // KLIK OVERLAY
  overlay.onclick = () => {
    modalTambah.style.display = "none";
    modalAkun.style.display = "none";
    modalEdit.style.display = "none";
    modalDelete.style.display = "none";
    overlay.style.display = "none";
  };

  // ==========================
  // MODAL DETAIL PENGHUNI
  // ==========================

  const modalDetail = document.getElementById("modalDetailPenghuni");

  const toggleModalDetail = (show = false) => {
    const display = show ? "block" : "none";
    modalDetail.style.display = display;
    overlay.style.display = display;
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest(".select-icon")) {
      e.preventDefault();

      const row = e.target.closest("tr");

      const kode = row.children[0].textContent;
      const nama = row.children[1].textContent;
      const nohp = row.children[2].textContent;
      const kamar = row.children[3].textContent;
      const tanggal = row.children[4].textContent;

      document.getElementById("detail-kode").value = kode;
      document.getElementById("detail-nama").value = nama;
      document.getElementById("detail-nohp").value = nohp;
      document.getElementById("detail-kamar").value = kamar;
      document.getElementById("detail-tanggal").value = tanggal;

      toggleModalDetail(true);
    }
  });

  [
    modalDetail.querySelector(".close-btn"),
    modalDetail.querySelector(".btn-cancel"),
  ].forEach((el) => (el.onclick = () => toggleModalDetail(false)));

  // ==========================
  // MODAL EDIT
  // ==========================

  const modalEdit = document.getElementById("modalEditKamar");
  const successOverlayEdit = document.getElementById("successOverlayEdit");
  const formEdit = modalEdit.querySelector("form");

  const toggleModalEdit = (show = false) => {
    const display = show ? "block" : "none";
    modalEdit.style.display = display;
    overlay.style.display = display;
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest(".edit-icon")) {
      e.preventDefault();

      const row = e.target.closest("tr");

      const kode = row.children[0].textContent;
      const nama = row.children[1].textContent;
      const nohp = row.children[2].textContent;
      const kamar = row.children[3].textContent;
      const tanggal = row.children[4].textContent;

      document.getElementById("edit-nomor").value = kamar;

      toggleModalEdit(true);
    }
  });

  [
    modalEdit.querySelector(".close-btn"),
    modalEdit.querySelector(".btn-cancel"),
  ].forEach((el) => (el.onclick = () => toggleModalEdit(false)));

  formEdit.onsubmit = (e) => {
    e.preventDefault();

    toggleModalEdit(false);

    successOverlayEdit.style.display = "flex";

    setTimeout(() => {
      successOverlayEdit.style.display = "none";
    }, 2000);

    console.log("Edit form submitted");
  };

  // ==========================
  // MODAL DELETE
  // ==========================

  const modalDelete = document.getElementById("modalDeleteKamar");
  const successOverlayDelete = document.getElementById("successOverlayDelete");

  const toggleModalDelete = (show = false) => {
    const display = show ? "block" : "none";
    modalDelete.style.display = display;
    overlay.style.display = display;
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest(".delete-icon")) {
      e.preventDefault();

      const row = e.target.closest("tr");

      const nomor = row.children[3].textContent;

      document.getElementById("delete-nomor").textContent = nomor;

      toggleModalDelete(true);
    }
  });

  [
    modalDelete.querySelector(".close-btn"),
    modalDelete.querySelector(".btn-cancel"),
  ].forEach((el) => (el.onclick = () => toggleModalDelete(false)));

  modalDelete.querySelector(".btn-delete").onclick = () => {
    toggleModalDelete(false);

    successOverlayDelete.style.display = "flex";

    setTimeout(() => {
      successOverlayDelete.style.display = "none";
    }, 2000);

    console.log("Delete confirmed");
  };
});
