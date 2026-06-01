'use client';

import { useState } from "react";

const questions = [
  { text: "Ik voel me vaak moe, zelfs na slaap.", sec: 0 },
  { text: "Ik adem regelmatig hoog of door mijn mond.", sec: 1 },
  { text: "Ik heb moeite om te ontspannen.", sec: 2 },
  { text: "Ik pieker veel.", sec: 3 },
  { text: "Ik sta vaak 'aan'.", sec: 2 },
  { text: "Ik houd spanning vast in mijn lichaam.", sec: 1 },
  { text: "Ik vind het lastig om nee te zeggen.", sec: 4 },
  { text: "Ik voel me verantwoordelijk voor anderen.", sec: 4 },
  { text: "Ik heb weinig echte rustmomenten.", sec: 0 },
  { text: "Ik voel me snel overprikkeld.", sec: 2 },
  { text: "Ik vergeet soms bewust te ademen.", sec: 1 },
  { text: "Ik ervaar vaak stress of druk.", sec: 2 },
  { text: "Ik heb weinig energie over aan het einde van de dag.", sec: 0 },
  { text: "Ik zucht vaak of voel spanning in mijn borst.", sec: 1 },
  { text: "Ik probeer controle te houden in situaties.", sec: 3 },
  { text: "Ik ga vaak door, ook als mijn lichaam rust vraagt.", sec: 1 },
  { text: "Ik vind het moeilijk om grenzen aan te geven.", sec: 4 },
  { text: "Ik voel me emotioneel snel vol.", sec: 2 },
  { text: "Ik ben vaak bezig met wat anderen nodig hebben.", sec: 4 },
  { text: "Ik herstel langzaam na drukke dagen.", sec: 0 },
];

const sections = [
  "Energie & herstel",
  "Adempatroon & lichaam",
  "Spanning & prikkels",
  "Mentaal & controle",
  "Grenzen & zorg voor anderen",
];

const labels = ["Nooit", "Soms", "Regelmatig", "Vaak"];

