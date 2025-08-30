import React from 'react';
import { useRouter } from 'next/router';
import { Card, Tag, Button, Typography, Space, Divider, Row, Col } from 'antd';
import { GithubOutlined, ExportOutlined, ArrowLeftOutlined, CalendarOutlined, TrophyOutlined } from '@ant-design/icons';
import Link from 'next/link';
import projectsData from '../../../public/assets/projects/projects.json';

const { Title, Paragraph, Text } = Typography;

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the project by ID
  const project = projectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Title level={2}>Project Not Found</Title>
        <Paragraph>Sorry, the project you're looking for doesn't exist.</Paragraph>
        <Link href="/">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const { title, description, technologies, image, githubUrl, liveUrl, category, year, difficulty } = project;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Back Button */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/">
          <Button icon={<ArrowLeftOutlined />} type="text">
            ← Back to Projects
          </Button>
        </Link>
      </div>

      <Row gutter={[32, 32]}>
        {/* Project Image */}
        <Col xs={24} lg={12}>
          <Card>
            <img 
              src={image} 
              alt={title} 
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px',
                objectFit: 'cover'
              }} 
            />
          </Card>
        </Col>

        {/* Project Information */}
        <Col xs={24} lg={12}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Header */}
            <div>
              <Title level={1}>{title}</Title>
              <Space size="middle">
                {category && <Tag color="blue" size="large">{category}</Tag>}
                {year && (
                  <Space>
                    <CalendarOutlined />
                    <Text>{year}</Text>
                  </Space>
                )}
                {difficulty && (
                  <Space>
                    <TrophyOutlined />
                    <Text>{difficulty}</Text>
                  </Space>
                )}
              </Space>
            </div>

            {/* Description */}
            <div>
              <Title level={4}>Description</Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
                {description}
              </Paragraph>
            </div>

            {/* Action Buttons */}
            <div>
              <Space size="middle">
                {githubUrl && (
                  <Button
                    type="primary"
                    icon={<GithubOutlined />}
                    size="large"
                    onClick={() => window.open(githubUrl, '_blank')}
                  >
                    View Code
                  </Button>
                )}
                {liveUrl && (
                  <Button
                    type="default"
                    icon={<ExportOutlined />}
                    size="large"
                    onClick={() => window.open(liveUrl, '_blank')}
                  >
                    Live Demo
                  </Button>
                )}
              </Space>
            </div>
          </Space>
        </Col>
      </Row>

      {/* Technologies Section */}
      <Divider />
      <div style={{ marginTop: '2rem' }}>
        <Title level={3}>Technologies Used</Title>
        <div style={{ marginTop: '1rem' }}>
          {technologies.map((tech, index) => (
            <Tag key={index} size="large" style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>
              {tech}
            </Tag>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <Divider />
      <Row gutter={[32, 32]} style={{ marginTop: '2rem' }}>
        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Category</Title>
            <Text>{category}</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Year</Title>
            <Text>{year}</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Difficulty Level</Title>
            <Text>{difficulty}</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail; 