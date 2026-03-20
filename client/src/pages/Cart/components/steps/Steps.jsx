import React from 'react';
import styles from '../../styles.module.scss';
import Stepper from './Stepper';

function Steps() {
    const { containerSteps, steps, line, textNoti } = styles;
    const dataSteps = [
        { number: 1, content: 'Shopping cart' },
        { number: 2, content: 'Check out' },
        { number: 3, content: 'Order status' }
    ];
    return (
        <div className={containerSteps}>
            <div className={steps}>
                {dataSteps.map((item, index) => {
                    return (
                        <>
                            <Stepper
                                number={item.number}
                                content={item.content}
                                key={index}
                                isDisabled={index !== 0}
                            />
                            {index !== dataSteps.length - 1 && (
                                <div className={line} />
                            )}
                        </>
                    );
                })}
            </div>
            <div className={textNoti}>
                🔥 Hurry up, these products are limited, checkout within{' '}
            </div>
        </div>
    );
}

export default Steps;