const types = [
  {
    name: "Overlever",
    range: "0–15",
    tagline: "Je systeem is grotendeels in balans — al zijn er subtiele signalen.",
    desc: "Je zenuwstelsel functioneert redelijk goed. Je herkent stress, maar je lichaam heeft ook echte herstelmomenten. Dit is een gezond uitgangspunt, al is het waardevol om bewust te blijven investeren in je ademhaling en ontspanning — zeker in drukke periodes.",
    breath: "Je ademt waarschijnlijk overwegend rustig en door de neus. Misschien merk je bij stress of inspanning dat je adem sneller of hoger gaat — dat is normaal. Je terugkeerpunt naar rust is aanwezig en functioneert.",
    patterns: [
      "Je merkt stress op, maar raakt er niet snel in vast.",
      "Je hebt momenten van echte ontspanning in je dag.",
      "Soms negeer je vermoeidheid, maar je lichaam geeft duidelijke signalen.",
      "Je kunt redelijk goed grenzen aangeven, al kost het soms moeite.",
    ],
    advice: [
      "Bewaak je goede gewoontes bewust — ze zijn jouw buffer.",
      "Neem dagelijks een korte bewuste ademmoment, ook als het niet nodig lijkt.",
      "Investeer in slaap en echte rust om je zenuwstelsel te voeden.",
    ],
    helps: ["Neusademhaling", "Korte adempauzes", "Natuur & beweging", "Goede slaaphygiëne"],
    ctaText: "Zelfs een gezond systeem kan verdiepen. Een ademsessie bij Praktijk Confident geeft je tools om bewuster en vollediger te ademen.",
    services: ["Ademcoaching sessie", "Verdiepende ademcursus"],
  },
  {
    name: "Doorzetter",
    range: "16–30",
    tagline: "Je gaat door terwijl je systeem om pauze vraagt.",
    desc: "Je staat regelmatig in een lichte stressstand — ook als je dat zelf niet altijd voelt. Je lichaam vraagt om pauze, maar je geest zegt 'nog even'. Dit patroon is uitputtend voor je zenuwstelsel. Je herstelt langzamer dan je denkt, en de buffer die je had wordt kleiner.",
    breath: "Je ademt waarschijnlijk regelmatig hoog of oppervlakkig, zeker in drukke momenten. Misschien adem je gedeeltelijk door je mond zonder het te merken. Je middenrif is minder actief dan goed voor je is — je lichaam mist de diepe signalen van veiligheid die lage ademhaling geeft.",
    patterns: [
      "Je doet 'gewoon' door, ook als je moe bent.",
      "Ontspannen voelt soms als iets dat je moet verdienen.",
      "Je bent productief, maar energie raakt langzaam op.",
      "Je herstelt na weekenden of vakanties, maar het effect verdwijnt snel.",
    ],
    advice: [
      "Plan rust in als afspraak — niet als restpost.",
      "Oefen dagelijks 5 minuten bewuste neusademhaling via het middenrif.",
      "Leer het verschil voelen tussen 'klaar' en 'aan'.",
      "Minder doen is geen falen — het is herstel.",
    ],
    helps: ["Middenrifademhaling", "Vaste rustmomenten", "Lichaamsscan", "Wandelen zonder doel"],
    ctaText: "Doorzetten is een kwaliteit én een valkuil. Ademcoaching bij Praktijk Confident helpt je herkennen wanneer je systeem rust nodig heeft — en geeft je tools om werkelijk te herstellen.",
    services: ["Ademcoaching traject", "NEI-therapie sessie"],
  },
  {
    name: "Controlehouder",
    range: "31–45",
    tagline: "Je ademhaling spiegelt een zenuwstelsel dat voortdurend alert is.",
    desc: "Jouw systeem staat al langere tijd in een verhoogde staat van alertheid. Controle houden, piekeren, moeite met loslaten — dat zijn signalen dat je zenuwstelsel overwerkt. Je lichaam staat in de vecht-of-vluchtmodus, ook als er objectief gezien geen gevaar is. Dit vraagt veel energie.",
    breath: "Je adem is waarschijnlijk snel, hoog en onregelmatig — soms met lange inhoudingen of periodes van ondiepe ademhaling. Je borst en schouders zijn betrokken waar je middenrif zou moeten zijn. Je lichaam mist het regelmatige signaal van veiligheid dat rustige, lage ademhaling geeft.",
    patterns: [
      "Je piekert vaak — ook over dingen die je niet kunt beïnvloeden.",
      "Je probeert situaties te beheersen om je veilig te voelen.",
      "Je lichaam is gespannen, ook als je 'rust'.",
      "Loslaten voelt onveilig of oncomfortabel.",
      "Je hebt weinig echte rustmomenten die werkelijk herstellen.",
    ],
    advice: [
      "Oefen dagelijks met verlengde uitademing via de neus — dit activeert je rempedaal.",
      "Leer je zenuwstelsel stap voor stap dat ontspanning veilig is.",
      "Werk met lichaamsgericht ademwerk — denken alleen lost dit niet op.",
      "Onderzoek welke overtuiging achter controle zit.",
    ],
    helps: ["Verlengde uitademing", "Vaguszenuw activatie", "Cacao ceremonies", "NEI-therapie"],
    ctaText: "Controle is een beschermingspatroon. NEI-therapie en ademcoaching bij Praktijk Confident helpen je zenuwstelsel te leren dat loslaten veilig is — op een rustige, diepgaande manier.",
    services: ["NEI-therapie traject", "Adem & lichaamsgericht werk"],
  },
  {
    name: "Overprikkelde zorggever",
    range: "46–60",
    tagline: "Jij geeft continu — aan anderen, aan taken, aan het leven. Jij mag nu eerst.",
    desc: "Je systeem staat al langere tijd onder hoge druk. Emotionele belasting, zorgen voor anderen, weinig herstel — dit alles heeft zijn tol geëist op je zenuwstelsel, je energie en je ademhaling. Je lichaam schreeuwt om rust, maar de gewoonte om door te gaan is diep ingeslepen. Dit is geen zwakte — dit is de prijs van te veel geven zonder voldoende terugontvangen.",
    breath: "Je adem is waarschijnlijk hoog, snel en onregelmatig. Zuchten, mond inademen, spanning in de borst — dit zijn tekenen dat je zenuwstelsel uitgeput raakt. Je lichaam kan de cyclus van spanning en ontspanning niet meer goed voltooien. Ademwerk is voor jou geen luxe, maar een noodzaak.",
    patterns: [
      "Je bent moe, maar kunt ook niet echt tot rust komen.",
      "De zorg voor anderen gaat vóór de zorg voor jezelf.",
      "Je voelt je emotioneel snel vol of juist gevoelloos.",
      "Grenzen aangeven kost je veel energie of schuldgevoel.",
      "Je vraagt je soms af wanneer jij aan de beurt bent.",
    ],
    advice: [
      "Begin met één ding: elke dag 5 minuten alleen voor jou, met bewuste neusademhaling.",
      "Toestemming geven aan jezelf om te ontvangen — dat is de eerste stap.",
      "Zoek professionele begeleiding: dit patroon lost zich niet alleen op.",
      "Kleine stappen tellen. Je hoeft niet alles tegelijk te veranderen.",
    ],
    helps: ["Herstellende ademtechnieken", "Cacao ceremonies", "NEI-therapie", "Essentiële oliën voor rust"],
    ctaText: "Jij hebt al zo lang voor anderen gezorgd. Het is tijd om te ontvangen. Bij Praktijk Confident bied ik holistische begeleiding die aansluit bij jouw systeem — zacht, diepgaand en op jouw tempo.",
    services: ["Intensief begeleidingstraject", "NEI-therapie & ademcoaching"],
  },
];

