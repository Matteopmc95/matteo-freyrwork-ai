"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  LayoutGrid,
  LineChart,
  MessageSquareMore,
  Sparkles,
} from "lucide-react";
import HeroConstellation from "@/components/HeroConstellation";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const problemCards = [
  {
    icon: Clock3,
    title: "Richieste che si accumulano",
    text: "Messaggi, telefonate, appuntamenti e conferme arrivano da più canali e rischiano di assorbire tutta l'attenzione operativa.",
  },
  {
    icon: LayoutGrid,
    title: "Informazioni sparse",
    text: "Dati presenti ma difficili da leggere, passaggi scollegati e poca visione d'insieme rendono l'ordinario più pesante del necessario.",
  },
  {
    icon: LineChart,
    title: "Decisioni con poca lucidità",
    text: "Quando tutto corre, cresce il rischio di errori, dispersione e opportunità che potevano essere gestite meglio.",
  },
];

const audience = [
  "Hotel e strutture ricettive",
  "Ristoranti e locali",
  "Parrucchieri e barber shop",
  "Centri estetici e wellness",
  "Negozi e attività retail",
  "Liberi professionisti",
  "Attività con prenotazioni",
  "Servizi delivery",
  "Pizzerie e business locali ad alta operatività",
];

const benefits = [
  "Più controllo sul lavoro quotidiano",
  "Meno dispersione tra richieste e processi",
  "Più chiarezza nel leggere dati e andamento",
  "Meno passaggi manuali e ripetitivi",
];

const caseStudies = [
  {
    sector: "Hotel / ospitalità",
    title: "Gestire richieste e prenotazioni senza rincorrere tutto",
    text: "Un collaboratore AI può supportare la continuità delle risposte, organizzare le informazioni e alleggerire una parte del flusso operativo quotidiano.",
    cta: "Scopri il caso completo",
  },
  {
    sector: "Ristorazione",
    title: "Più ordine nei momenti in cui il ritmo accelera",
    text: "Tra chiamate, messaggi e prenotazioni, l'agente AI viene inserito dove la gestione manuale genera più attrito e più dispersione.",
    cta: "Vedi un esempio concreto",
  },
  {
    sector: "Beauty / prenotazioni",
    title: "Appuntamenti e informazioni più fluidi da gestire",
    text: "Quando richieste e modifiche ricadono sempre sulle stesse persone, un supporto AI può rendere il lavoro più lineare e più sostenibile.",
    cta: "Guarda il caso studio",
  },
];

const steps = [
  "Ascoltiamo come funziona oggi la tua attività",
  "Analizziamo i flussi e i punti critici",
  "Adattiamo il collaboratore AI al tuo contesto",
  "Accompagniamo l'implementazione con un approccio concreto",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 14px",
        borderRadius: "9999px",
        background: "rgba(75,107,251,0.12)",
        border: "1px solid rgba(75,107,251,0.28)",
        color: "#8EA3FF",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <Sparkles size={12} />
      {children}
    </span>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "15px 24px",
        borderRadius: "14px",
        background: "linear-gradient(135deg, #4B6BFB 0%, #6E87FF 100%)",
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: 600,
        boxShadow: "0 18px 42px rgba(75,107,251,0.25)",
      }}
    >
      {children}
    </Link>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px 24px",
        borderRadius: "14px",
        border: "1px solid rgba(244,243,238,0.16)",
        background: "rgba(255,255,255,0.03)",
        color: "#F4F3EE",
        fontSize: "14px",
        fontWeight: 500,
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </Link>
  );
}

