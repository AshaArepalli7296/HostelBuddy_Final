<template>
  <Navbar_Student/>
  <div class="fee-payment-page">
    <Navbar_student />
    <main>
      <div class="payment-container">
        <!-- Payment Header -->
        <div class="payment-header">
          <h1>Hostel Fee Payment</h1>
          <p>Secure online payment portal</p>
        </div>

        <div class="payment-content">
          <!-- Payment Summary -->
          <div class="payment-summary">
            <h2>Payment Summary</h2>
            <div class="summary-card">
              <div class="summary-row">
                <span>Student Name:</span>
                <span>{{ student.name }}</span>
              </div>
              <div class="summary-row">
                <span>Room No:</span>
                <span>{{ student.room }}</span>
              </div>
              <div class="summary-row">
                <span>Due Date:</span>
                <span>{{ payment.dueDate }}</span>
              </div>
              <div class="summary-row total">
                <span>Total Amount Due:</span>
                <span class="amount">₹{{ payment.amount }}</span>
              </div>
            </div>

            <div class="payment-history">
              <h3>Payment History</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paymentHistory" :key="index">
                    <td>{{ item.date }}</td>
                    <td>₹{{ item.amount }}</td>
                    <td>
                      <span class="status-badge" :class="item.status">
                        {{ item.status }}
                      </span>
                    </td>
                    <td>
                      <button 
                        v-if="item.status === 'success'" 
                        @click="downloadReceipt(item)"
                        class="receipt-btn"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Payment Gateway -->
          <div class="payment-gateway">
            <h2>Payment Method</h2>
            <div class="gateway-card">
              <div class="tabs">
                <button 
                  v-for="method in paymentMethods" 
                  :key="method.id"
                  @click="selectedMethod = method.id"
                  :class="{ active: selectedMethod === method.id }"
                >
                  <i :class="method.icon"></i>
                  {{ method.name }}
                </button>
              </div>

              <!-- Card Payment Form -->
              <div v-if="selectedMethod === 'card'" class="payment-form">
                <div class="form-group">
                  <label>Card Number</label>
                  <input 
                    type="text" 
                    v-model="cardDetails.number"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    @input="formatCardNumber"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>Expiry Date</label>
                    <input 
                      type="text" 
                      v-model="cardDetails.expiry"
                      placeholder="MM/YY"
                      maxlength="5"
                      @input="formatExpiry"
                    >
                  </div>
                  <div class="form-group">
                    <label>CVV</label>
                    <input 
                      type="password" 
                      v-model="cardDetails.cvv"
                      placeholder="123"
                      maxlength="3"
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label>Cardholder Name</label>
                  <input 
                    type="text" 
                    v-model="cardDetails.name"
                    placeholder="Name on card"
                  >
                </div>

                <div class="saved-cards">
                  <label>
                    <input type="checkbox" v-model="saveCard">
                    Save card for future payments
                  </label>
                </div>
              </div>

          <!-- UPI Payment Form -->
            <div v-if="selectedMethod === 'upi'" class="payment-form">
              <div class="form-group">
                <label>UPI ID</label>
                <input 
                  type="text" 
                  v-model="upiDetails.id"
                  placeholder="yourname@upi"
                >
              </div>
              <div class="upi-apps">
                <p>Pay using:</p>
                <div class="apps-grid">
                  <button 
                    v-for="app in upiApps" 
                    :key="app.id"
                    @click="selectUpiApp(app)"
                    class="upi-app-btn"
                  >
                    <img :src="app.icon" :alt="app.name" width="40" height="40">
                    <span class="app-name">{{ app.name }}</span>
                  </button>
                </div>
              </div>
            </div>

              <!-- Net Banking -->
              <div v-if="selectedMethod === 'netbanking'" class="payment-form">
                <div class="form-group">
                  <label>Select Bank</label>
                  <select v-model="selectedBank">
                    <option value="">Select your bank</option>
                    <option 
                      v-for="bank in banks" 
                      :key="bank.code"
                      :value="bank.code"
                    >
                      {{ bank.name }}
                    </option>
                  </select>
                </div>
              </div>

              <button 
                @click="processPayment"
                class="pay-now-btn"
                :disabled="processingPayment"
              >
                <span v-if="!processingPayment">Pay ₹{{ payment.amount }}</span>
                <span v-else>Processing...</span>
              </button>

              <div class="security-info">
                <i class="fas fa-lock"></i>
                <span>Secure payment encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue';
