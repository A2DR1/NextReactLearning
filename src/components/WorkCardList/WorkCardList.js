import React, { useState } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import WorkCard from '../WorkCard';
import styles from './WorkCardList.module.scss';

const WorkCardList = ({ workCards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === workCards.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? workCards.length - 1 : prevIndex - 1
        );
    };

    const goToCard = (index) => {
        setCurrentIndex(index);
    };

    if (!workCards || workCards.length === 0) {
        return <div>No work cards available</div>;
    }

    return (
        <div className={styles.workCardList}>
            <div className={styles.navigationContainer}>
                <Button
                    type="text"
                    icon={<LeftOutlined />}
                    onClick={prevCard}
                    className={styles.navButton}
                    disabled={workCards.length <= 1}
                />
                
                <div className={styles.cardContainer}>
                    <WorkCard work={workCards[currentIndex]} />
                </div>
                
                <Button
                    type="text"
                    icon={<RightOutlined />}
                    onClick={nextCard}
                    className={styles.navButton}
                    disabled={workCards.length <= 1}
                />
            </div>
            
            {workCards.length > 1 && (
                <div className={styles.indicatorContainer}>
                    {workCards.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => goToCard(index)}
                            aria-label={`Go to card ${index + 1}`}
                        />
                    ))}
                </div>
            )}
            
            <div className={styles.cardInfo}>
                <span className={styles.cardCounter}>
                    {currentIndex + 1} of {workCards.length}
                </span>
            </div>
        </div>
    );
};

export default WorkCardList; 