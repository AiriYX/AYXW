import NeonPage from "@/components/theme/NeonPage";
import HeroSection from "@/components/home/HeroSection";
import StackedProjects from "@/components/home/StackedProjects";
import SkillMarquee from "@/components/home/SkillMarquee";
import ExperienceLog from "@/components/home/ExperienceLog";
import SignOff from "@/components/home/SignOff";

const Home = () => (
  <NeonPage>
    <HeroSection />
    <StackedProjects />
    <SkillMarquee />
    <ExperienceLog />
    <SignOff />
  </NeonPage>
);

export default Home;
