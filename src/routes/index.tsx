import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { GlowCard } from "@/components/GlowCard";
import { SITE } from "@/lib/site";
import { ArrowDown, ArrowUpRight, Instagram } from "lucide-react";


import hero from "@/assets/proj-02-facade.png";
import imgBedroom from "@/assets/proj-01-bedroom.png";
import imgStructure from "@/assets/proj-03-structure.png";
import imgAtrium from "@/assets/proj-04-atrium.png";
import imgReforma from "@/assets/proj-05-reforma.png";
import imgLocal from "@/assets/proj-06-local.png";
import imgMarble from "@/assets/proj-07-marble.png";
import imgShower from "@/assets/proj-08-shower.png";

export const Route = createFileRoute("/")({ component: Home });

const projects = [
  { title: "Casa Belgrano", cat: "Vivienda", year: "2024", loc: "Ramos Mejía", img: imgBedroom },
  { title: "Edificio Aurora", cat: "Arquitectura", year: "2024", loc: "Buenos Aires", img: hero },
  { title: "Baño Onix", cat: "Reforma", year: "2024", loc: "Haedo", img: imgShower },
  { title: "Cocina Mármol", cat: "Interiorismo", year: "2023", loc: "Castelar", img: imgMarble },
  { title: "Atrio Cívico", cat: "Arquitectura", year: "2023", loc: "CABA", img: imgAtrium },
  { title: "Local Botánico", cat: "Comercial", year: "2024", loc: "Ramos Mejía", img: imgLocal },
];

const services = [
  "Arquitectura e interiorismo",
  "Reformas integrales",
  "Optimización de espacios",
  "Planificación espacial",
  "Dirección de obra",
  "Asesoramiento estético y funcional",
  "Diseño contemporáneo",
  "Planos y documentación técnica",
];

const process = [
  ["01", "Primer contacto", "Conversamos sobre el proyecto, expectativas y alcance."],
  ["02", "Relevamiento", "Visitamos el espacio, tomamos medidas y entendemos el contexto."],
  ["03", "Propuesta de diseño", "Presentamos una dirección creativa con planos y referencias."],
  ["04", "Planificación", "Definimos materiales, plazos, equipos y presupuesto detallado."],
  ["05", "Ejecución", "Dirigimos la obra con foco en calidad y atención al detalle."],
  ["06", "Entrega final", "Te entregamos un espacio listo para ser habitado."],
];

