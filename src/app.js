document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "HKA Font",
        img: "HKA Font.png",
        price: 12000,
        description: "Custom font handwriting, hanya ada Regular font",
      },
      {
        id: 2,
        name: "WPW Font",
        img: "WPW Font.png",
        price: 12000,
        description: "Custom font handwriting, hanya ada Regular font",
      },
      {
        id: 3,
        name: "Bussiness Card",
        img: "Card Template 1.svg",
        price: 16000,
        description: "Kartu Nama minimalis dan feminim (Canva Template)",
      },
      {
        id: 4,
        name: "Template CV Minimalis",
        img: "CV Template.svg",
        price: 20000,
        description: "Template CV minimalis dengan format EPS dan SVG",
      },
      {
        id: 5,
        name: "Invoice Auto Send Email as PDF",
        img: "gsheet to pdf.png",
        price: 20000,
        description:
          "Invoice Template google sheets yang bisa otomatis langsung kirim email bentuk PDF",
      },
    ],
  }));

  Alpine.data("produk", () => ({
    barang: [
      {
        id: 1,
        name: "Mewarnai Jadi Asik",
        img: "Mewarnai.svg",
        price: 8000,
        description:
          "Buku mewarnai karakter hewan khusus untuk anak Batita sampai Balita (PDF)",
      },
      {
        id: 2,
        name: "Wall Art Quotes",
        img: "wallart.svg",
        price: 12000,
        description:
          "Quotes random yang bisa bikin kamu semangat, berisikan 6 quotes dalam bentuk PDF",
      },
      {
        id: 3,
        name: "Label Nama",
        img: "Label Nama.png",
        price: 16000,
        description:
          "Label nama lucu yang cocok untuk label buku anak - anak (PDF)",
      },
      {
        id: 4,
        name: "Preschool Worksheet",
        img: "worksheet1.svg",
        price: 16000,
        description:
          "Worksheet menarik yang membantu anak anda belajar menghitung dan menulis (PDF)",
      },
      {
        id: 5,
        name: "Mewarnai Huruf",
        img: "Mewarnai Huruf.png",
        price: 8000,
        description:
          "Lembar kerja untuk buah hati yang baru mulai untuk belajar mewarnai dan membaca (PDF)",
      },
      {
        id: 5,
        name: "Preschool Worksheet 2",
        img: "Worksheet 2.png",
        price: 8000,
        description: "Lembar kerja khusus untuk melatih motoriknya (PDF)",
      },
      {
        id: 6,
        name: "DIY Kalender 2025",
        img: "kalender 2025.png",
        price: 20000,
        description:
          "Kalender 2025 lengkap dengan libur nasional dan cuti bersama. Kalender ini tinggal kamu print dan bisa ditulis-tulis sesuka hati.",
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek jika ada item yg sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada atau cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang ada, cek apakah barang sama atau beda di cart
        this.items = this.items.map((item) => {
          // jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang ada, tambah quantity dan total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove
      const cartItem = this.items.find((item) => item.id === id);

      // jika item  lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri satu-satu
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol checkout di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("http://wa.me/6281334227530?text=" + encodeURIComponent(message));
});

// format message whatsapp
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  Phone: ${obj.phone}

Data Pesanan
${JSON.parse(obj.items).map(
  (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
)}
TOTAL: ${rupiah(obj.total)}
Terima Kasih.`;
};

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
