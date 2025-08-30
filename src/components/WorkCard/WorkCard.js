import React from 'react';
import styles from './WorkCard.module.scss';
import { Card, Tag, Button } from 'antd';
import { GithubOutlined, ExportOutlined } from '@ant-design/icons';
import Link from 'next/link';

const WorkCard = ({ work }) => {
  const { title, description, technologies = [], image, githubUrl, liveUrl, category } = work;

  return (
    <Card className={styles.workCard}>
      <div className={styles.cardLayout}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img alt={title} src={image} className={styles.projectImage} />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayButtons}>
                {githubUrl && (
                  <Button
                    type="primary"
                    icon={<GithubOutlined />}
                    onClick={() => window.open(githubUrl, '_blank')}
                    className={styles.overlayButton}
                  >
                    Code
                  </Button>
                )}
                {liveUrl && (
                  <Button
                    type="default"
                    icon={<ExportOutlined />} 
                    onClick={() => window.open(liveUrl, '_blank')}
                    className={styles.overlayButton}
                  >
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.contentSection}>
          {category && (
            <div className={styles.category}>
              <Tag color="blue">{category}</Tag>
            </div>
          )}
          <h3 className={styles.projectTitle}>{title}</h3>
          <p className={styles.projectDescription}>{description}</p>
          <div className={styles.techStack}>
            {technologies.map((tech, i) => (
              <Tag key={i} className={styles.techTag}>
                {tech}
              </Tag>
            ))}
          </div>
          <div className={styles.actionButtons}>
            <Link href={`/project/${work.id}`}>
              <Button type="primary" className={styles.viewDetailsButton}>
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkCard;