import { useCallback, useState } from "react";
import { MapPin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import NeonPage from "@/components/theme/NeonPage";
import PixelIcon from "@/components/theme/PixelIcon";
import CoffeeDoodleSides from "@/components/about/CoffeeDoodleSides";
import AboutHero from "@/components/about/AboutHero";
import ChatStory from "@/components/about/ChatStory";
import QuoteReveal from "@/components/about/QuoteReveal";
import WritingCorner from "@/components/about/WritingCorner";
import PolaroidGallery from "@/components/about/PolaroidGallery";
import PhotoLightbox from "@/components/about/PhotoLightbox";
import { MenuItem, MenuSection, MenuSheet } from "@/components/about/Menu";
import { photos } from "@/components/about/photos";
import {
  coffeeMenu,
  contactDetails,
  interests,
  socialLinks,
} from "@/data/about";

const CHAT_MAIL =
  "mailto:airiweng@gmail.com?subject=" +
  encodeURIComponent("Coffee chat ☕") +
  "&body=" +
  encodeURIComponent("Hi Airi! I'd love to grab a (virtual) coffee. I'm …");

/** The About page, printed as a café menu. */
const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [],
  );
  const showPrev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length,
      ),
    [],
  );

  return (
    <NeonPage>
      <CoffeeDoodleSides isDark={isDark} />

      <div className="mx-auto max-w-5xl px-3 py-12 sm:px-6 md:py-16">
        <MenuSheet isDark={isDark}>
          <MenuSection
            isDark={isDark}
            icon="sparkle"
            title="House special"
            note="freshly brewed in NYC"
          >
            <AboutHero isDark={isDark} />
          </MenuSection>

          <MenuSection
            isDark={isDark}
            icon="coffee"
            title="Coffee chats"
            note="pick one, it's on me"
          >
            <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
              {coffeeMenu.map((m) => (
                <MenuItem
                  key={m.drink}
                  isDark={isDark}
                  name={m.drink}
                  price={m.note}
                  desc={m.desc}
                />
              ))}
            </ul>
            <div
              className={`mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-dashed p-5 text-center ${
                isDark ? "border-pink-400/30" : "border-pink-900/20"
              }`}
            >
              <p
                className={`text-xs leading-5 ${
                  isDark ? "text-neutral-300" : "text-slate-600"
                }`}
              >
                {contactDetails.opportunities}
              </p>
              <p
                className={`inline-flex items-center gap-1.5 text-[11px] ${
                  isDark ? "text-neutral-500" : "text-slate-500"
                }`}
              >
                <MapPin size={12} /> {contactDetails.location} ·{" "}
                {contactDetails.locationNote}
              </p>
              <a
                href={CHAT_MAIL}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_30px_-6px_rgba(236,72,153,0.8)] transition-transform duration-300 hover:scale-[1.03]"
              >
                <PixelIcon name="coffee" size={22} className="-my-1" />
                place your order
              </a>
              <div className="flex gap-2">
                {socialLinks.map(({ name, icon: Icon, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
                      isDark
                        ? "border-white/10 text-neutral-300 hover:border-pink-400/60 hover:text-pink-300"
                        : "border-pink-200 bg-white/70 text-slate-600 hover:border-pink-400 hover:text-pink-600"
                    }`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </MenuSection>

          <MenuSection
            isDark={isDark}
            icon="book"
            title="House blend"
            note="the story so far"
          >
            <div className="mx-auto max-w-2xl">
              <ChatStory isDark={isDark} />
            </div>
          </MenuSection>

          <MenuSection
            isDark={isDark}
            icon="heart"
            title="Sides"
            note="when I'm not coding"
          >
            <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
              {interests.map((it) => (
                <MenuItem
                  key={it.text}
                  isDark={isDark}
                  icon={it.px}
                  name={it.text}
                  price="on the house"
                  desc={it.sub}
                />
              ))}
            </ul>
          </MenuSection>

          <MenuSection
            isDark={isDark}
            icon="pen"
            title="After hours"
            note="essays & poems, off the clock"
          >
            <WritingCorner isDark={isDark} />
          </MenuSection>

          <MenuSection isDark={isDark} icon="sparkle" title="Quote of the day">
            <QuoteReveal />
          </MenuSection>

          <MenuSection
            isDark={isDark}
            icon="heart"
            title="From the gallery"
            note="a few favorite shots"
          >
            <PolaroidGallery
              isDark={isDark}
              photos={photos}
              onOpen={setLightboxIndex}
            />
          </MenuSection>
        </MenuSheet>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
    </NeonPage>
  );
};

export default About;
