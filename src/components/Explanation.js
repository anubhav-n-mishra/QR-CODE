import React from 'react';
import { motion } from 'framer-motion';
import './Explanation.css';

const Explanation = ({ text }) => {
  // A simplified representation of error correction codewords.
  const errorCodewords = '11101100 00010001 11101100 00010001'; // Example fixed data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="explanation-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2>How a QR Code is Made</h2>

      {/* Step 1: Encoding */}
      <motion.div className="explanation-step" variants={itemVariants}>
        <h3>1. Encoding Data</h3>
        <p>First, your input text is converted into the most efficient format (e.g., numeric, alphanumeric, or binary). Then, it's translated into a sequence of bits (0s and 1s).</p>
        <div className="binary-representation">
          {text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')}
        </div>
      </motion.div>

      {/* Step 2: Error Correction */}
      <motion.div className="explanation-step" variants={itemVariants}>
        <h3>2. Error Correction</h3>
        <p>Next, Reed-Solomon error correction codewords are added. These are extra bits that allow the QR code to be read even if it's partially damaged or obscured.</p>
        <div className="binary-representation">
          <span className="data-bits">{text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')}</span>
          <span className="error-bits">{errorCodewords}</span>
        </div>
      </motion.div>

      {/* Step 3: Structuring */}
      <motion.div className="explanation-step" variants={itemVariants}>
        <h3>3. Building the Matrix</h3>
        <p>The bits are arranged in a square grid. Functional patterns like finder patterns (the big squares), alignment patterns, and timing patterns are added to help scanners locate and orient the code.</p>
        <div className="structure-visual">
          <div className="finder-pattern top-left"></div>
          <div className="finder-pattern top-right"></div>
          <div className="finder-pattern bottom-left"></div>
          <div className="timing-pattern-h"></div>
          <div className="timing-pattern-v"></div>
          <div className="alignment-pattern"></div>
          <span className="structure-label">Data Area</span>
        </div>
      </motion.div>

      {/* Step 4: Masking */}
      <motion.div className="explanation-step" variants={itemVariants}>
        <h3>4. Data Masking</h3>
        <p>Finally, a mask pattern is applied to the data area to balance the number of light and dark modules, making it easier for scanners to read. There are 8 possible masks, and the one that results in the most balanced pattern is chosen.</p>
      </motion.div>

    </motion.div>
  );
};

export default Explanation;
