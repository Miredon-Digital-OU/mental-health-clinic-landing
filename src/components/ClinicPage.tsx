import React from 'react';
import ClinicHeader from './ClinicHeader';
import ClinicHero from './ClinicHero';
import PainPoints from './PainPoints';
import Solution from './Solution';
import HowItWorks from './HowItWorks';
import Services from './Services';
import Benefits from './Benefits';
import Testimonials from './Testimonials';
import ClinicLeadForm from './ClinicLeadForm';
import FAQ from './FAQ';
import BottomCTA from './BottomCTA';
import Footer from './Footer';
import StickyCTA from './StickyCTA';

const ClinicPage: React.FC = () => {
  return (
    <div className="app">
      <ClinicHeader />
      <main>
        <ClinicHero />
        <PainPoints />
        <Solution />
        <HowItWorks />
        <Services />
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