import Navbar_Student from '../../../../components/Navbar_Student.vue';

export default {
  name: 'FeePayment',
  components: {
    Navbar_Student,
    Footer
  },
  data() {
    return {
      student: {
        name: "Rahul Sharma",
        room: "B-205"
      },
      payment: {
        amount: 12500,
        dueDate: "25 Oct 2023"
      },
      paymentHistory: [
        {
          date: "15 Sep 2023",
          amount: 12500,
          status: "success",
          receipt: "receipt_0923.pdf"
        },
        {
          date: "15 Aug 2023",
          amount: 12500,
          status: "success",
          receipt: "receipt_0823.pdf"
        },
        {
          date: "15 Jul 2023",
          amount: 12500,
          status: "failed",
          receipt: null
        }
      ],
      paymentMethods: [
        { id: 'card', name: 'Credit/Debit Card', icon: 'far fa-credit-card' },
        { id: 'upi', name: 'UPI', icon: 'fas fa-mobile-alt' },
        { id: 'netbanking', name: 'Net Banking', icon: 'fas fa-university' }
      ],
      selectedMethod: 'card',
      cardDetails: {
        number: '',
        expiry: '',
        cvv: '',
        name: ''
      },
      saveCard: false,
      upiDetails: {
        id: ''
      },
      upiApps: [
        { 
          id: 'gpay', 
          name: 'Google Pay', 
          icon: 'data:image/jpeg;base64,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' 
        },
        { 
          id: 'phonepe', 
          name: 'PhonePe', 
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAACUCAMAAADF0xngAAAAeFBMVEVfJZ////9XEpv59/yUdr39/P5cHJ7f1epYFZuafcBcIJ7Kv91RAJizos5dIp6ojsnz8PiPbbpmLqPr5fPa0OiFYbTWyuWzns+BW7Kqksm3o9Lv6vV/V7F8Uq+QcLpxQ6jDtNlxPqprN6a/rtfl3e+ih8VDAJJ7TrBmGYPBAAADvUlEQVR4nO3c25KjIBAGYERFRUKM0RwdNQcn7/+Gi9nZ3WRoaypZlLaK/zqV+gq0Ay2GEBcXFxeXySI559I24odQkTdNQwSzDRmKZFSIVRut1+vickLplFScy/3G+5tNKWybvodRsrpEmfeYrKa2Wc9htzYLve9BxpT5RiPemStMTNlcQaV3pLFt22MusNK7NojudE7SAWYquW3cvzA5xGwFot8hThf6TX7PFtOlqZiwMuwwVXfJDgOjuUNVj8QSZmYlpkmXYg8zUdUjteJIMpAZMUT1iBBRwqOZElzMzgeZF0x3kGJWa5C5xVSP1JZid4SUYYJrNGkJjiauZZya9BxcyGWoqrsaTfjavOaYyiYhcVNAzOKMjHkGmSlDtIxTiU8RXI9wMZkAdxmoVpsqPIaW736Cq7qrX+4WGs0GVz1Sy/ctoDzukE26FNBoRsjKplpwQuvigmNjgruMFlsXFhzN8IDsDlKjuQLWxR0+ZqIzw4COPumcslciVvqe7Vg+fgelsXE0+2ijl1IAC7ns6QNpkpuuogJcSPxfwmhn9qcz3g10Wv4vxw+jVZSuRlF6RW7y2hxLGQYmL82xlN5lFsrU5IU5D2U80LHCpeQ53LDCpSSfI1R188qxLkyzSsIOc1BK2h3ND2cWmN5oiGZ5SX9H76+FRQpFv5qfPtjW5ndDLGa8jxT6wyg/oFwPTbThf/7gmD0kUAmNCqwcD/aeMnZKp3RKp3RKp3RKp3RKp3RKp3RKp3RKY8r9HJQ00JUdPuVKU3oHdErW6EqwEWlVKamuXBOgfWZVST6BfmsFDKZlJXCMsf3EphRAkz0EToTaVdJOV3rXRnumaFfJP6Az6lEuHs9+S8lEbVMpCfg6V9Y1lN5b5f0LiPJUbvVDzRMqCXiarZ/1RXJjQgh+q7dtBA34lEoGTnmf0M/6+EPPhqZUEjr0ntRPmVQZl3NQEgEeVcamZLv3nphPqyR86H1IXEr21oP9iZWEDlYjTEq1sXiDObmSiPp15vRKtQEC3z5CpiT09mrZtKEkjG7hd85QKdVO7WNgfXQ32VxfPoUL0W30vzgIj8WB6aeQbCn7I9WkShbp2vfDPr6fRe2iq3IhrO4odCejlJybqqrrelfdTjm/L9rt7ntgqeT9+W7KGJdfHQSESiBOaS5OaS5OaS5OaS5OaS5OaS4zUQZzUAJtToRKIrQ2J0Ylq75POUYlibfhDJRS7J/7nIZfLjQUSYOn9scSI1IlFixYfqU7I5zvr0gq/gTVHyu5uLi4uFjKL5lnQ/vfrt/xAAAAAElFTkSuQmCC' 
        },
        { 
          id: 'paytm', 
          name: 'Paytm', 
          icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paytm_logo.png/512px-Paytm_logo.png' 
        },
        { 
          id: 'whatsapp', 
          name: 'WhatsApp Pay', 
          icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png' 
        }
      ],
      banks: [
        { code: 'sbi', name: 'State Bank of India' },
        { code: 'hdfc', name: 'HDFC Bank' },
        { code: 'icici', name: 'ICICI Bank' },
        { code: 'axis', name: 'AXIS Bank' }
      ],
      selectedBank: '',
      processingPayment: false
    }
  },
  methods: {
    formatCardNumber() {
      this.cardDetails.number = this.cardDetails.number
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
    },
    formatExpiry() {
      this.cardDetails.expiry = this.cardDetails.expiry
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5)
    },
    selectUpiApp(app) {
      console.log("Selected UPI app:", app.name)
      // In a real app, this would open the UPI app
      this.upiDetails.id = `${this.student.name.toLowerCase().replace(' ', '')}@${app.id}`
    },
    downloadReceipt(receipt) {
      console.log("Downloading receipt:", receipt.receipt)
      // In a real app, this would download the PDF
      const link = document.createElement('a')
      link.href = `#${receipt.receipt}`
      link.download = receipt.receipt
      link.click()
    },
    processPayment() {
      this.processingPayment = true
      // Simulate payment processing
      setTimeout(() => {
        this.processingPayment = false
        alert("Payment successful! Receipt will be sent to your email.")
        this.paymentHistory.unshift({
          date: new Date().toLocaleDateString(),
          amount: this.payment.amount,
          status: "success",
          receipt: `receipt_${new Date().getTime()}.pdf`
        })
      }, 2000)
    }
  }
}
</script>

