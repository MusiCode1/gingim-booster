# Gingim Booster - מגביר המוטיבציה של ג'ינג'ים

## תיאור הפרויקט
Gingim Booster הוא תוסף לאתר ג'ינג'ים (Gingim.net) שנועד להגביר את המוטיבציה של תלמידים בתפקוד נמוך מאוד לשחק במשחקים הלימודיים באתר. התוסף מוסיף שכבת תמריצים נוספת למשחקים הקיימים על ידי הצגת סרטונים קצרים כפרס לאחר השלמת משימות במשחק.

## איך זה עובד?
1. התלמיד משחק במשחק הלימודי כרגיל
2. לאחר השלמת משימה בהצלחה והצגת האנימציה המקורית של המשחק
3. מוצג חלון קופץ עם סרטון קצר כפרס נוסף
4. החלון נסגר אוטומטית לאחר כ-20 שניות
5. התלמיד ממשיך למשימה הבאה במשחק

## מבנה הפרויקט

### רכיבי ממשק משתמש
- חלון קופץ להצגת סרטונים
- תמיכה בסרטוני יוטיוב
- אנימציית טעינה
- ממשק משתמש נקי ופשוט

### לוגיקה עסקית
- ניהול אינטראקציות המשחק
- הגדרות ותצורת המשחקים
- ניהול רשימת הסרטונים
- הזרקת קוד לדף המשחק

### כלי ניתוח
- ניתוח משחקים קיימים באתר
- איסוף מידע על נקודות ההתערבות במשחקים

## טכנולוגיות
- Svelte - ספריית UI
- TypeScript - שפת פיתוח
- Vite - כלי בנייה
- Tailwind CSS - עיצוב
- Fully Kiosk Browser - אפליקציית אנדרואיד להצגת תוכן במצב קיוסק והפעלת סרטונים מקומיים

## התקנה
1. התקן את התלויות:
```bash
npm install
```

2. הרץ את הפרויקט במצב פיתוח:
```bash
npm run dev
```

3. בנה את הפרויקט:
```bash
npm run build
```
