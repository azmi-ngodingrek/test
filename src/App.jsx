import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BadgeCheck, Camera, Compass, Film, Mail, MapPinned, Sparkles, TimerReset } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

const journeyCards = [
  {
    step: '01',
    title: 'Pembuka cerita',
    copy: 'Pembuka singkat yang menegaskan gaya fotografi: hangat, peka, dan berfokus pada momen.',
    label: 'Identitas',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Rangkaian karya',
    copy: 'Kartu horizontal menampilkan potongan foto, jenis pemotretan, dan suasana visual secara cepat.',
    label: 'Galeri',
    icon: Camera,
  },
  {
    step: '03',
    title: 'Detail sesi',
    copy: 'Setiap pilihan karya membuka cerita singkat tentang pendekatan, hasil, dan gaya editing.',
    label: 'Pendalaman',
    icon: Film,
  },
  {
    step: '04',
    title: 'Akhir yang jelas',
    copy: 'Panel kontak ditata untuk memudahkan klien menghubungi dan memulai sesi pemotretan.',
    label: 'Kontak',
    icon: Sparkles,
  },
];

const projectDetails = [
  {
    name: 'Pernikahan Intimate',
    category: 'Fotografi Pernikahan',
    summary: 'Pendekatan dokumenter untuk momen pernikahan kecil yang terasa dekat, elegan, dan jujur.',
    result: 'Mengutamakan ekspresi alami, detail kecil, dan suasana yang hangat.',
    tags: ['Dokumenter', 'Cahaya Alami', 'Storytelling'],
    metric: 'Fokus pada emosi dan detail',
  },
  {
    name: 'Potret Personal',
    category: 'Sesi Potret',
    summary: 'Sesi potret yang menonjolkan karakter subjek dengan pencahayaan lembut dan framing bersih.',
    result: 'Cocok untuk personal branding, editorial ringan, dan kebutuhan media sosial profesional.',
    tags: ['Potret', 'Studio', 'Editorial'],
    metric: 'Visual yang tenang dan percaya diri',
  },
  {
    name: 'Brand Campaign',
    category: 'Fotografi Komersial',
    summary: 'Rangkaian foto untuk brand lokal, dengan tone modern, rapi, dan siap dipakai di website atau katalog.',
    result: 'Membantu brand tampil konsisten di berbagai kanal pemasaran.',
    tags: ['Komersial', 'Lifestyle', 'Produk'],
    metric: 'Tampilan brand lebih kuat',
  },
];

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-cta" />
      {children}
    </div>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const showcaseRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(projectDetails[0]);
  const [journeyProgress, setJourneyProgress] = useState(0);

  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollXProgress } = useScroll({ container: showcaseRef });

  useMotionValueEvent(scrollXProgress, 'change', (latest) => {
    setJourneyProgress(latest);
  });

  const heroFloat = useTransform(pageProgress, [0, 0.28], [0, -36]);
  const heroGlow = useTransform(pageProgress, [0, 0.28], [0, -90]);
  const progressWidth = useTransform(scrollXProgress, [0, 1], ['8%', '100%']);

  const heroMotionProps = useMemo(
    () =>
      reduceMotion
        ? {}
        : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: 'easeOut' } },
    [reduceMotion],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-hidden bg-canvas text-white antialiased">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_22%)]" />
        <div className="pointer-events-none absolute inset-0 bg-grid-dark bg-[size:40px_40px] opacity-[0.08]" />

        <header className="fixed left-4 right-4 top-4 z-30 rounded-3xl border border-white/10 bg-canvas/75 px-4 py-3 backdrop-blur-xl lg:left-6 lg:right-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <a href="#top" className="font-display text-sm font-semibold tracking-[0.32em] text-white/90">
              ARKA PHOTOGRAPHY
              </a>
            <nav className="hidden items-center gap-2 md:flex">
              {[
                ['Jelajah', '#journey'],
                ['Karya', '#projects'],
                ['Kontak', '#contact'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-cta px-4 py-2 text-sm font-medium text-white transition duration-300 hover:translate-y-[-1px] hover:bg-blue-500"
            >
              Mulai brief
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </header>

        <main id="top" className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-6 lg:pt-32">
          <motion.section
            className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
            {...heroMotionProps}
          >
            <div className="max-w-3xl space-y-8">
              <SectionLabel>Portofolio fotografi</SectionLabel>
              <div className="space-y-5">
                <h1 className="font-display text-5xl font-bold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                  Arka menangkap cerita lewat cahaya, komposisi, dan momen yang jujur.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                  Portofolio fotografi dengan nuansa editorial, alur horizontal, dan transisi yang halus untuk menampilkan
                  karya secara profesional.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#journey"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-paper"
                >
                  Lihat perjalanan
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  Hubungi saya
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['02d', 'Ritme visual'],
                  ['01', 'Cerita jelas'],
                  ['100%', 'Aman untuk motion'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="font-display text-2xl font-semibold text-white">{value}</div>
                    <div className="mt-1 text-sm text-white/60">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <motion.div
                style={reduceMotion ? undefined : { y: heroFloat, x: heroGlow }}
                className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-cta/20 blur-3xl"
              />
              <motion.div
                style={reduceMotion ? undefined : { y: heroFloat }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/50">Fokus saat ini</div>
                    <div className="mt-1 font-display text-xl font-semibold">Fotografi yang bercerita</div>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    Tersedia
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.5rem] bg-paper p-5 text-ink">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.24em] text-ink/50">Pratinjau</span>
                      <TimerReset className="h-4 w-4 text-cta" />
                    </div>
                    <div className="mt-5 space-y-3">
                      <div className="h-2 w-5/6 rounded-full bg-ink/10" />
                      <div className="h-2 w-2/3 rounded-full bg-ink/10" />
                      <div className="h-2 w-4/6 rounded-full bg-ink/10" />
                    </div>
                    <div className="mt-6 rounded-2xl bg-ink p-4 text-white">
                      <div className="text-xs uppercase tracking-[0.24em] text-white/50">Gaya visual</div>
                      <div className="mt-2 font-display text-2xl font-semibold">Hangat, cinematic, responsif</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      ['Framer Motion', 'Gerakan halus dan terukur'],
                      ['Tailwind CSS', 'Komposisi cepat dan rapi'],
                      ['Lucide React', 'Ikon konsisten'],
                    ].map(([title, detail]) => (
                      <div key={title} className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-medium text-white">{title}</div>
                        <div className="mt-1 text-sm text-white/60">{detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <section id="journey" className="mt-24 space-y-6 lg:mt-28">
            <div className="flex items-end justify-between gap-6">
              <div>
                <SectionLabel>Jelajah horizontal</SectionLabel>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Susunan karya yang mudah dipindai dan tetap terasa hidup.
                </h2>
              </div>
              <div className="hidden max-w-xs text-sm leading-6 text-white/60 lg:block">
                Geser kartu untuk menjelajah portofolio seperti bab cerita, dengan progres dan gerak yang lembut.
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur-xl lg:p-6">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/48">
                <span>Progres jelajah</span>
                <span>{Math.round(journeyProgress * 100)}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-cta" style={{ width: progressWidth }} />
              </div>

              <div
                ref={showcaseRef}
                className="scrollbar-none mt-6 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
              >
                {journeyCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.article
                      key={card.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ amount: 0.55, once: true }}
                      transition={{ duration: 0.55, delay: index * 0.06 }}
                      className="min-w-[82%] snap-center rounded-[1.75rem] border border-white/10 bg-paper p-6 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:min-w-[58%] lg:min-w-[38%]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="rounded-full bg-ink px-3 py-1 text-xs font-semibold tracking-[0.22em] text-white">
                          {card.step}
                        </div>
                        <Icon className="h-5 w-5 text-cta" />
                      </div>
                      <div className="mt-8 space-y-3">
                        <div className="text-xs uppercase tracking-[0.26em] text-ink/45">{card.label}</div>
                        <h3 className="font-display text-3xl font-semibold tracking-[-0.04em]">{card.title}</h3>
                        <p className="max-w-md text-sm leading-7 text-ink/70">{card.copy}</p>
                      </div>
                      <div className="mt-8 h-36 rounded-[1.35rem] border border-ink/10 bg-[linear-gradient(135deg,rgba(24,24,27,0.96),rgba(63,63,70,0.82))] p-4 text-white">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/48">
                          <span>Bab cerita</span>
                          <span>0{index + 1}</span>
                        </div>
                        <div className="mt-8 grid gap-2">
                          <div className="h-2 w-5/6 rounded-full bg-white/16" />
                          <div className="h-2 w-2/3 rounded-full bg-white/16" />
                          <div className="h-2 w-1/2 rounded-full bg-white/16" />
                        </div>
                        <div className="mt-8 flex items-end justify-between">
                          <div>
                            <div className="text-xs text-white/50">Nuansa</div>
                            <div className="text-lg font-medium">Fotografi editorial</div>
                          </div>
                          <BadgeCheck className="h-5 w-5 text-emerald-300" />
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="projects" className="mt-24 grid gap-6 lg:mt-28 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl lg:sticky lg:top-28 lg:self-start">
              <SectionLabel>Detail karya</SectionLabel>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Satu karya ditampilkan dengan konteks yang jelas.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Karya yang dipilih membuka konteks sesi, hasil visual, dan jenis pemotretan tanpa membuat halaman terasa padat.
              </p>

              <div className="mt-6 space-y-3">
                {projectDetails.map((project) => {
                  const active = selectedProject.name === project.name;
                  return (
                    <button
                      key={project.name}
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className={`w-full rounded-[1.35rem] border p-4 text-left transition duration-300 ${
                        active
                          ? 'border-white/20 bg-white/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                      aria-pressed={active}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-display text-lg font-semibold text-white">{project.name}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.24em] text-white/48">{project.category}</div>
                        </div>
                        <ArrowRight className={`h-4 w-4 transition duration-300 ${active ? 'translate-x-1 text-white' : 'text-white/35'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-paper p-6 text-ink shadow-soft lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="flex flex-wrap items-center gap-3">
                      <div className="rounded-full bg-ink px-3 py-1 text-xs font-semibold tracking-[0.24em] text-white">
                        PILIHAN
                      </div>
                      <div className="rounded-full border border-ink/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-ink/60">
                      {selectedProject.category}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                      {selectedProject.name}
                    </h3>
                    <p className="max-w-2xl text-base leading-7 text-ink/70">{selectedProject.summary}</p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] bg-ink p-5 text-white">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/52">Pendekatan</div>
                      <p className="mt-3 text-lg leading-7">{selectedProject.result}</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-ink/10 bg-white p-5">
                      <div className="text-xs uppercase tracking-[0.24em] text-ink/50">Dampak</div>
                      <p className="mt-3 text-lg font-medium leading-7 text-ink">{selectedProject.metric}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-2 text-sm text-ink/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-ink/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(24,24,27,0.05))] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-ink/50">Catatan detail</div>
                        <p className="mt-2 max-w-xl text-sm leading-7 text-ink/60">
                          Dibuat agar halaman tetap tenang namun hidup, dengan motion yang dipakai untuk memperjelas karya.
                        </p>
                      </div>
                      <MapPinned className="h-5 w-5 text-cta" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <section id="contact" className="mt-24 lg:mt-28">
            <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
              <div>
                <SectionLabel>Kontak</SectionLabel>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Mari buat portofolio fotografi yang terasa profesional.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">
                  Jika ingin saya sesuaikan dengan identitas personal atau brand fotografi kamu, struktur ini sudah siap.
                </p>

                <div className="mt-6 space-y-3 text-sm text-white/64">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-cta" />
                    hello@arkaphoto.id
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-cta" />
                    Responsif, rapi, dan mudah dihubungi
                  </div>
                </div>
              </div>

              <form
                className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-canvas/80 p-5"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-white/65">
                    Nama
                    <input
                      type="text"
                      placeholder="Nama kamu"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-white/20"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-white/65">
                    Email
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-white/20"
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm text-white/65">
                  Kebutuhan
                  <textarea
                    rows="5"
                    placeholder="Jelaskan jenis fotografi yang ingin ditampilkan"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-white/20"
                  />
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">
                    Balasan paling cepat melalui email.
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-blue-500"
                  >
                    Kirim brief
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-6">
            <div>Arka Photography Portfolio</div>
            <div className="flex flex-wrap gap-4">
              <a className="transition duration-300 hover:text-white" href="#top">
                Atas
              </a>
              <a className="transition duration-300 hover:text-white" href="#journey">
                Jelajah
              </a>
              <a className="transition duration-300 hover:text-white" href="#contact">
                Kontak
              </a>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default App;
