# 🍔 BiteSaver — Swiggy vs Zomato vs Ownly Food Price Comparator

BiteSaver is a modern, 100% free web application designed to compare real-time food dish prices across **Swiggy**, **Zomato**, and **Ownly**, highlighting hidden delivery fees, packaging charges, and coupon savings.

## 🚀 How to Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🌐 How to Host on Netlify (100% Free)

### Method A: Drag & Drop (Easiest)
1. Run `npm run build` in your terminal. This creates a `dist/` folder.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder into the Netlify uploader.
4. Your site is instantly live with a free `.netlify.app` URL!

### Method B: Connect to GitHub
1. Push this project folder to your GitHub repository.
2. Log in to [Netlify](https://netlify.com) and click **Add new site** > **Import an existing project**.
3. Select your repository.
4. Netlify will automatically detect `netlify.toml`:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Deploy Site**.

---

## 💡 Key Features
- **100% Free**: Zero API subscriptions or Apify charges required.
- **Side-by-Side Comparison**: Itemized breakdown (Base Price + Packaging + Delivery - Coupon Discounts).
- **Maximum Savings Indicator**: Highlights cheapest platform & calculates total user savings.
- **Interactive Search**: Search any dish (Paneer, Biryani, Pizza, Burger, Momos, Dal Makhani) with category chips.
- **Netlify Ready**: Includes `netlify.toml` for seamless client-side routing and instant hosting.
