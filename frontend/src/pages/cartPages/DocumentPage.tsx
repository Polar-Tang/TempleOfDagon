import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import { paymentDetail } from '@/types/PaymentDetail';

// Sample logo as base64 (in production, you'd use a real logo file)

// Register a custom font (optional)
// Font.register({
//   family: 'Roboto',
//   src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf'
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#000000',
    position: 'relative', // For absolute positioning of stamp
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottom: '1px solid #ffffff',
    paddingBottom: 10,
  },
  logo: {
    width: 240,
    height: 60,
  },
  headerText: {
    marginLeft: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
    borderBottom: '1px solid #eeeeee',
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 10,
    marginLeft: 10,

    flexGrow: 1,
    color: '#fff',
  },
  infoValue: {
    fontSize: 10,
    marginLeft: 10,
    flexGrow: 1,
    color: '#ffffff',
  },
  creditHighlight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginTop: 20,
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#999999',
    borderTop: '1px solid #eeeeee',
    paddingTop: 10,
  },
  stamp: {
    position: 'absolute',
    top: 100,
    right: 50,
    width: 120,
    height: 120,
    transform: 'rotate(-30deg)',
  },
  stampText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgba(255, 50, 50, 0.7)',
    padding: 10,
    border: '4px solid rgba(255, 50, 50, 0.7)',
    borderRadius: 10,
  }
});

// Format card number to show only last 4 digits
const formatCardNumber = (cardNUmberArg: string) => {
  return `**** **** **** ${cardNUmberArg.slice(-4)}`;
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

// Create Document Component
const DocumentPage = ({ data }: { data: paymentDetail }) => {
  // Convert the array entries to an object for easier access
  
  if (!data || Object.values(data).length == 0) {
    return (
      <p>Not Found</p>
    )
  }
  console.log("Card number ", data.cardNumber)
  console.log("Data  ", data)

  return (

    <PDFViewer className='w-full h-screen'>

      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image style={styles.logo} source="/logo.png" debug={false} /> 
            <View style={styles.headerText}>
              <Text style={styles.title}>Payment Receipt</Text>
              <Text style={styles.subtitle}>Transaction ID: {data._id} </Text>
            </View>
          </View>
          <View style={styles.header}>
            

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{data.cardholderName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>{data.address}</Text>
            </View>


          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Information</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Card Number:</Text>
              <Text style={styles.infoValue}>{formatCardNumber(data.cardNumber)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Expiry Date:</Text>
              <Text style={styles.infoValue}>{data.expiryMonth}/{data.expiryYear}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Transaction Date:</Text>
              <Text style={styles.infoValue}>{formatDate(data.createdAt)}</Text>
            </View>

            <Text style={styles.creditHighlight}>
              Total Credit: ${Number(data.credit).toLocaleString()}
            </Text>
          </View>

          <View style={styles.stamp}>
            <Text style={styles.stampText}>PAID</Text>
          </View>

          <Text style={styles.footer}>
            This receipt was automatically generated on {formatDate(new Date().toISOString())}
          </Text>  
        </Page>
      </Document>
    </PDFViewer>
  )
};

export default DocumentPage