export default function DefinitiveHome() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top right, rgba(75,107,251,0.16), transparent 26%), radial-gradient(circle at 10% 20%, rgba(75,107,251,0.08), transparent 24%), #0D0F14",
      }}
    >
      <section
        style={{
          minHeight: "100vh",
          padding: "104px 16px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(13,15,20,0.12) 0%, rgba(13,15,20,0.76) 72%, #0D0F14 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{
              maxWidth: "620px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <motion.div variants={reveal}>
              <SectionLabel>Collaboratori AI per PMI</SectionLabel>
            </motion.div>

            <motion.h1
              variants={reveal}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(42px, 8vw, 84px)",
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
                color: "#F4F3EE",
              }}
            >
              Collaboratori AI concreti per piccole e medie imprese
            </motion.h1>

            <motion.p
              variants={reveal}
              style={{
                fontSize: "clamp(17px, 2vw, 20px)",
                lineHeight: 1.72,
                color: "rgba(244,243,238,0.78)",
                maxWidth: "600px",
              }}
            >
              Non semplici chatbot. Non strumenti generici da adattare da soli.
              FreyrtechnologyAI crea agenti AI che lavorano sui processi reali della tua
              attività e ti aiutano a risparmiare tempo, organizzare meglio il
              lavoro e capire più in fretta cosa sta succedendo.
            </motion.p>

            <motion.p
              variants={reveal}
              style={{
                fontSize: "15px",
                lineHeight: 1.85,
                color: "rgba(244,243,238,0.56)",
                maxWidth: "580px",
              }}
            >
              Ogni impresa oggi si trova a gestire molto più di quello che si
              vede. Clienti da seguire, informazioni sparse, richieste da canali
              diversi, attività ripetitive, numeri da leggere e decisioni da
              prendere in poco tempo. FreyrtechnologyAI nasce per aiutare proprio qui.
            </motion.p>

            <motion.div
              variants={reveal}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "4px",
              }}
            >
              <PrimaryButton href="/contatti">
                Scopri come può funzionare per la tua attività
                <ArrowRight size={16} />
              </PrimaryButton>
              <SecondaryButton href="/contatti">
                Prenota una consulenza
              </SecondaryButton>
            </motion.div>

            <motion.p
              variants={reveal}
              style={{
                fontSize: "12px",
                color: "rgba(244,243,238,0.42)",
                letterSpacing: "0.02em",
              }}
            >
              Nessun tecnicismo inutile. Partiamo da come lavori oggi.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            style={{
              position: "relative",
              minHeight: "620px",
              borderRadius: "30px",
              overflow: "hidden",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 80px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at center, rgba(75,107,251,0.12), transparent 58%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <HeroConstellation />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease }}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                zIndex: 2,
                width: "min(260px, calc(100% - 40px))",
                padding: "18px",
                borderRadius: "22px",
                background: "rgba(13,15,20,0.62)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#F4F3EE",
                  marginBottom: "10px",
                }}
              >
                <MessageSquareMore size={18} color="#8EA3FF" />
                <strong style={{ fontSize: "13px", letterSpacing: "0.04em" }}>
                  Supporto operativo
                </strong>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "rgba(244,243,238,0.66)",
                }}
              >
                Richieste, dati e processi diventano più leggibili, più ordinati
                e più facili da governare.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "24px 16px 72px" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            "Più chiarezza, meno dispersione",
            "Meno rincorsa, più controllo",
            "AI concreta, non teorica",
            "Supporto costruito sul tuo contesto",
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease }}
              style={{
                padding: "18px 20px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#F4F3EE",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ padding: "24px 16px 88px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            style={{ maxWidth: "760px", marginBottom: "34px" }}
          >
            <SectionLabel>Il problema</SectionLabel>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 5vw, 56px)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                marginTop: "20px",
                color: "#F4F3EE",
              }}
            >
              Il problema spesso non è quanto lavori. È quanta energia perdi nel
              farlo.
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "rgba(244,243,238,0.68)",
                marginTop: "20px",
              }}
            >
              Quando le attività si moltiplicano e le informazioni restano
              sparse, anche gestire l&apos;ordinario diventa più pesante del
              necessario. Molte imprese non hanno bisogno di lavorare di più.
              Hanno bisogno di lavorare con meno dispersione.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
            }}
          >
            {problemCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={reveal}
                  style={{
                    padding: "28px",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(180deg, rgba(19,22,28,0.96), rgba(19,22,28,0.82))",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.16)",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(75,107,251,0.12)",
                      border: "1px solid rgba(75,107,251,0.24)",
                      color: "#8EA3FF",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    style={{
                      marginTop: "18px",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "25px",
                      lineHeight: 1.05,
                      color: "#F4F3EE",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      marginTop: "14px",
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: "rgba(244,243,238,0.62)",
                    }}
                  >
                    {card.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "24px 16px 88px" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            style={{
              padding: "34px",
              borderRadius: "28px",
              background:
                "linear-gradient(135deg, rgba(19,22,28,0.95), rgba(28,34,48,0.88))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <SectionLabel>La soluzione</SectionLabel>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 5vw, 52px)",
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                marginTop: "20px",
              }}
            >
              Un collaboratore AI non ti complica il lavoro. Ti aiuta a
              governarlo meglio.
            </h2>
            <p
              style={{
                marginTop: "18px",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "rgba(244,243,238,0.68)",
              }}
            >
              FreyrtechnologyAI sviluppa agenti AI capaci di supportare richieste,
              processi, dati e flussi quotidiani in modo concreto e adattabile.
              Non sostituiscono la tua esperienza: ti aiutano a lavorare con
              meno caos, più continuità e più lucidità.
            </p>
            <div style={{ marginTop: "24px" }}>
              <PrimaryButton href="/servizi">
                Scopri il tuo collaboratore AI
              </PrimaryButton>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
            }}
          >
            {[
              {
                title: "AI generica",
                points: [
                  "Risponde quando le chiedi qualcosa",
                  "Non conosce il tuo contesto operativo",
                  "Resta uno strumento uguale per tutti",
                ],
                accent: false,
              },
              {
                title: "Agente AI FreyrtechnologyAI",
                points: [
                  "Lavora sui flussi reali della tua attività",
                  "Organizza richieste, dati e passaggi ricorrenti",
                  "Viene adattato al tuo modo di lavorare",
                ],
                accent: true,
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={reveal}
                style={{
                  padding: "26px",
                  borderRadius: "24px",
                  background: card.accent
                    ? "linear-gradient(180deg, rgba(75,107,251,0.14), rgba(19,22,28,0.96))"
                    : "rgba(19,22,28,0.9)",
                  border: card.accent
                    ? "1px solid rgba(75,107,251,0.30)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    color: card.accent ? "#8EA3FF" : "rgba(244,243,238,0.48)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    marginTop: "20px",
                  }}
                >
                  {card.points.map((point) => (
                    <div
                      key={point}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <Check
                        size={16}
                        color={card.accent ? "#8EA3FF" : "rgba(244,243,238,0.36)"}
                        style={{ marginTop: "4px", flexShrink: 0 }}
                      />
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.75,
                          color: "rgba(244,243,238,0.68)",
                        }}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "24px 16px 88px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            style={{ maxWidth: "760px" }}
          >
            <SectionLabel>A chi si rivolge</SectionLabel>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 5vw, 52px)",
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                marginTop: "20px",
              }}
            >
              Ogni attività ha flussi diversi. Ma molte difficoltà sono
              sorprendentemente simili.
            </h2>
            <p
              style={{
                marginTop: "18px",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "rgba(244,243,238,0.68)",
              }}
            >
              FreyrtechnologyAI lavora con imprese locali e PMI che ogni giorno devono
              coordinare persone, clienti, richieste e informazioni.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "34px",
            }}
          >
            {audience.map((item) => (
              <motion.span
                key={item}
                variants={reveal}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "12px 18px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(244,243,238,0.76)",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            style={{ marginTop: "28px" }}
          >
            <SecondaryButton href="/casi-studio">
              Vedi un esempio concreto
            </SecondaryButton>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "24px 16px 88px" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "34px",
            borderRadius: "30px",
            background:
              "linear-gradient(180deg, rgba(19,22,28,0.96), rgba(13,15,20,0.92))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            style={{ maxWidth: "760px" }}
          >
            <SectionLabel>Cosa cambia</SectionLabel>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 5vw, 52px)",
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                marginTop: "20px",
              }}
            >
              Cosa cambia, nella pratica
            </h2>
            <p
              style={{
                marginTop: "18px",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "rgba(244,243,238,0.68)",
              }}
            >
              Non più tecnologia da osservare. Ma un aiuto reale per lavorare
              meglio: più controllo, più tempo utile, più chiarezza. E meno
              dispersione.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
              marginTop: "30px",
            }}
          >
            {benefits.map((item) => (
              <motion.div
                key={item}
                variants={reveal}
                style={{
                  padding: "24px",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#F4F3EE",
                  fontSize: "15px",
                  lineHeight: 1.65,
                }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "24px 16px 88px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            style={{ maxWidth: "760px", marginBottom: "34px" }}
          >
            <SectionLabel>Casi studio</SectionLabel>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 5vw, 52px)",
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                marginTop: "20px",
              }}
            >
              L&apos;AI ha senso quando si vede all&apos;opera
            </h2>
            <p
              style={{
                marginTop: "18px",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "rgba(244,243,238,0.68)",
              }}
            >
              Per capire davvero il valore di un collaboratore AI bisogna
              guardare come viene applicato nei casi reali.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "18px",
            }}
          >
            {caseStudies.map((item) => (
              <motion.article
                key={item.title}
                variants={reveal}
                style={{
                  padding: "28px",
                  borderRadius: "24px",
                  background:
                    "linear-gradient(180deg, rgba(19,22,28,0.96), rgba(19,22,28,0.82))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    color: "#8EA3FF",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.sector}
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "28px",
                    lineHeight: 1.02,
                    letterSpacing: "-0.04em",
                    marginTop: "16px",
                    color: "#F4F3EE",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    marginTop: "14px",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "rgba(244,243,238,0.62)",
                  }}
                >
                  {item.text}
                </p>
                <Link
                  href="/casi-studio"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "18px",
                    color: "#8EA3FF",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {item.cta}
                  <ArrowRight size={15} />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "24px 16px 88px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            style={{ maxWidth: "760px" }}
          >
            <SectionLabel>Come lavoriamo</SectionLabel>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 5vw, 52px)",
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                marginTop: "20px",
              }}
            >
              Non ti lasciamo da solo davanti a uno strumento
            </h2>
            <p
              style={{
                marginTop: "18px",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "rgba(244,243,238,0.68)",
              }}
            >
              FreyrtechnologyAI accompagna l&apos;azienda passo dopo passo, dalla
              comprensione del problema fino all&apos;applicazione concreta.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "30px",
            }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step}
                variants={reveal}
                style={{
                  padding: "24px",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    color: "#8EA3FF",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  0{index + 1}
                </div>
                <p
                  style={{
                    marginTop: "14px",
                    color: "#F4F3EE",
                    fontSize: "16px",
                    lineHeight: 1.7,
                  }}
                >
                  {step}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "24px 16px 112px" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "40px",
            borderRadius: "32px",
            background:
              "linear-gradient(135deg, rgba(75,107,251,0.16), rgba(19,22,28,0.96))",
            border: "1px solid rgba(75,107,251,0.22)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          }}
        >
          <SectionLabel>CTA finale</SectionLabel>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(34px, 6vw, 64px)",
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
              marginTop: "20px",
              maxWidth: "760px",
            }}
          >
            Capire se può servirti è più semplice di quanto pensi
          </h2>
          <p
            style={{
              marginTop: "18px",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(244,243,238,0.78)",
              maxWidth: "760px",
            }}
          >
            Non serve partire da una soluzione. Basta partire da un problema
            reale.
          </p>
          <p
            style={{
              marginTop: "14px",
              fontSize: "15px",
              lineHeight: 1.85,
              color: "rgba(244,243,238,0.62)",
              maxWidth: "760px",
            }}
          >
            Se senti che nella tua attività ci sono troppe cose da rincorrere,
            troppi passaggi poco chiari o troppe energie spese in compiti
            ripetitivi, parliamone in modo semplice. Solo per capire se e come
            un collaboratore AI può avere un senso concreto nel tuo caso.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "26px",
            }}
          >
            <PrimaryButton href="/contatti">Prenota una consulenza</PrimaryButton>
            <SecondaryButton href="/contatti">
              Analizziamo il tuo caso
            </SecondaryButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
