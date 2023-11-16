import { Currency } from "@/components/faucet/content";
import { useState } from "react";
import InputDropBox from "../../common/inputBox/InputDropBox";
import styles from "./SelectTab.module.css";

// testData 
const testData: Currency[] = [
    {
        name: "39i...9s",
        currency: 0
    },
    {
        name: "w9i..665",
        currency: 1
    }
]

/**
 * Withdraw Component
 * @param param0 
 */
export default function Withdraw() {

    const [amountOfToken0, setAmountOfToken0] = useState("");
    const [amountOfToken1, setAmountOfToken1] = useState("");
    const [amountOfShare, setAmountOfShare] = useState("");
    const [lpToken, setLpToken] = useState<Currency>(testData[0]);
    const [amountOfMaxShare, setAmountOfMaxShare] = useState<string>();

    return (
        <div className={styles.tabBody}>
            <InputDropBox
                leftHeader={"token of share:"}
                inputs={testData}
                value={amountOfShare}
                token={lpToken}
                onChange={setAmountOfShare}
                setToken={setLpToken}
            />
            <div className={styles.bottomDiv}>
                <div className={styles.btn} onClick={() => {}}>
                    Max
                </div>
            </div>
            <div className={styles.estimate}>
                <div>
                    <h3>
                        Amount of XRP: {amountOfToken0}
                    </h3>
                    <h3>
                        Amount of FOO: {amountOfToken1}
                    </h3>
                </div>
            </div>
            <div className={styles.bottomDiv}>
                <div 
                    className={styles.btn} 
                    onClick={() => {}}
                >
                    Withdraw
                </div>
            </div>
        </div>
    );
}