# Book Project

یک سایت برای مطالعه کتاب‌ها که فقط ادمین‌ها می‌توانند کتاب‌ها را مدیریت کنند (افزودن، ویرایش و حذف). این پروژه با استفاده از Express و Passport ساخته شده و از MySQL برای ذخیره‌سازی داده‌ها بهره می‌برد.

## ویژگی‌ها

- ثبت‌نام و ورود کاربران با Passport.js (Local Strategy)
- مدیریت کتاب‌ها فقط توسط کاربران ادمین
- نمایش لیست کتاب‌ها برای همه کاربران
- اتصال به پایگاه داده MySQL با استفاده از ORM Sequelize 
- ساختار RESTful برای روت‌ها
- استفاده از معماری MVC برای پوشه بندی
## تکنولوژی‌ها

- Node.js + Express
- Passport.js (Local Strategy)
- MySQL
- Express-session
- Body-parser

## نصب و راه‌اندازی

1. مخزن را کلون کنید:

```bash
git clone https://github.com/your-username/book-project.git
cd book-project