const typeColors = ["#9ec4ae", "#5a9e7a", "#2d7a56", "#1a3d2e"];

function getTypeIndex(score: number) {
  if (score <= 15) return 0;
  if (score <= 30) return 1;
  if (score <= 45) return 2;
  return 3;
}

const G = "#1a3d2e";
const GL = "#dceedd";
const GM = "#9ec4ae";
const GD = "#0d2418";

const s = {
  wrap: { padding: "1.5rem 0", maxWidth: 620, fontFamily: "system-ui, sans-serif" },
  hero: { padding: "1.5rem", background: G, borderRadius: 12, marginBottom: "2rem" },
  heroH: { fontSize: 22, fontWeight: 500, color: GL, marginBottom: "0.5rem" },
  heroP: { fontSize: 14, color: GM, lineHeight: 1.6 },
  heroMeta: { display: "flex", gap: "1rem", marginTop: "1rem" },
  heroMetaS: { fontSize: 12, color: GM },
  progWrap: { marginBottom: "1.5rem" },
  progLabel: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 6 },
  progBar: { height: 6, background: "#e0e0e0", borderRadius: 3, overflow: "hidden" },
  progFill: (pct: number) => ({ height: "100%", width: pct + "%", background: G, borderRadius: 3, transition: "width 0.3s" }),
  secHdr: { fontSize: 13, fontWeight: 500, color: G, textTransform: "uppercase" as const, letterSpacing: "0.07em", margin: "2rem 0 0.75rem", paddingBottom: "0.4rem", borderBottom: `1px solid ${GL}` },
  qBlock: (answered: boolean, error: boolean) => ({
    marginBottom: "1rem", padding: "1rem 1.25rem",
    background: "#fff", border: `0.5px solid ${error ? "#a32d2d" : answered ? G + "44" : "#e0e0e0"}`,
    borderRadius: 12, transition: "border-color 0.2s",
  }),
  qNum: { fontSize: 11, color: "#aaa", marginBottom: "0.3rem" },
  qText: { fontSize: 15, color: "#222", lineHeight: 1.6, marginBottom: "0.75rem" },
  opts: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 },
  optBtn: (sel: boolean) => ({
    display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center",
    padding: "8px 4px", border: `0.5px solid ${sel ? G : "#e0e0e0"}`,
    borderRadius: 8, cursor: "pointer",
    background: sel ? GL : "#f5f5f5",
    fontSize: 11, color: sel ? G : "#666",
    minHeight: 52, gap: 3, transition: "all 0.15s", textAlign: "center" as const,
  }),
  optVal: (sel: boolean) => ({ fontSize: 17, fontWeight: 500, color: sel ? G : "#222" }),
  btnMain: { display: "block", width: "100%", padding: 15, background: G, color: GL, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: "2rem" },
  btnOutline: { display: "block", width: "100%", padding: 12, background: "transparent", color: "#222", border: "0.5px solid #ccc", borderRadius: 12, fontSize: 14, cursor: "pointer", marginTop: "0.75rem" },
  missing: { fontSize: 13, color: "#a32d2d", marginTop: "0.75rem", textAlign: "center" as const, padding: 10, background: "#FCEBEB", borderRadius: 8 },
  resHero: { padding: "1.75rem", background: G, borderRadius: 12, marginBottom: "1.25rem" },
  resBadge: { display: "inline-block", padding: "4px 12px", borderRadius: 20, background: GL, color: G, fontSize: 12, fontWeight: 500, marginBottom: "0.75rem" },
  resType: { fontSize: 26, fontWeight: 500, color: GL, marginBottom: "0.5rem" },
  resTagline: { fontSize: 14, color: GM, lineHeight: 1.6 },
  scoreTrack: { height: 8, background: GD, borderRadius: 4, overflow: "hidden", marginTop: "1.25rem" },
  scoreFill: (pct: number) => ({ height: "100%", width: pct + "%", background: GL, borderRadius: 4, transition: "width 1s ease" }),
  scoreMeta: { display: "flex", justifyContent: "space-between", fontSize: 12, color: GM, marginTop: 5 },
  zoneRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4, marginTop: "0.75rem" },
  zone: (active: boolean) => ({ padding: "5px 4px", borderRadius: 4, fontSize: 10, textAlign: "center" as const, color: active ? G : GM, background: active ? GL : GD }),
  blockCard: { padding: "1.25rem", background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, marginBottom: "1rem" },
  blockH: { fontSize: 15, fontWeight: 500, color: "#222", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: 8 },
  blockIcon: { width: 24, height: 24, borderRadius: "50%", background: GL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 },
  blockP: { fontSize: 14, color: "#555", lineHeight: 1.7 },
  patCard: { padding: "1.25rem", background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, marginBottom: "1rem" },
  patRow: { display: "flex", gap: 10, marginBottom: "0.5rem", alignItems: "flex-start" as const },
  patDot: { width: 8, height: 8, borderRadius: 2, background: G, marginTop: 6, flexShrink: 0 },
  advCard: { padding: "1.25rem", background: GL, border: `0.5px solid ${G}33`, borderRadius: 12, marginBottom: "1rem" },
  advLabel: { fontSize: 11, color: G, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: "0.07em", marginBottom: "0.75rem" },
  advItem: { display: "flex", gap: 10, marginBottom: "0.6rem", alignItems: "flex-start" as const },
  advDot: { width: 6, height: 6, borderRadius: "50%", background: G, marginTop: 7, flexShrink: 0 },
  helpsWrap: { padding: "1.25rem", background: "#f5f5f5", border: "0.5px solid #e0e0e0", borderRadius: 12, marginBottom: "1rem" },
  helpsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: "0.75rem" },
  helpPill: { padding: "8px 12px", background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 8, fontSize: 13, color: "#222" },
  typeRow: { display: "flex", gap: 10, alignItems: "center", padding: "10px 0" },
  typeDot: (color: string) => ({ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }),
  typeName: (cur: boolean) => ({ fontSize: 14, fontWeight: 500, color: cur ? G : "#222" }),
  typeRange: { fontSize: 12, color: "#aaa" },
  ctaBlock: { padding: "1.5rem", background: G, borderRadius: 12, marginBottom: "1rem" },
  ctaH: { fontSize: 17, fontWeight: 500, color: GL, marginBottom: "0.5rem" },
  ctaP: { fontSize: 14, color: GM, lineHeight: 1.6, marginBottom: "1rem" },
  ctaGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1rem" },
  ctaPill: { padding: "10px 12px", background: GD, borderRadius: 8, fontSize: 13, color: GL, display: "flex", alignItems: "center", gap: 6 },
  ctaLink: { display: "block", width: "100%", padding: 12, background: GL, color: G, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, textAlign: "center" as const, cursor: "pointer", textDecoration: "none" },
};

