import React, { useState } from 'react';
import { Document, Page, Text, StyleSheet, pdf } from '@react-pdf/renderer';
import { motion } from 'framer-motion';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    padding: 35,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  bodyText: {
    marginBottom: 10,
  },
  footer: {
    marginTop: 40,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

const ReceiptDocument = ({ name, mobile, amount, date }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Payment Receipt</Text>

      <Text style={styles.bodyText}>Name: {name}</Text>
      <Text style={styles.bodyText}>Mobile: {mobile}</Text>
      <Text style={styles.bodyText}>Amount Paid: ${amount}</Text>
      <Text style={styles.bodyText}>Date: {date}</Text>

      <Text style={styles.footer}>Thank you for your business!</Text>
    </Page>
  </Document>
);

function ReceiptPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    amount: '',
  });

  const [downloadMessage, setDownloadMessage] = useState('');

  const generatePDF = async () => {
    if (!formData.name || !formData.mobile || !formData.amount) {
      alert('Please fill all fields');
      return;
    }

    setDownloadMessage('Generating PDF...');

    const doc = (
      <ReceiptDocument
        name={formData.name}
        mobile={formData.mobile}
        amount={formData.amount}
        date={new Date().toLocaleDateString()}
      />
    );

    const asPdf = pdf(doc);

    try {
      const blob = await asPdf.toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt_${formData.mobile}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
      setDownloadMessage('PDF downloaded! (Simulating SMS send)');

      // Simulate sending SMS
      setTimeout(() => alert(`PDF receipt sent to number: ${formData.mobile}`), 1000);
    } catch (error) {
      alert('Failed to generate PDF receipt. Try again.');
      setDownloadMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl max-w-lg mx-auto p-8 text-gray-800"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-900">
        Download Receipt
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <input
          type="text"
          placeholder="Full Name"
          aria-label="Full name input"
          className="border border-purple-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="tel"
          maxLength={10}
          placeholder="Mobile Number (10 digits)"
          aria-label="Mobile number input"
          pattern="\d{10}"
          className="border border-purple-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          required
        />

        <input
          type="number"
          min={0}
          placeholder="Amount Paid"
          aria-label="Amount input"
          className="border border-purple-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />

        <motion.button
          type="submit"
          className="bg-purple-800 text-white font-bold rounded-lg p-4 shadow-lg hover:bg-purple-900 transition"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          Download PDF Receipt
        </motion.button>
      </form>

      {downloadMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6 text-green-700 font-semibold"
          role="alert"
        >
          {downloadMessage}
        </motion.p>
      )}
    </motion.div>
  );
}

export default ReceiptPage;