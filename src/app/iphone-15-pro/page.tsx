const metrics = [
  { label: "Lead caldi", value: "128", detail: "+14% questa settimana" },
  { label: "Task chiusi", value: "42", detail: "Operativita automatizzata" },
  { label: "Tempo risparmiato", value: "17h", detail: "Solo negli ultimi 7 giorni" },
];

const timeline = [
  {
    time: "09:30",
    title: "Nuovo brief cliente",
    text: "L'agente ha organizzato richieste, priorita e prossimi step.",
  },
  {
    time: "11:10",
    title: "Follow-up automatico",
    text: "Email inviata con proposta personalizzata e reminder al team.",
  },
  {
    time: "14:45",
    title: "Analisi performance",
    text: "Dashboard aggiornata con trend, criticita e opportunita.",
  },
];

export default function Iphone15ProMockupPage() {
  return (
    <section className="iphone-showcase">
      <div className="iphone-showcase__aurora iphone-showcase__aurora--one" />
      <div className="iphone-showcase__aurora iphone-showcase__aurora--two" />

      <div className="iphone-showcase__copy">
        <span className="eyebrow">Mockup dedicato</span>
        <h1>Iphone 15 Pro mockup su una pagina separata.</h1>
        <p>
          Una vista demo pensata per presentare un&apos;interfaccia premium dentro
          una cornice device realistica, utile per pitch, screenshot e
          prototipi veloci.
        </p>
      </div>

      <div className="iphone-device">
        <div className="iphone-device__shadow" />
        <div className="iphone-device__frame">
          <div className="iphone-device__buttons">
            <span />
            <span />
            <span />
          </div>
          <div className="iphone-device__screen">
            <div className="iphone-ui">
              <div className="iphone-ui__statusbar">
                <span>9:41</span>
                <div className="iphone-ui__status-icons">
                  <span>5G</span>
                  <span>87%</span>
                </div>
              </div>

              <div className="iphone-ui__hero">
                <div>
                  <p className="iphone-ui__eyebrow">Freyrwork AI</p>
                  <h2>Collaboratore operativo in tasca.</h2>
                </div>
                <div className="iphone-ui__badge">Live</div>
              </div>

              <div className="iphone-ui__card iphone-ui__card--gradient">
                <p className="iphone-ui__card-label">Operazioni oggi</p>
                <strong>94 workflow eseguiti senza attrito</strong>
                <span>
                  Assistente attivo su lead, supporto, analisi e follow-up.
                </span>
              </div>

              <div className="iphone-ui__metrics">
                {metrics.map((metric) => (
                  <article className="iphone-ui__metric" key={metric.label}>
                    <p>{metric.label}</p>
                    <strong>{metric.value}</strong>
                    <span>{metric.detail}</span>
                  </article>
                ))}
              </div>

              <div className="iphone-ui__panel">
                <div className="iphone-ui__panel-head">
                  <div>
                    <p className="iphone-ui__card-label">Timeline intelligente</p>
                    <strong>Attivita orchestrate</strong>
                  </div>
                  <span className="iphone-ui__pill">Auto-sync</span>
                </div>

                <div className="iphone-ui__timeline">
                  {timeline.map((item) => (
                    <div className="iphone-ui__timeline-item" key={item.time}>
                      <span>{item.time}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="iphone-ui__dock">
                <div className="iphone-ui__dock-item iphone-ui__dock-item--active" />
                <div className="iphone-ui__dock-item" />
                <div className="iphone-ui__dock-item" />
                <div className="iphone-ui__dock-item" />
              </div>
            </div>
          </div>
          <div className="iphone-device__camera">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
