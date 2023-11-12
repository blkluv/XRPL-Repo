import { useState } from "react";
import InputNumberBox from "../../common/inputBox/InputNumberBox";
import styles from "./SelectTab.module.css";


/**
 * Withdraw Component
 * @param param0 
 */
export default function Withdraw() {

    const [amountOfToken0, setAmountOfToken0] = useState("");
    const [amountOfToken1, setAmountOfToken1] = useState("");
    const [amountOfShare, setAmountOfShare] = useState("");
    const [amountOfMaxShare, setAmountOfMaxShare] = useState<string>();

    return (
        <div className={styles.tabBody}>
            <div className={styles.bottomDiv}>
                <div className={styles.btn} onClick={() => {}}>
                    Max
                </div>
            </div>
            <InputNumberBox
                leftHeader={"Amount of share:"}
                right=""
                value={amountOfShare}
                onChange={() => {}}
            />
            <div className={styles.estimate}>
                <div>
                    <p>
                        Amount of XRP: {amountOfToken0}
                    </p>
                    <p>
                        Amount of FOO: {amountOfToken1}
                    </p>
                </div>
            </div>
            <div className={styles.bottomDiv}>
                <div className={styles.btn} onClick={() => {}}>
                    Withdraw
                </div>
            </div>
        </div>
    );
}