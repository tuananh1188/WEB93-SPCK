import React from 'react';
import styles from '../../Styles.module.scss';
import cls from 'classnames';
function Stepper({ number, content, isDisabled }) {
    const { stepper, numberStep, textStep, isDisableNumber, isDisableText } =
        styles;
    return (
        <div className={stepper}>
            <div
                className={cls(numberStep, {
                    [isDisableNumber]: isDisabled
                })}
            >
                {number}
            </div>
            <div
                className={cls(textStep, {
                    [isDisableText]: isDisabled
                })}
            >
                {content}
            </div>
        </div>
    );
}

export default Stepper;
