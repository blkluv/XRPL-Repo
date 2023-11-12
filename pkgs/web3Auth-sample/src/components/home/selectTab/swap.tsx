import { useState } from "react";
import { MdSwapVert } from "react-icons/md";
import InputNumberBox from "../../common/inputBox/InputNumberBox";
import styles from "./SelectTab.module.css";

/**
 * Swap Component
 * @param param0 
 */
export default function Swap() {

    const [amountIn, setAmountIn] = useState("");
    const [amountOut, setAmountOut] = useState("");

    return (
        <div className={styles.tabBody}>
            <InputNumberBox
                leftHeader={"From"}
                right={"XRP"}
                value={amountIn}
                onChange={() => {}}
            />
            <div className={styles.swapIcon} onClick={() => {}}>
                <MdSwapVert />
            </div>
            <InputNumberBox
                leftHeader={"To"}
                right={"FOO"}
                value={amountOut}
                onChange={() => {}}
            />
            <div className={styles.bottomDiv}>
                <div className={styles.btn} onClick={() => {}}>
                    Swap
                </div>
            </div>
        </div>
    );
}