export default function Scan() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<number[]>([]);
  const [showMissing, setShowMissing] = useState(false);

  const answered = Object.keys(answers).length;
  const pct = Math.round((answered / questions.length) * 100);

  const setAnswer = (i: number, v: number) => {
    setAnswers(a => ({ ...a, [i]: v }));
    setErrors(e => e.filter(x => x !== i));
  };

  const submit = () => {
    const missing = questions.map((_, i) => i).filter(i => answers[i] === undefined);
    if (missing.length > 0) {
      setErrors(missing);
      setShowMissing(true);
      return;
    }
    setShowMissing(false);
    const score = questions.reduce((sum, _, i) => sum + answers[i], 0);
    setResult(score);
  };

  const reset = () => {
    setAnswers({});
    setResult(null);
    setErrors([]);
    setShowMissing(false);
  };

  if (result !== null) {
    const ti = getTypeIndex(result);
    const t = types[ti];
    const scorePct = Math.round((result / 60) * 100);
    return (
      <div style={s.wrap}>
        <div style={s.resHero}>
          <div style={s.resBadge}>Jouw ademtype</div>
          <div style={s.resType}>{t.name}</div>
          <div style={s.resTagline}>{t.tagline}</div>
          <div style={s.scoreTrack}><div style={s.scoreFill(scorePct)} /></div>
          <div style={s.scoreMeta}><span>Score: {result} van 60</span><span>Schaal: 0–60</span></div>
          <div style={s.zoneRow}>
            {types.map((tp, i) => (
              <div key={i} style={s.zone(i === ti)}>
                {tp.name}<br /><span style={{ fontSize: 9, opacity: 0.8 }}>{tp.range}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={s.blockCard}>
          <div style={s.blockH}><div style={s.blockIcon}>✦</div>Wat dit over jou zegt</div>
          <p style={s.blockP}>{t.desc}</p>
        </div>

        <div style={s.blockCard}>
          <div style={s.blockH}><div style={s.blockIcon}>◎</div>Jouw adempatroon</div>
          <p style={s.blockP}>{t.breath}</p>
        </div>

        <div style={s.patCard}>
          <div style={{ fontSize: 15, fontWeight: 500, color: "#222", marginBottom: "0.75rem" }}>Herkenbare patronen</div>
          {t.patterns.map((p, i) => (
            <div key={i} style={s.patRow}><div style={s.patDot} /><p style={s.blockP}>{p}</p></div>
          ))}
        </div>

        <div style={s.advCard}>
          <div style={s.advLabel}>Wat jij nu nodig hebt</div>
          {t.advice.map((a, i) => (
            <div key={i} style={s.advItem}><div style={s.advDot} /><p style={{ fontSize: 14, color: G, lineHeight: 1.6 }}>{a}</p></div>
          ))}
        </div>

        <div style={s.helpsWrap}>
          <div style={{ fontSize: 15, fontWeight: 500, color: "#222" }}>Wat helpt voor jou</div>
          <div style={s.helpsGrid}>
            {t.helps.map((h, i) => <div key={i} style={s.helpPill}>{h}</div>)}
          </div>
        </div>

        <div style={s.blockCard}>
          <div style={{ fontSize: 15, fontWeight: 500, color: "#222", marginBottom: "0.75rem" }}>De vier ademtypen</div>
          {types.map((tp, i) => (
            <div key={i} style={{ ...s.typeRow, borderBottom: i === 3 ? "none" : "0.5px solid #e0e0e0" }}>
              <div style={s.typeDot(typeColors[i])} />
              <div>
                <div style={s.typeName(i === ti)}>{tp.name}{i === ti ? " ← jij" : ""}</div>
                <div style={s.typeRange}>Score {tp.range} · {tp.tagline}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={s.ctaBlock}>
          <div style={s.ctaH}>Klaar voor de volgende stap?</div>
          <p style={s.ctaP}>{t.ctaText}</p>
          <div style={s.ctaGrid}>
            {t.services.map((sv, i) => (
              <div key={i} style={s.ctaPill}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: GL, flexShrink: 0, display: "inline-block" }} />
                {sv}
              </div>
            ))}
          </div>
          <a href="https://praktijkconfident.nl" style={s.ctaLink}>Bekijk praktijkconfident.nl →</a>
        </div>

        <button style={s.btnOutline} onClick={reset}>↩ Opnieuw doen</button>
      </div>
    );
  }

  const bySec = sections.map((sec, si) => ({
    label: sec,
    qs: questions.map((q, i) => ({ ...q, i })).filter(q => q.sec === si),
  }));

  return (
    <div style={s.wrap}>
      <div style={s.hero}>
        <div style={s.heroH}>Adem & energie scan</div>
        <p style={s.heroP}>Ontdek welk adempatroon jou belemmert en wat dat zegt over de staat van jouw zenuwstelsel en energie.</p>
        <div style={s.heroMeta}>
          <span style={s.heroMetaS}>⏱ 3–5 minuten</span>
          <span style={s.heroMetaS}>✦ 20 vragen</span>
          <span style={s.heroMetaS}>✦ Persoonlijk resultaat</span>
        </div>
      </div>

      <div style={s.progWrap}>
        <div style={s.progLabel}><span>{answered} van {questions.length} beantwoord</span><span>{pct}%</span></div>
        <div style={s.progBar}><div style={s.progFill(pct)} /></div>
      </div>

      {bySec.map((sec, si) => (
        <div key={si}>
          <div style={s.secHdr}>{sec.label}</div>
          {sec.qs.map(({ text, i }) => (
            <div key={i} style={s.qBlock(answers[i] !== undefined, errors.includes(i))}>
              <div style={s.qNum}>Vraag {i + 1}</div>
              <div style={s.qText}>{text}</div>
              <div style={s.opts}>
                {[0, 1, 2, 3].map(v => {
                  const sel = answers[i] === v;
                  return (
                    <div key={v} style={s.optBtn(sel)} onClick={() => setAnswer(i, v)}>
                      <span style={s.optVal(sel)}>{v}</span>
                      <span>{labels[v]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      <button style={s.btnMain} onClick={submit}>Bekijk mijn resultaat →</button>
      {showMissing && <div style={s.missing}>Beantwoord alle vragen om je resultaat te zien.</div>}
    </div>
  );
}
