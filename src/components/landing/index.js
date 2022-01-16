import './index.css';

import Navbar from './Navbar';
import Hero from './Hero';
import Step from './Step';
import BottomLead from './BottomLead';
import Footer from './Footer';

import logo from "./../../assets/logo.png";
import Rectangle_3 from './../../assets/Rectangle_3.png';
import Rectangle_4 from './../../assets/Rectangle_4.png';
import Rectangle_5 from './../../assets/Rectangle_5.png';


function Landing() {
  const data = {
    hero:{
      appType: 'N- KALARI',
      tagLine: 'Why go out when you can attend Live from home.',
      description: 'Log on to N-Kalari now',
      mainActionText: 'Login',
      extraActionText: 'App Store',
    },
    step1: {
      title: 'Create an account',
      heading: 'Login to an existing account though OTP',
      description: 'An account is created with your Phone number',
      img: Rectangle_3,
      alternate: false,
    },
    step2: {
      title: 'Create your profile',
      heading: 'Provide us with few details to show on your profile page.',
      description: '',
      img: Rectangle_4,
      alternate: true,
    },
    step3: {
      title: 'Host your gigs',
      heading: "Host your gig anytime and send notification to your followers.",
      description: "You can also join as audience in other artist gigs.",
      img: Rectangle_5,
      alternate: false,
    },
  }
  return (
   
    
    <div className="box-border bg-gradient-to-r from-red-500 to-cyan-800">
      <div className="flex flex-col">
        <Hero 
          appType={data.hero.appType}
          tagLine={data.hero.tagLine}
          description={data.hero.description}
          mainActionText={data.hero.mainActionText}
          extraActionText={data.hero.extraActionText}
        />
        
        <div id="divider" className="rounded-full  lg:w-1/2 lg:mx-auto "></div>
        
        <div id="faq" className="pt-20 mb-20  bg-gradient-to-r from-red-500 to-cyan-800 text-3xl font-semibold text-center text-white lg:font-bold">How the app works </div>
        
        <Step
          title={data.step1.title}
          heading={data.step1.heading}
          description={data.step1.description}
          img={data.step1.img}
          alternate={data.step1.alternate}
          />
          <Step
          title={data.step2.title}
          heading={data.step2.heading}
          description={data.step2.description}
          img={data.step2.img}
          alternate={data.step2.alternate}
          />
          <Step
          title={data.step3.title}
          heading={data.step3.heading}
          description={data.step3.description}
          img={data.step3.img}
          alternate={data.step3.alternate}
          />
          

          <Footer logo={logo}/>
      </div>
    </div>
  );
}

export default Landing;
