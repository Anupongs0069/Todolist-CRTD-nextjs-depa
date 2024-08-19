import '../styles/globals.css'; // คุณสามารถเพิ่ม CSS แบบ global ที่นี่

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;