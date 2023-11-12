import { useState } from "react";
import { MdAdd } from "react-icons/md";
import InputNumberBox from "../../common/inputBox/InputNumberBox";
import styles from "./SelectTab.module.css";


/**
 * Provide component
 * @param param0 
 */
export default function Provide() {

    const [amountOfToken0, setAmountOfToken0] = useState("");
    const [amountOfToken1, setAmountOfToken1] = useState("");
    const [activePool, setActivePool] = useState(true);

    return (
        <div className={styles.tabBody}>
            <InputNumberBox
                leftHeader={"Amount of " + "some token"}
                right={"XRP"}
                value={amountOfToken0}
                onChange={()=>{}}
            />
            <div className={styles.swapIcon}>
                <MdAdd />
            </div>
            <InputNumberBox
                leftHeader={"Amount of " + "some token"}
                right={"FOO"}
                value={amountOfToken1}
                onChange={()=>{}}
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