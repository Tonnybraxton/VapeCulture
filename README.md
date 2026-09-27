# VapeCulture 🌿💨

**Kenya's Most Trusted Vape Store** — A static storefront export of [VapeCultureKE](https://vapecultureke.com), featuring a full product catalogue, individual product pages, cart, checkout, and content pages, along with all local HTML, CSS, and JavaScript assets.

---

## 📸 Screenshots

### 🏠 Homepage
![Homepage](screenshots/homepage.jpg)

### 🛍️ All Products — Collections
![Collections Page](screenshots/collections.jpg)

### 📦 Product Detail Page
![Product Page](screenshots/product-page.jpg)

---

## 📁 Project Structure

```
VapeCulture/
├── vapeculture.in/         # Main site mirror
│   ├── index.html          # Homepage
│   ├── collections/        # Product collections (all, disposables, nic salts, etc.)
│   ├── products/           # Individual product pages
│   ├── pages/              # Static content pages
│   ├── blogs/              # Blog posts
│   ├── cdn/                # Local copies of CSS, JS, fonts, images
│   └── cart.html           # Cart page
├── screenshots/            # Project screenshots
├── serve.py                # Local dev server script
└── README.md
```

---

## 🚀 Running Locally

You can serve this project locally using Python's built-in HTTP server:

```bash
python serve.py
```

Then open your browser at **[http://localhost:8080](http://localhost:8080)**

The server automatically redirects the root `/` to `/collections/all.html` (the full product listing page), since the captured homepage is incomplete.

> **Note:** Dynamic Shopify features (cart, checkout, search, login) won't work in the static mirror — only the storefront pages are available locally.

---

## 🛒 What's Included

| Category | Description |
|---|---|
| **Disposable Vapes** | Yuoto XXL, Thanos, Lens 50000, Air Bar, Elf Bar, etc. |
| **Pod Systems** | Vladdin RE, Voopoo Argus, RELX, Uwell Caliburn |
| **JUUL Pods** | JUUL compatible pods, ZIIP Labs, Vladdin |
| **Nic Salts** | Naked 100, BLVK Unicorn, I Love Salts, Vladdin |
| **HEETS** | Philip Morris IQOS HEETS — all flavours |
| **Nicotine Pouches** | ZYN, VELO, White Fox, Lyft |
| **E-Liquids** | Various freebase and salt nicotine e-liquids |

---

## 🏷️ Tech Stack

- **Platform:** Shopify (Dawn theme v15.3.0)
- **Captured with:** HTTrack Website Copier 3.x
- **Local server:** Python `http.server`
- **Currency:** KES (Kenyan Shillings)

---

*Static export for local development and archival purposes.*