const testimonials = [
  {
    q: "Llevamos adelante una reforma integral con una claridad y organización que no habíamos visto antes. Cada detalle estaba pensado.",
    a: "Sofía M.",
    p: "Vivienda — Ramos Mejía",
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

function Home() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <Hero />
      <ValueProp />
      <Services />
      <FeaturedProjects />
      <Process />
      <About />
      <Testimonials />
      <LeadMagnet />

      <LeadForm />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const },
    },
  };

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale: 1.05 }}>
        <img
          src={hero}
          alt="Arquitectura contemporánea — Estudio Onix"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/70" />
        <div className="hero-gradient" />
      </motion.div>

      <motion.div
        className="relative h-full container-edit flex flex-col justify-end pb-20"
        style={{ opacity }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-12 gap-8 items-end"
        >
          <div className="md:col-span-9">
            <motion.div variants={item} className="eyebrow text-foreground/70 mb-6">
              Estudio Onix · Ramos Mejía
            </motion.div>
            <motion.h1
              variants={item}
              className="font-serif leading-[0.92] tracking-tight text-[clamp(2.8rem,8.5vw,8.5rem)]"
            >
              Creamos espacios<br />
              <span className="italic">funcionales</span>, modernos<br />
              y llenos de identidad.
            </motion.h1>
          </div>
          <div className="md:col-span-3">
            <motion.p variants={item} className="text-sm md:text-base text-foreground/80 max-w-sm">
              Acompañamos cada proyecto desde la planificación inicial hasta la
              ejecución final, combinando diseño, funcionalidad y atención al detalle.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-col gap-3">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-between gap-3 bg-foreground text-background px-6 py-4 text-sm hover:bg-foreground/85 transition-colors duration-500"
              >
                Agendá una asesoría inicial
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <Link
                to="/proyectos"
                className="inline-flex items-center justify-between gap-3 border border-foreground/40 px-6 py-4 text-sm hover:border-foreground transition-colors duration-500"
              >
                Ver proyectos
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/60"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}


function ValueProp() {
  const items = [
    { n: "01", t: "Diseño minimalista, ejecución profesional.", d: "Trabajamos con criterio estético y técnico para que cada espacio se vea y funcione como debe." },
    { n: "02", t: "Transformamos espacios con diseño y confianza.", d: "Una sola visión guía la planificación, la dirección y la ejecución integral." },
    { n: "03", t: "Espacios pensados para las personas.", d: "Buscamos el equilibrio entre la estética contemporánea y la vida cotidiana." },
  ];
  return (
    <section className="container-edit py-28 md:py-40">
      <Reveal>
        <div className="eyebrow mb-6">Propuesta de valor</div>
        <h2 className="font-serif text-4xl md:text-6xl leading-[1] max-w-4xl tracking-tight">
          Una sola visión. <span className="italic text-muted-foreground">Diseño, planificación y obra.</span>
        </h2>
      </Reveal>
      <div className="mt-20 grid md:grid-cols-3 gap-6 md:gap-8">
        {items.map((i, idx) => (
          <Reveal key={i.n} delay={idx * 120}>
            <GlowCard className="h-full p-8 md:p-10">
              <div className="eyebrow mb-6">{i.n}</div>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-5">{i.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i.d}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>

    </section>
  );
}

function Services() {
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="container-edit py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Servicios</div>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
                Lo que <span className="italic">hacemos</span>.
              </h2>
              <p className="mt-8 text-muted-foreground max-w-md">
                Un servicio integral que cubre cada etapa del proyecto, con el mismo
                criterio estético y profesional de principio a fin.
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
            <ul className="divide-y divide-border border-t border-b border-border">
              {services.map((s, i) => (
                <li key={s}>
                  <Reveal delay={i * 60}>
                    <Link
                      to="/servicios"
                      className="group flex items-center justify-between py-6 md:py-7"
                    >
                      <span className="flex items-baseline gap-6">
                        <span className="eyebrow text-muted-foreground w-8">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-2xl md:text-3xl tracking-tight">
                          {s}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                      />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="container-edit py-28 md:py-40">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <Reveal>
          <div className="eyebrow mb-6">Proyectos destacados</div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight max-w-3xl">
            Espacios diseñados <span className="italic">con criterio</span>.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <Link to="/proyectos" className="inline-flex items-center gap-2 text-sm underline-slide">
            Ver portfolio completo <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
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
                <div className="img-hover h-full bg-muted">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl tracking-tight">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{p.cat} · {p.loc}</p>
                  </div>
                  <span className="eyebrow">{p.year}</span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="container-edit py-28 md:py-40">
        <Reveal>
          <div className="eyebrow mb-6">Proceso</div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight max-w-3xl">
            Cada etapa, <span className="italic">acompañada</span>.
          </h2>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-2 gap-x-16">
          {process.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 80}>
              <div className="grid grid-cols-[auto_1fr] gap-8 py-8 border-t border-border">
                <div className="font-serif text-3xl md:text-4xl text-muted-foreground">{n}</div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl tracking-tight">{t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="container-edit py-28 md:py-40 grid md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-6">
        <Reveal>
          <div className="img-hover aspect-[4/5] bg-muted">
            <img src={imgStructure} alt="Estudio Onix" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </div>
      <div className="md:col-span-6 md:pl-10">
        <Reveal>
          <div className="eyebrow mb-6">Nosotros</div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
            Un estudio <span className="italic">cercano</span>, con criterio propio.
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed max-w-lg">
            Estudio Onix es un estudio especializado en arquitectura, diseño y reformas integrales
            orientado a crear espacios modernos, funcionales y visualmente equilibrados. Trabajamos
            con cada cliente en una relación personal, transparente y profesional.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["+10", "Años de experiencia"],
              ["80+", "Proyectos entregados"],
              ["100%", "Acompañamiento integral"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-3xl md:text-4xl">{n}</div>
                <div className="text-xs text-muted-foreground mt-2">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="border-t border-border">
      <div className="container-edit py-28 md:py-40">
        <Reveal>
          <div className="eyebrow mb-6">Testimonios</div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight max-w-3xl">
            Lo que <span className="italic">cuentan</span> quienes confiaron en el estudio.
          </h2>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-3 gap-10 md:gap-14">
          {testimonials.map((t, i) => (
            <Reveal key={t.a} delay={i * 120}>
              <figure>
                <div className="font-serif text-3xl md:text-4xl leading-[1.15] tracking-tight">
                  <span className="text-muted-foreground">“</span>
                  {t.q}
                  <span className="text-muted-foreground">”</span>
                </div>
                <figcaption className="mt-8">
                  <div className="text-sm">{t.a}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.p}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramFeed() {
  const grid = [imgBedroom, imgShower, imgMarble, imgLocal, imgAtrium, imgReforma];
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="container-edit py-28 md:py-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <Reveal>
            <div className="eyebrow mb-6">Instagram</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
              Detalles, materiales <span className="italic">y procesos</span>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm underline-slide"
            >
              <Instagram size={16} /> Ver más en {SITE.instagramHandle}
            </a>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {grid.map((src, i) => (
            <Reveal key={i} delay={i * 60}>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" className="img-hover block aspect-square bg-muted">
                <img src={src} alt="Instagram Estudio Onix" loading="lazy" className="h-full w-full object-cover" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadMagnet() {
  return (
    <section className="container-edit py-28 md:py-40">
      <div className="relative overflow-hidden border border-border">
        <div className="absolute inset-0 -z-10">
          <img src={imgAtrium} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="px-8 md:px-20 py-24 md:py-36 max-w-3xl">
          <Reveal>
            <div className="eyebrow mb-6">Asesoría inicial</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
              Descubrí el <span className="italic">potencial real</span> de tu espacio antes de comenzar una reforma.
            </h2>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-xl">
              Agendá una asesoría inicial y obtené una orientación profesional para transformar tu
              espacio de manera moderna, funcional y visualmente equilibrada.
            </p>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 text-sm hover:bg-foreground/85 transition-colors"
            >
              Reservá una llamada
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
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
    "w-full bg-transparent border-b border-border py-4 text-base placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors";
  return (
    <section id="formulario" className="border-t border-border">
      <div className="container-edit py-28 md:py-40 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow mb-6">Contacto profesional</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1] tracking-tight">
              Contanos sobre tu <span className="italic">proyecto</span>.
            </h2>
            <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Completá el formulario y te redirigimos a Calendly para reservar una llamada
              estratégica con el estudio.
            </p>
          </Reveal>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-8 grid md:grid-cols-2 gap-x-8 gap-y-2">
          <input required name="nombre" placeholder="Nombre y apellido" className={field} />
          <input required type="email" name="email" placeholder="Email" className={field} />
          <input required type="tel" name="telefono" placeholder="Teléfono" className={field} />
          <input required name="ubicacion" placeholder="Ubicación" className={field} />
          <select required name="tipo" defaultValue="" className={field}>
            <option value="" disabled>Tipo de proyecto</option>
            <option>Vivienda</option>
            <option>Cocina o baño</option>
            <option>Oficina</option>
            <option>Local comercial</option>
            <option>Reforma integral</option>
            <option>Obra nueva</option>
          </select>
          <input required name="metros" placeholder="Metros aproximados" className={field} />
          <select required name="presupuesto" defaultValue="" className={field}>
            <option value="" disabled>Presupuesto estimado (USD)</option>
            <option>Hasta 15.000</option>
            <option>15.000 – 40.000</option>
            <option>40.000 – 100.000</option>
            <option>Más de 100.000</option>
          </select>
          <input required name="inicio" placeholder="Fecha aproximada de inicio" className={field} />
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
              Al enviar serás redirigido a nuestro calendario para reservar tu llamada estratégica.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm hover:bg-foreground/85 transition-colors disabled:opacity-60"
            >
              {submitting ? "Enviando…" : "Enviar y reservar llamada"}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
