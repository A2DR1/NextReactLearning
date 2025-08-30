
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import WorkCardList from "@/components/WorkCardList";
import Diagram from "@/components/Diagram";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bannerTop = {
  title: 'Austin Shen - SDE & AI/ML',
  subtitle: 'About Me',
  image: '/assets/images/AustinShenProfilePic.jpg',
  text: `Hi, I'm Austin Shen — a student at the University of Michigan double-majoring in Data Science and Mathematics, graduating in May 2027. 
  \nMy work sits at the intersection of AI/ML and SDE, where I've explored everything from quantum computing and theorem proving in Lean, to cancer diagnostics with machine learning, to building full-stack apps with React Native and Firebase.
  \nBeyond research, I enjoy designing projects that blend technology and creativity — from robotics and XR, to biotech product design, to narrative-driven games. My goal is to keep bridging science, engineering, and storytelling into impactful ideas and real-world solutions.`,
}




export default function Home() {
  const [workCards, setWorkCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchWorkCards = async () => {
          try {
              const response = await fetch('/assets/projects/projects.json');
              if (!response.ok) {
                  throw new Error('Failed to fetch projects');
              }
              const data = await response.json();
              setWorkCards(data);
          } catch (error) {
              console.error('Error fetching work cards:', error);
              // Fallback to empty array if fetch fails
              setWorkCards([]);
          } finally {
              setLoading(false);
          }
      };

      fetchWorkCards();
  }, []);

  return (
    <>
      <Layout>
        <div>
          <Banner bannerContent={bannerTop}/>
          <hr />
          <div className="work-section">
            <Typography.Title 
              level={1} 
              style={{ textAlign: 'center', marginBottom: '30px', color: '#1a1a1a' }}
            >
              Featured Projects
            </Typography.Title>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading projects...</div>
              </div>
            ) : (
              <WorkCardList workCards={workCards} />
            )}
          </div>
          {/* <hr /> */}
          {/* <Diagram /> */}
        </div>
      </Layout>
    </>
  );
}
