export function Header() {
  return (
    <header className="site-header reveal-item" data-reveal>
      <img
        className="poalim-logo"
        src="/figma/poalim-logo.svg"
        alt="בנק הפועלים"
        width={212}
        height={38}
      />
      <a className="advisor-link" href="#advisors">
        <img
          src="/figma/icon-arrow-left.svg"
          alt=""
          width={16}
          height={16}
        />
        <span>כניסת יועצים חיצוניים</span>
      </a>
    </header>
  );
}
