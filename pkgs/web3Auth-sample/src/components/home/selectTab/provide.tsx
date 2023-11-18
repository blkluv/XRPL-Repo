import InputDropBox from "@/components/common/inputBox/InputDropBox";
import { TokenInfo } from "@/context/XummProvider";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import styles from "./SelectTab.module.css";

// testData 
const testData: TokenInfo[] = [
    {
        id: 0,
        currency: "XRP",
        value: "1000",
        issuer: ""
    },
    {
        id: 1,
        currency: "WWW",
        value: "1000",
        issuer: ""
    }
]

/**
 * Provide component
 * @param param0 
 */
export default function Provide() {

    const [amountOfToken0, setAmountOfToken0] = useState<string>("");
    const [amountOfToken1, setAmountOfToken1] = useState<string>("");
    const [token0, setToken0] = useState<TokenInfo>(testData[0]);
    const [token1, setToken1] = useState<TokenInfo>(testData[1]);
    const [activePool, setActivePool] = useState(true);

    return (
        <div className={styles.tabBody}>
            <InputDropBox
                leftHeader={"Amount of token1"}
                inputs={testData}
                value={amountOfToken0}
                token={token0}
                onChange={setAmountOfToken0}
                setToken={setToken0}
            />
            <div className={styles.swapIcon}>
                <MdAdd />
            </div>
            <InputDropBox
                leftHeader={"Amount of token2"}
                inputs={testData}
                value={amountOfToken1}
                token={token1}
                onChange={setAmountOfToken1}
                setToken={setToken1}
            />
            {!activePool && (
                <div className={styles.error}>
                    Message: Empty pool. Set the initial conversion rate.
                </div>
            )}
            <div className={styles.bottomDiv}>
                <div className={styles.btn} onClick={()=>{}}>
                    Provide
                </div>
            </div>
        </div>
    );
}