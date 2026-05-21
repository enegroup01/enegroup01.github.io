type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, text, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} data-reveal>
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-steel md:text-lg">{text}</p> : null}
    </div>
  );
}
