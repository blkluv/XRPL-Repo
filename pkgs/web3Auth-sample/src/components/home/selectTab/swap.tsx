import InputDropBox from "@/components/common/inputBox/InputDropBox";
import { Currency } from "@/components/faucet/content";
import { useState } from "react";
import { MdSwapVert } from "react-icons/md";
import styles from "./SelectTab.module.css";

// testData 
const testData: Currency[] = [
    {
        name: "XRP",
        currency: 0
    },
    {
        name: "FOO",
        currency: 1
    }
]


/**
 * Swap Component
 * @param param0 
 */
export default function Swap() {

    const [amountIn, setAmountIn] = useState("");
    const [amountOut, setAmountOut] = useState("");
    const [token0, setToken0] = useState<Currency>(testData[0]);
    const [token1, setToken1] = useState<Currency>(testData[1]);

    return (
        <div className={styles.tabBody}>
            <InputDropBox
                leftHeader={"From"}
                inputs={testData}
                value={amountOut}
                token={token0}
                onChange={setAmountOut}
                setToken={setToken0}
            />
            <div className={styles.swapIcon} onClick={() => {}}>
                <MdSwapVert />
            </div>
            <InputDropBox
                leftHeader={"To"}
                inputs={testData}
                value={amountIn}
                token={token1}
                onChange={setAmountIn}
                setToken={setToken1}
            />
            <div className={styles.bottomDiv}>
                <div 
                    className={styles.btn} 
                    onClick={() => {}}
                >
                    Swap
                </div>
            </div>
        </div>
    );
}