<style scoped>
.fee-payment-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.payment-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  flex: 1;
}

.payment-header {
  text-align: center;
  padding: 2rem 0;
}

.payment-header h1 {
  margin: 0;
  font-size: 2.2rem;
  color: #1BBC9B;
}

.payment-header p {
  margin: 0.5rem 0 0;
  color: #666;
}

.payment-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  margin-top: 1rem;
}

.payment-summary, .payment-gateway {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.payment-summary h2, .payment-gateway h2 {
  margin-top: 0;
  color: #1BBC9B;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.summary-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed #eee;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row.total {
  font-weight: bold;
  margin-top: 1rem;
}

.amount {
  color: #1BBC9B;
  font-size: 1.1rem;
}

.payment-history {
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  font-weight: 600;
  color: #555;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.failed {
  background: #ffebee;
  color: #c62828;
}

.receipt-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.receipt-btn:hover {
  background: #16a085;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tabs button {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.tabs button.active {
  border-color: #1BBC9B;
  background: #f0f9f7;
  color: #1BBC9B;
}

.tabs button i {
  font-size: 1.2rem;
}

.payment-form {
  margin: 1.5rem 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input, 
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.saved-cards {
  margin: 1rem 0;
  font-size: 0.9rem;
}

.saved-cards label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.upi-apps {
  margin-top: 1.5rem;
}

.upi-apps p {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.upi-app-btn {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.upi-app-btn:hover {
  border-color: #1BBC9B;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.upi-app-btn img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.app-name {
  font-size: 0.7rem;
  text-align: center;
  color: #555;
}

.pay-now-btn {
  width: 100%;
  padding: 1rem;
  background: #1BBC9B;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
}

.pay-now-btn:hover:not(:disabled) {
  background: #16a085;
}

.pay-now-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.security-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.security-info i {
  color: #1BBC9B;
}

@media (max-width: 768px) {
  .payment-content {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .apps-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .apps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .payment-header h1 {
    font-size: 1.8rem;
  }
  
  .tabs button {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
}
</style>