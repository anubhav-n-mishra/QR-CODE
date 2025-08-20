import React from 'react';
import { motion } from 'framer-motion';
import './LearnMore.css';

const faqs = [
  {
    question: 'What is a QR code?',
    answer: 'A QR (Quick Response) code is a type of two-dimensional barcode that can store various kinds of data, such as text, URLs, or contact information. It can be quickly read by a digital device, like a smartphone camera.',
  },
  {
    question: 'How is data stored?',
    answer: 'Data is stored as a pattern of black and white squares called “modules.” The arrangement of these modules, following a specific encoding standard, represents the binary data of the information you stored.',
  },
  {
    question: 'What are error correction levels?',
    answer: 'QR codes have built-in error correction to ensure they can be read even if they are damaged. There are four levels: L (Low, ~7% recovery), M (Medium, ~15%), Q (Quartile, ~25%), and H (High, ~30%). A higher level adds more redundant data, making the QR code more robust but also larger.',
  },
  {
    question: 'How do scanners read QR codes?',
    answer: 'Scanners locate the three large finder patterns at the corners to determine the orientation and size of the code. They then use the timing patterns (the alternating black and white lines) to establish a grid and read the data from the modules.',
  },
];

const LearnMore = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div 
      className="learn-more-container"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <h2 className="learn-more-title">Learn More About QR Codes</h2>
      <div className="faqs-grid">
        {faqs.map((faq, index) => (
          <motion.div key={index} className="faq-item" variants={itemVariants}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LearnMore;
