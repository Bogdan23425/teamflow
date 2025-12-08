import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

interface SlideProps {
  image: string;
  title: string;
  description: string;
  badge: string;
  index: number;
  total: number;
}

const SlideWrapper: React.FC<SlideProps> = ({
  image,
  title,
  description,
  badge,
  index,
  total,
}) => {
  return (
    <div className="relative h-screen w-full">
      <div className="tf-container h-full flex items-center py-10 md:py-16">
        <div className="grid w-full gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-center">
          {/* ЛЕВАЯ ЧАСТЬ — ТЕКСТ */}
          <motion.div
            key={title + index}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 18,
              delay: 0.05,
            }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/80 px-4 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-muted backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{badge}</span>
              <span className="text-muted/80">
                {index + 1}/{total}
              </span>
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl lg:text-[2.6rem]">
              {title}
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-muted md:text-[0.95rem]">
              {description}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-muted">
              <span className="rounded-full border border-border/70 bg-surface/80 px-3 py-1 backdrop-blur">
                Автолистание каждые пару секунд
              </span>
              <span className="rounded-full border border-border/70 bg-surface/80 px-3 py-1 backdrop-blur">
                Можно листать свайпом или стрелками
              </span>
            </div>
          </motion.div>

          {/* ПРАВАЯ ЧАСТЬ — 3D-КАРТИНКА */}
          <motion.div
            key={image + index}
            initial={{ opacity: 0, x: 40, scale: 0.9, rotate: -6 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 16,
              delay: 0.08,
            }}
            className="relative flex justify-center"
          >
            <motion.div
              className="pointer-events-none absolute -inset-10 rounded-[32px] bg-gradient-to-br from-primary/22 via-primary/10 to-transparent blur-3xl"
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.07, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />

            <motion.img
              src={image}
              alt={title}
              className="relative z-10 w-[260px] md:w-[340px] lg:w-[380px] drop-shadow-[0_22px_70px_rgba(0,0,0,0.45)]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.12,
              }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3 text-[0.7rem] text-muted"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <span className="rounded-full border border-border/60 bg-surface/85 px-3 py-1 backdrop-blur">
          Сцены переключаются сами — но ты всегда можешь свайпнуть
        </span>
      </motion.div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const slides = [
    {
      id: "write",
      badge: "Шаг 1",
      title: "Записывай задачи так же естественно, как мысли",
      description:
        "Набросок, идея или список шагов — всё превращается в аккуратную задачу, которая не теряется в чате.",
      image: "/3d/write.png",
    },
    {
      id: "board",
      badge: "Шаг 2",
      title: "Собирай поток задач в доски и сценарии",
      description:
        "Одна доска для команды, другая — для личного фокуса. Статусы, спринты и этапы подстраиваются под твой стиль работы.",
      image: "/3d/board.png",
    },
    {
      id: "team",
      badge: "Шаг 3",
      title: "Подключай людей к одному рабочему пространству",
      description:
        "Приглашения по почте, роли внутри команды и общий контекст. Каждый видит, что происходит прямо сейчас.",
      image: "/3d/team.png",
    },
    {
      id: "stats",
      badge: "Шаг 4",
      title: "Чувствуй прогресс, а не только дедлайны",
      description:
        "Движение задач по доске автоматически превращается в понятные графики и цифры. Без ручных отчётов.",
      image: "/3d/stats.png",
    },
  ];

  return (
    <section className="relative h-screen w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3200, disableOnInteraction: false }} // быстрее
        slidesPerView={1}
        speed={900} // более сочный переход
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <SlideWrapper
              image={slide.image}
              title={slide.title}
              description={slide.description}
              badge={slide.badge}
              index={index}
              total={slides.length}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
