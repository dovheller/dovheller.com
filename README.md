# dovheller.com

אתר סטטי בעמוד אחד של דב הלר / הלר דיגיטל, בעברית ובאנגלית.

## מה יש כאן

- `index.html` — כל האתר: ראשי, דב הלר, יכולות, סייבר, הוכחות, פרוטוקול וקשר. המעבר בין הדפים ובין השפות נעשה בתוך העמוד.
- `assets/fonts/` — פונט Almoni Neue AAA בחמישה משקלים (300 עד 700).
- `assets/logo.png` — הלוגו.
- `favicon.ico`, `favicon-32.png` — אייקון האתר.
- `.nojekyll` — מורה ל-GitHub Pages להגיש את הקבצים כמו שהם.

אין שלב בנייה. פותחים את `index.html` בדפדפן, או מגישים את התיקייה מכל שרת סטטי.

## העלאה ל-GitHub

```bash
git init
git add .
git commit -m "dovheller.com static site"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

## פרסום ב-GitHub Pages

1. במאגר: Settings ← Pages.
2. תחת Source לבחור Deploy from a branch, ענף `main`, תיקייה `/ (root)`.
3. לדומיין dovheller.com: להזין אותו תחת Custom domain ולעדכן את רשומות ה-DNS לפי ההנחיות של GitHub.

## לפני עלייה לאוויר

- **רישיון הפונט:** Almoni Neue AAA הוא פונט מסחרי. לוודא שהרישיון מתיר הטמעה באתר, ולשקול מאגר פרטי כדי שקובצי הפונט לא יהיו חשופים להורדה.
- **Tailwind:** העיצוב נטען מ-`cdn.tailwindcss.com`. זה מתאים לטיוטה; לאתר חי מומלץ לבנות קובץ CSS קבוע.
- **וואטסאפ:** קישורי הוואטסאפ מפנים ל-‎+972-52-5610123. אם המספר הנכון אחר, להחליף את `wa.me/972525610123` ב-`index.html`.
- **מדידה:** חלונית ההסכמה שומרת את הבחירה בדפדפן, אבל עדיין לא מחובר אליה כלי מדידה.
- **נוסחים משפטיים:** טקסטי הפרטיות, הנגישות והתנאים קצרים מאוד; כדאי שעורך דין יעבור עליהם.
