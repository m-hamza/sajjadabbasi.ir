# ساختار پروژه سجاد عباسی

## ساختار پوشه‌ها

```
sajjadabbasi.ir/
├── assets/
│   ├── css/              # تمام فایل‌های استایل
│   │   ├── main.css      # استایل اصلی سایت
│   │   ├── tools.css     # استایل صفحه ابزارها
│   │   ├── arabic-sarfe-afaal.css
│   │   └── arabi8-flashcard.css
│   ├── js/               # تمام فایل‌های جاوااسکریپت
│   │   ├── arabic-sarfe-afaal.js
│   │   └── arabi8-flashcard.js
│   └── images/           # تمام تصاویر
│       └── book.jpg
├── pages/                # تمام صفحات HTML
│   ├── contact.html
│   ├── tools.html
│   └── tools/
│       ├── arabic-sarfe-afaal.html
│       └── arabi8-flashcard.html
└── index.html            # صفحه اصلی
```

## ویژگی‌های طراحی

- ✅ طراحی یکدست و حرفه‌ای
- ✅ کاملاً موبایل‌فرندلی (Responsive)
- ✅ سازگار با GitHub Pages (استاتیک)
- ✅ سازماندهی منظم فایل‌ها
- ✅ استفاده از CSS Variables برای یکدستی رنگ‌ها
- ✅ فونت Vazirmatn برای نمایش بهتر فارسی

## صفحات

1. **صفحه اصلی** (`index.html`)
   - معرفی
   - لیست کتب
   - دوره‌های آموزشی
   - محتوای اختصاصی

2. **صفحه تماس** (`pages/contact.html`)
   - فرم تماس
   - اطلاعات تماس

3. **صفحه ابزارها** (`pages/tools.html`)
   - لیست ابزارهای آموزشی

4. **ابزار صرف افعال** (`pages/tools/arabic-sarfe-afaal.html`)
   - صرف افعال در زمان‌های ماضی، مضارع و امر

5. **جعبه لایتنر** (`pages/tools/arabi8-flashcard.html`)
   - سیستم یادگیری لغات عربی پایه هشتم

## رنگ‌های اصلی

- Primary: `#6f42c1` (بنفش)
- Primary Dark: `#4a148c`
- Success: `#10b981` (سبز)
- Danger: `#ef4444` (قرمز)
- Warning: `#f59e0b` (نارنجی)

## نکات مهم

- تمام مسیرها نسبی هستند و برای GitHub Pages مناسب می‌باشند
- هیچ پردازش سمت سرور وجود ندارد
- تمام صفحات استاتیک هستند
- داده‌های جعبه لایتنر در localStorage مرورگر ذخیره می‌شوند

