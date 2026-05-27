import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { GlowCard } from "@/components/GlowCard";
import { SITE } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
import { useScrollFrames } from "@/hooks/useScrollFrames";

import imgBedroom from "@/assets/proj-01-bedroom.png";
import imgStructure from "@/assets/proj-03-structure.png";
import imgAtrium from "@/assets/proj-04-atrium.png";
import imgReforma from "@/assets/proj-05-reforma.png";
import imgLocal from "@/assets/proj-06-local.png";
import imgMarble from "@/assets/proj-07-marble.png";
import imgShower from "@/assets/proj-08-shower.png";
import hero from "@/assets/proj-02-facade.png";

export const Route = createFileRoute("/")({ component: Home });

/* ─── Data ─── */

const projects = [
  { title: "Casa Belgrano", cat: "Vivienda", year: "2024", loc: "Buenos Aires", img: imgBedroom },
  { title: "Edificio Aurora", cat: "Arquitectura", year: "2024", loc: "Buenos Aires", img: hero },
  { title: "Baño Onix", cat: "Reforma", year: "2024", loc: "Haedo", img: imgShower },
  { title: "Cocina Mármol", cat: "Interiorismo", year: "2023", loc: "Castelar", img: imgMarble },
  { title: "Atrio Cívico", cat: "Arquitectura", year: "2023", loc: "CABA", img: imgAtrium },
  { title: "Local Botánico", cat: "Comercial", year: "2024", loc: "Buenos Aires", img: imgLocal },
];

const services = [
  {
    title: "Arquitectura",
    desc: "Diseñamos viviendas y edificios con una visión moderna, funcional y estéticamente cuidada.",
    icon: "◻",
  },
  {
    title: "Interiorismo",
    desc: "Creamos interiores que equilibran belleza, confort y personalidad en cada detalle.",
    icon: "◼",
  },
  {
    title: "Reformas integrales",
    desc: "Transformamos espacios existentes con una planificación completa y ejecución profesional.",
    icon: "◻",
  },
  {
    title: "Optimización de espacios",
    desc: "Maximizamos el potencial de cada metro cuadrado con soluciones inteligentes de diseño.",
    icon: "◼",
  },
];

const processSteps = [
  { n: "01", t: "Primer contacto", d: "Conversamos sobre el proyecto, expectativas y alcance. Entendemos tu visión y necesidades." },
  { n: "02", t: "Relevamiento", d: "Visitamos el espacio, tomamos medidas y entendemos el contexto. Cada detalle cuenta." },
  { n: "03", t: "Propuesta de diseño", d: "Presentamos una dirección creativa con planos, renders y referencias visuales." },
  { n: "04", t: "Planificación", d: "Definimos materiales, plazos, equipos y presupuesto detallado con total transparencia." },
  { n: "05", t: "Ejecución", d: "Dirigimos la obra con foco en calidad, cumplimiento y atención al detalle." },
  { n: "06", t: "Entrega final", d: "Te entregamos un espacio listo para ser habitado, exactamente como lo imaginaste." },
];

const testimonials = [
  {
    q: "Llevamos adelante una reforma integral con una claridad y organización que no habíamos visto antes. Cada detalle estaba pensado.",
    a: "Sofía M.",
    p: "Vivienda — Buenos Aires",
  },
  {
    q: "Nos acompañaron desde el primer plano hasta la última terminación. El criterio estético del estudio se nota en todo.",
    a: "Federico L.",
    p: "Local comercial — CABA",
  },
  {
    q: "Lo que más valoramos fue la tranquilidad. Siempre supimos en qué etapa estábamos y qué venía después.",
    a: "Carolina y Diego",
    p: "Departamento — Haedo",
  },
];

/* ─── Constants ─── */
const FRAME_COUNT = 40;
const getFrameSrc = (index: number) =>
  `/frames/frame_${String(index).padStart(3, "0")}.jpg`;

