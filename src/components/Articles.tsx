const ARTICLES = [
  {
    title: "ישראל, כלכלן הדיור של בנק הפועלים מסביר",
    image: "/figma/article-3-161805.png",
    author: "אור ישראלי",
  },
  {
    title: "מחיר למשתכן - כל מה שחשוב לדעת",
    image: "/figma/article-2-7fd3bb.png",
    author: "דנה כהן",
  },
  {
    title: "פרויקטים מלווים על-ידי בנק הפועלים",
    image: "/figma/article-1-603e2f.png",
    author: "מאור לוי",
  },
];

const LOREM =
  "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. ";

export function Articles() {
  return (
    <section className="articles-section">
      <img
        className="articles-icon"
        src="/figma/articles-icon.png"
        alt=""
        width={214}
        height={135}
      />
      <h2>אספנו עבורכם מידע פיננסי שכדאי לדעת</h2>
      <div className="article-grid">
        {ARTICLES.map((article) => (
          <article key={article.title} className="article-card">
            <img src={article.image} alt="" width={440} height={325} />
            <div className="article-body">
              <h3>{article.title}</h3>
              <p>{LOREM}</p>
              <div className="article-meta">
                <span>{article.author}</span>
                <span>8.3.2023</span>
                <span>4 דקות</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <a className="all-articles" href="#articles">
        לכל הכתבות
        <img src="/figma/icon-arrow-left.svg" alt="" width={16} height={16} />
      </a>
    </section>
  );
}
