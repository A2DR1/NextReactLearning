
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ImageText from "@/components/ImageText";
import Diagram from "@/components/Diagram";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bannerTop = {
  title: 'my banner',
  text: 'my text',
}

const imageTextContent = {
  image: '/assets/images/cat2.jpg',

  content: {
    title: 'my title right',
    text: 'my text right',
  }
}


export default function Home() {
  return (
    <>
      <Header />
        <div>
          <Banner bannerContent={bannerTop}/>
          <hr />
          <ImageText imageText={imageTextContent}/>
          <hr />
          <Diagram />
        </div>
      <Footer />
    </>
  );
}
