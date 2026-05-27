import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

import imgBedroom from "@/assets/proj-01-bedroom.png";
import imgFacade from "@/assets/proj-02-facade.png";
import imgStructure from "@/assets/proj-03-structure.png";
import imgAtrium from "@/assets/proj-04-atrium.png";
import imgReforma from "@/assets/proj-05-reforma.png";
import imgLocal from "@/assets/proj-06-local.png";
import imgMarble from "@/assets/proj-07-marble.png";
import imgShower from "@/assets/proj-08-shower.png";

export const Route = createFileRoute("/proyectos")({ component: Proyectos });

type Cat = "Viviendas" | "Cocinas y baños" | "Oficinas" | "Locales comerciales" | "Reformas integrales";

const projects: {
  title: string;
  cat: Cat;
  year: string;
  loc: string;
  desc: string;
  img: string;
  span: string;
}[] = [
  { title: "Casa Belgrano", cat: "Viviendas", year: "2024", loc: "Buenos Aires", desc: "Suite principal con revestimientos de madera natural e iluminación cálida indirecta.", img: imgBedroom, span: "md:col-span-7 aspect-[4/3]" },
  { title: "Edificio Aurora", cat: "Reformas integrales", year: "2024", loc: "Buenos Aires", desc: "Hall corporativo con envolvente de paneles perforados y carpinterías de bronce.", img: imgFacade, span: "md:col-span-5 aspect-[3/4]" },
  { title: "Baño Onix", cat: "Cocinas y baños", year: "2024", loc: "Haedo", desc: "Atmósfera spa con piedra clara, listones de madera y grifería negra.", img: imgShower, span: "md:col-span-4 aspect-[3/4]" },
  { title: "Cocina Mármol", cat: "Cocinas y baños", year: "2023", loc: "Castelar", desc: "Isla protagonista en mármol veteado, base de obra en proceso.", img: imgMarble, span: "md:col-span-8 aspect-[16/10]" },
  { title: "Atrio Cívico", cat: "Oficinas", year: "2023", loc: "CABA", desc: "Estructura de hormigón visto con bóvedas curvas y luz cenital.", img: imgAtrium, span: "md:col-span-6 aspect-[4/3]" },
  { title: "Local Botánico", cat: "Locales comerciales", year: "2024", loc: "Buenos Aires", desc: "Fachada vegetal con carpintería oscura y vidrio traslúcido.", img: imgLocal, span: "md:col-span-6 aspect-[4/3]" },
  { title: "Casa Histórica", cat: "Reformas integrales", year: "2023", loc: "CABA", desc: "Restauración de fachada y puesta en valor de molduras originales.", img: imgReforma, span: "md:col-span-5 aspect-[3/4]" },
  { title: "Cubierta Acero", cat: "Oficinas", year: "2022", loc: "Buenos Aires", desc: "Estructura metálica vista, juego de luz y sombra en la entrada.", img: imgStructure, span: "md:col-span-7 aspect-[4/3]" },
];

const cats: ("Todos" | Cat)[] = [
  "Todos",
  "Viviendas",
  "Cocinas y baños",
  "Oficinas",
  "Locales comerciales",
  "Reformas integrales",
];

function Proyectos() {
  const [active, setActive] = useState<(typeof cats)[number]>("Todos");
  const list = useMemo(
    () => (active === "Todos" ? projects : projects.filter((p) => p.cat === active)),
    [active],
  );
  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <header className="container-edit pt-40 md:pt-48 pb-16">
        <Reveal>
          <div className="eyebrow mb-6">Proyectos</div>
          <h1 className="font-serif text-5xl md:text-8xl leading-[0.95] tracking-tight max-w-5xl">
            Portfolio <span className="italic">cinematográfico</span>.
          </h1>
          <p className="mt-10 max-w-xl text-muted-foreground leading-relaxed">
            Una selección de proyectos donde la materialidad, la luz y la composición
            espacial trabajan en conjunto.
          </p>
        </Reveal>
      </header>

      <div className="container-edit pb-12">
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-b border-border py-5 text-sm">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`transition-colors duration-500 ease-[cubic-bezier(.16,.6,.24,1)] ${
                active === c ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
              {active === c && <span className="ml-2 inline-block w-2 h-2 bg-foreground rounded-full align-middle" />}
            </button>
          ))}
          <span className="ml-auto eyebrow self-center">{list.length} proyectos</span>
        </div>
      </div>

      <div className="container-edit grid md:grid-cols-12 gap-6 md:gap-8 pb-28">
        {list.map((p, i) => (
          <Reveal key={p.title} delay={i * 60} className={`${p.span} col-span-12`}>
            <div className="group block h-full">
              <div className="img-hover h-full bg-muted">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="mt-5 grid md:grid-cols-[1fr_auto] gap-2 md:gap-8 items-baseline">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl tracking-tight">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.cat} · {p.loc} · {p.year}</p>
                </div>
                <p className="text-sm text-muted-foreground max-w-sm">{p.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="border-t border-border">
        <div className="container-edit py-28 md:py-36 text-center">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight max-w-3xl mx-auto">
              ¿Querés que tu proyecto sea <span className="italic">el próximo</span>?
            </h2>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noreferrer"
              className="btn-primary group mt-10 inline-flex items-center gap-2 bg-foreground text-background px-7 py-4 text-sm hover:bg-foreground/85"
            >
              Agendá una asesoría inicial <ArrowUpRight size={16} className="transition-transform duration-700 ease-[cubic-bezier(.16,.6,.24,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