/* ─── Main ─── */
function Home() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <ScrollHero />
      <Philosophy />
      <FeaturedProjects />
      <ServicesSection />
      <ProcessSection />
      <SiteManagerSection />
      <TestimonialsSection />
      <PremiumCTA />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}

/* ─── SCROLL-DRIVEN HERO ─── */
function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const getFrameSrcCb = useCallback(getFrameSrc, []);

  const { canvasRef, loaded, progress } = useScrollFrames({
    frameCount: FRAME_COUNT,
    getFrameSrc: getFrameSrcCb,
    containerRef,
    lerpFactor: 0.065,
  });

  /* Cinematic stagger — slow, deliberate reveal */
  const containerAnim = {
    hidden: {},
    show: { transition: { staggerChildren: 0.28, delayChildren: 0.7 } },
  };
  const eyebrowAnim = {
    hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.12, 0.8, 0.22, 1] as const },
    },
  };
  const headingAnim = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.12, 0.8, 0.22, 1] as const },
    },
  };
  const bodyAnim = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.3, ease: [0.12, 0.8, 0.22, 1] as const },
    },
  };
  const ctaAnim = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.12, 0.8, 0.22, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="hero-scroll-container"
      style={{ height: "280vh" }}
    >
      {/* Loading overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-8">
            <span className="eyebrow tracking-[0.35em] text-foreground/60">Estudio Onix</span>
            <div className="w-52 h-px bg-border/60 overflow-hidden">
              <div
                className="h-full bg-foreground/70 transition-all duration-500 ease-[cubic-bezier(.16,.6,.24,1)]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="text-[0.65rem] text-muted-foreground/50 tracking-widest">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Sticky frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(.16,.6,.24,1)",
          }}
        />

        {/* Gradient overlays — 3-layer depth system */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(24,21,18,0.18)] via-transparent to-[rgba(24,21,18,0.50)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(24,21,18,0.30)] via-[rgba(24,21,18,0.05)] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(24,21,18,0.35),transparent_70%)] pointer-events-none" />

        {/* Hero text content */}
        <div className="absolute inset-0 flex items-end">
          <motion.div
            className="container-edit pb-16 md:pb-24 w-full"
            variants={containerAnim}
            initial="hidden"
            animate={loaded ? "show" : "hidden"}
          >
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
              {/* Main heading */}
              <div className="md:col-span-8">
                <motion.div
                  variants={eyebrowAnim}
                  className="eyebrow text-white/50 mb-5 md:mb-8"
                >
                  Estudio Onix · Buenos Aires
                </motion.div>
                <motion.h1
                  variants={headingAnim}
                  className="font-serif leading-[0.9] tracking-tight text-white"
                  style={{
                    fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
                  }}
                >
                  No diseñamos solo espacios.
                  <br />
                  <span className="italic text-white/75">
                    Diseñamos cómo se vive
                  </span>
                  <br />
                  dentro de ellos.
                </motion.h1>
              </div>

              {/* Subheading + CTAs */}
              <div className="md:col-span-4">
                <motion.p
                  variants={bodyAnim}
                  className="text-sm md:text-base text-white/55 max-w-sm leading-relaxed"
                >
                  Arquitectura, interiorismo y reformas integrales con una
                  visión moderna, funcional y cuidadosamente pensada.
                </motion.p>
                <motion.div
                  variants={ctaAnim}
                  className="mt-8 flex flex-col gap-3"
                >
                  <a
                    href={SITE.calendly}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary group inline-flex items-center justify-between gap-3 bg-white text-[#1c1916] px-6 py-4 text-sm font-medium hover:bg-white/92"
                  >
                    Agendá una asesoría
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-700 ease-[cubic-bezier(.16,.6,.24,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                  <Link
                    to="/proyectos"
                    className="btn-outline group inline-flex items-center justify-between gap-3 border border-white/30 text-white px-6 py-4 text-sm hover:border-white/70 hover:bg-white/5"
                  >
                    Ver proyectos
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-700 ease-[cubic-bezier(.16,.6,.24,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — cinematic breathing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ delay: 2.2, duration: 1.2, ease: [0.12, 0.8, 0.22, 1] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 scroll-breathe"
        >
          <span className="text-[0.55rem] tracking-[0.42em] uppercase text-white/30 font-medium">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PHILOSOPHY ─── */
function Philosophy() {
  return (
    <section className="container-edit py-32 md:py-48" id="filosofia">
      <div className="grid md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-5">
          <Reveal>
            <div className="chapter-mark"><span className="eyebrow">Filosofía</span></div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Una sola visión.{" "}
              <span className="italic text-muted-foreground">
                Diseño, planificación y obra.
              </span>
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:pt-16">
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Creemos que un gran espacio nace de una visión clara que se
              sostiene desde el primer boceto hasta la última terminación.
              Trabajamos con cada cliente en una relación personal, transparente
              y profesional.
            </p>
          </Reveal>
          <div className="mt-16 grid grid-cols-3 gap-8 md:gap-12">
            {[
              { n: "+10", l: "Años de experiencia" },
              { n: "80+", l: "Proyectos entregados" },
              { n: "100%", l: "Acompañamiento integral" },
            ].map((item, i) => (
              <Reveal key={item.l} delay={300 + i * 100}>
                <div>
                  <div className="font-serif text-3xl md:text-5xl tracking-tight">
                    {item.n}
                  </div>
                  <div className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {item.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={600}>
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                {
                  n: "01",
                  t: "Diseño minimalista, ejecución profesional.",
                  d: "Trabajamos con criterio estético y técnico para que cada espacio se vea y funcione como debe.",
                },
                {
                  n: "02",
                  t: "Transformamos con diseño y confianza.",
                  d: "Una sola visión guía la planificación, la dirección y la ejecución integral.",
                },
                {
                  n: "03",
                  t: "Espacios pensados para personas.",
                  d: "Buscamos el equilibrio entre la estética contemporánea y la vida cotidiana.",
                },
              ].map((card) => (
                <GlowCard key={card.n} className="p-7 md:p-8">
                  <div className="eyebrow mb-5">{card.n}</div>
                  <h3 className="font-serif text-xl md:text-2xl leading-tight mb-4">
                    {card.t}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.d}
                  </p>
                </GlowCard>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURED PROJECTS ─── */
function FeaturedProjects() {
  return (
    <section
      className="border-t border-border bg-secondary/40"
      id="proyectos-destacados"
    >
      <div className="container-edit py-32 md:py-48">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <Reveal>
            <div className="chapter-mark"><span className="eyebrow">Proyectos destacados</span></div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-3xl">
              Espacios diseñados{" "}
              <span className="italic">con criterio</span>.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 text-sm underline-slide"
            >
              Ver portfolio completo <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((p, i) => {
            const span =
              i % 5 === 0
                ? "md:col-span-7 aspect-[4/3]"
                : i % 5 === 1
                  ? "md:col-span-5 aspect-[3/4]"
                  : i % 5 === 2
                    ? "md:col-span-4 aspect-[3/4]"
                    : i % 5 === 3
                      ? "md:col-span-4 aspect-[3/4]"
                      : "md:col-span-4 aspect-[3/4]";
            return (
              <Reveal key={p.title} delay={i * 80} className={`${span} col-span-12`}>
                <Link to="/proyectos" className="group block h-full">
                  <div className="img-hover h-full bg-muted overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl tracking-tight">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {p.cat} · {p.loc}
                      </p>
                    </div>
                    <span className="eyebrow">{p.year}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function ServicesSection() {
  return (
    <section className="container-edit py-32 md:py-48" id="servicios">
      <div className="grid md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-5">
          <Reveal>
            <div className="chapter-mark"><span className="eyebrow">Servicios</span></div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Lo que <span className="italic">hacemos</span>.
            </h2>
            <p className="mt-8 text-muted-foreground max-w-md leading-relaxed">
              Un servicio integral que cubre cada etapa del proyecto, con el
              mismo criterio estético y profesional de principio a fin.
            </p>
            <Link
              to="/servicios"
              className="mt-10 inline-flex items-center gap-2 text-sm underline-slide"
            >
              Conocé todos los servicios <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <div className="grid gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <GlowCard className="p-8 md:p-10">
                  <div className="flex items-start gap-6 md:gap-8">
                    <span className="eyebrow text-muted-foreground mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-3">
                        {s.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS ─── */
function ProcessSection() {
  return (
    <section className="border-t border-border bg-secondary/40" id="proceso">
      <div className="container-edit py-32 md:py-48">
        <Reveal>
          <div className="chapter-mark"><span className="eyebrow">Proceso</span></div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-3xl">
            Cada etapa, <span className="italic">acompañada</span>.
          </h2>
          <p className="mt-8 text-muted-foreground max-w-2xl leading-relaxed">
            Desde la primera conversación hasta la entrega de llaves, cada paso
            está pensado para que el proceso sea claro, profesional y sin
            sorpresas.
          </p>
        </Reveal>

        <div className="mt-20 md:mt-28">
          {processSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="process-row group">
                <div className="process-row__num">{step.n}</div>
                <div>
                  <h3 className="process-row__title">{step.t}</h3>
                  <p className="process-row__desc">{step.d}</p>
                </div>
                <div className="process-row__meta">
                  Etapa {String(i + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SITE MANAGER ─── */
function SiteManagerSection() {
  return (
    <section className="container-edit py-32 md:py-48" id="equipo">
      <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-foreground/[0.04] to-transparent -z-10" />
              <div className="img-hover overflow-hidden bg-secondary aspect-[3/4]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/martin.rojas-ClrBhuJW60twVgbISruWDdbpbMGc99.png"
                  alt="Martin Rojas, Maestro Mayor de Obras de Estudio Onix"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={150}>
            <div className="chapter-mark"><span className="eyebrow">Dirección de obra</span></div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Martin Rojas.{" "}
              <span className="italic text-muted-foreground">
                Al frente de cada obra.
              </span>
            </h2>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-foreground/30" />
              <span className="eyebrow text-foreground/70">
                Maestro Mayor de Obras
              </span>
            </div>
            <p className="mt-10 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Martin lidera la ejecución técnica de cada proyecto de Estudio
              Onix, garantizando que el diseño se traduzca en una obra
              prolija, segura y fiel a la visión original. Su criterio
              constructivo y su atención al detalle son la base sobre la que
              se construye cada espacio que entregamos.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
              <div>
                <div className="font-serif text-3xl md:text-4xl tracking-tight">
                  +10
                </div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Años en obra
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl tracking-tight">
                  100%
                </div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Dirección presencial
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function TestimonialsSection() {
  return (
    <section className="container-edit py-32 md:py-48" id="testimonios">
      <Reveal>
        <div className="chapter-mark"><span className="eyebrow">Testimonios</span></div>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-3xl">
          Lo que <span className="italic">cuentan</span> quienes confiaron en
          el estudio.
        </h2>
      </Reveal>
      <div className="mt-20 md:mt-28 grid md:grid-cols-3 gap-10 md:gap-16">
        {testimonials.map((t, i) => (
          <Reveal key={t.a} delay={i * 120}>
            <figure className="flex flex-col h-full">
              <div className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.15] tracking-tight flex-1">
                <span className="text-muted-foreground">"</span>
                {t.q}
                <span className="text-muted-foreground">"</span>
              </div>
              <figcaption className="mt-10 pt-6 border-t border-border">
                <div className="text-sm font-medium">{t.a}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t.p}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── PREMIUM CTA ─── */
function PremiumCTA() {
  return (
    <section className="border-t border-border" id="cta">
      <div className="container-edit py-32 md:py-48">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={imgAtrium}
              alt=""
              className="h-full w-full object-cover opacity-25"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/60" />
          </div>
          <div className="px-8 md:px-20 py-24 md:py-36 max-w-3xl">
            <Reveal>
              <div className="chapter-mark"><span className="eyebrow">Asesoría inicial</span></div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                Descubrí el{" "}
                <span className="italic">potencial real</span> de tu
                espacio.
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-xl">
                Agendá una asesoría inicial y obtené una orientación profesional
                para transformar tu espacio de manera moderna, funcional y
                visualmente equilibrada.
              </p>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noreferrer"
                className="btn-primary group mt-10 inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 text-sm hover:bg-foreground/85"
              >
                Reservá una llamada
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-700 ease-[cubic-bezier(.16,.6,.24,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function ContactSection() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      window.open(SITE.calendly, "_blank", "noopener");
      setSubmitting(false);
    }, 500);
  };

  const field =
    "w-full bg-transparent border-b border-border py-4 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors duration-500";

  return (
    <section id="formulario" className="border-t border-border">
      <div className="container-edit py-32 md:py-48 grid md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4">
          <Reveal>
            <div className="chapter-mark"><span className="eyebrow">Contacto profesional</span></div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
              Contanos sobre tu{" "}
              <span className="italic">proyecto</span>.
            </h2>
            <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Completá el formulario y te redirigimos a Calendly para reservar
              una llamada estratégica con el estudio.
            </p>
            <div className="mt-10 space-y-3 text-sm text-muted-foreground">
              <div>{SITE.location}</div>
              <div>
                <a className="underline-slide" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>
              </div>
              <div>
                <a
                  className="underline-slide"
                  href={`mailto:${SITE.email}`}
                >
                  {SITE.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <form
          onSubmit={onSubmit}
          className="md:col-span-8 grid md:grid-cols-2 gap-x-8 gap-y-2"
        >
          <input
            required
            name="nombre"
            placeholder="Nombre y apellido"
            className={field}
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className={field}
          />
          <input
            required
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            className={field}
          />
          <input
            required
            name="ubicacion"
            placeholder="Ubicación"
            className={field}
          />
          <select required name="tipo" defaultValue="" className={field}>
            <option value="" disabled>
              Tipo de proyecto
            </option>
            <option>Vivienda</option>
            <option>Cocina o baño</option>
            <option>Oficina</option>
            <option>Local comercial</option>
            <option>Reforma integral</option>
            <option>Obra nueva</option>
          </select>
          <input
            required
            name="metros"
            placeholder="Metros aproximados"
            className={field}
          />
          <select
            required
            name="presupuesto"
            defaultValue=""
            className={field}
          >
            <option value="" disabled>
              Presupuesto estimado (USD)
            </option>
            <option>Hasta 15.000</option>
            <option>15.000 – 40.000</option>
            <option>40.000 – 100.000</option>
            <option>Más de 100.000</option>
          </select>
          <input
            required
            name="inicio"
            placeholder="Fecha aproximada de inicio"
            className={field}
          />
          <textarea
            required
            name="objetivo"
            rows={2}
            placeholder="Objetivo principal del proyecto"
            className={`${field} md:col-span-2 resize-none`}
          />
          <textarea
            name="referencias"
            rows={2}
            placeholder="Referencias o inspiración (opcional)"
            className={`${field} md:col-span-2 resize-none`}
          />
          <div className="md:col-span-2 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-xs text-muted-foreground max-w-md">
              Al enviar serás redirigido a nuestro calendario para reservar tu
              llamada estratégica.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm hover:bg-foreground/85 disabled:opacity-60"
            >
              {submitting ? "Enviando…" : "Enviar y reservar llamada"}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-700 ease-[cubic-bezier(.16,.6,.24,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
