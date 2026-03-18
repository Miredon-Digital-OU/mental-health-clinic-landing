import React from 'react';
import ClinicHeader from './ClinicHeader';
import ClinicHero from './ClinicHero';
import PainPoints from './PainPoints';
import Solution from './Solution';
import HowItWorks from './HowItWorks';
import Services from './Services';
import Pricing from './Pricing';
import Benefits from './Benefits';
import Testimonials from './Testimonials';
import ClinicLeadForm from './ClinicLeadForm';
import FAQ from './FAQ';
import BottomCTA from './BottomCTA';
import Footer from './Footer';
import StickyCTA from './StickyCTA';

type ClinicPageProps = {
  onBackToStart?: () => void;
};

const ClinicPage: React.FC<ClinicPageProps> = ({ onBackToStart }) => {
  return (
    <div className="app">
      <ClinicHeader onBackToStart={onBackToStart} />
      <main id="main-content">
        <ClinicHero />
        <PainPoints />
        <Solution />
        <HowItWorks />
        <Services />
        <Pricing />
        <Benefits />
        <Testimonials />
        <ClinicLeadForm />
        <FAQ />
        <BottomCTA />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default ClinicPage;
