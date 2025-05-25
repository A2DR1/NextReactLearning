import styles from './Accordion.module.scss';
import { Children, useState } from 'react';
import { Typography } from 'antd';

import { Collapse } from 'antd';

const { Title, Paragraph } = Typography;

const itemsAntd = [
    {
        key: '1',
        label: 'Item 1',
        children: 'Content for item 1'
    },
    {
        key: '2',
        label: 'Item 2',
        children: 'Content for item 2'
    },
    {
        key: '3',
        label: 'Item 3',
        children: 'Content for item 3'
    },
]

const items = [
    {
        
        title: 'Item 1',
        content: 'Content for item 1'
    },
    {
        title: 'Item 2',
        content: 'Content for item 2'
    },
    {
        title: 'Item 3',
        content: 'Content for item 3'
    },
]

const AccordionItem = ({ title, content, AccordingItems, index, setAccordionItems }) => {

    const handleClick = () => {
        setAccordionItems((prev) => {
            const newAccordionItems = prev.map((item, i) => {
                if (index === i) {
                    return !item;
                }
                return item;
            })
            return newAccordionItems;
        });
    }
    return (
        <div onClick={handleClick} className={styles.accordionItem}>
            <Title className={styles.title}>{title}</Title>
            {
                AccordingItems[index] &&
                <Paragraph className={styles.content}>{content}</Paragraph>
            }

        </div>
    )
}


const Accordion = () => {
    const [AccordionItems, setAccordionItems] = useState(new Array(items.length).fill(false));
    return (

        
        // <div className={styles.accordion}>
        //     {items.map((item, index) => (
        //         <AccordionItem 
        //             key={index} 
        //             title={item.title} 
        //             content={item.content}
        //             AccordingItems={AccordionItems}
        //             index = {index}
        //             setAccordionItems={setAccordionItems} />
        //     ))}
        // </div>
        <div className={styles.accordion}>
        <Collapse items={itemsAntd} /> 
        </div>
    )
}

export default Accordion;