// components/landingPage/About.jsx
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import PortalAnimation from '../widgets/PortalAnimation';

const About = () => {
  const headerVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.05, color: '#f472b6' },
  };

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { y: -5, transition: { duration: 0.3 }, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)' },
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <PortalAnimation />
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-white mb-8 relative inline-block cursor-pointer"
              variants={headerVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              Your Party's New HQ
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-cyan-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </motion.h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              D&D Connect is your all-in-one toolkit to manage campaigns, track quests, and stay in
              sync with your party. Whether you're a Dungeon Master or an adventurer, we've got the
              tools you need to make every session legendary.
            </p>
          </Col>
        </Row>

        <Row className="mt-12 flex flex-wrap justify-center">
          {[
            {
              icon: '🎲',
              title: 'Campaign Tracking',
              text: 'Keep your adventures accessible all times.',
            },
            {
              icon: '🗺️',
              title: 'Quest & NPC Management',
              text: 'Never lose track of vital storylines or characters again.',
            },
            {
              icon: '🧙',
              title: 'Character Sheets & Tools',
              text: 'Access your stats, inventory, and spells in a click.',
            },
            {
              icon: '🔔',
              title: 'Session Reminders',
              text: 'Stay synced with your party with timely notifications.',
            },
          ].map((item, index) => (
            <Col md={3} className="mb-8 flex" key={index}>
              <motion.div
                className={`cursor-pointer group flex flex-col p-6 w-full rounded-lg shadow-md transition-all duration-300 ${
                  index % 2 === 0
                    ? 'bg-transparent border border-white/20'
                    : 'bg-gray-800/50 backdrop-blur-md'
                }`}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 mt-auto">{item.text}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default About;
