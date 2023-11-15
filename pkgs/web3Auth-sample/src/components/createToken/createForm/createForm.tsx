import { XummContext } from '@/context/XummProvider';
import { useContext, useState } from "react";
import InputNumberBox from "../../common/inputBox/InputNumberBox";
import styles from "./CreateForm.module.css";

/**
 * CreateForm Component
 */
export const CreateForm = () => {
  const [tokenName, setTokenName] = useState("");
  const [initAmount, setInitAmount] = useState("");
  
  const xumm = useContext(XummContext);

  return (
    <div className="flex items-center justify-center flex-col rounded-b-lg p-5 mx-auto">
      <div className=" mx-auto mt-10 bg-gray-900 w-500 rounded-t-lg px-5">
        <div className="text-center bg-gray-900 rounded-lg p-2 mt-10 cursor-pointer">
          Create New CarbonFT Form
        </div>
      </div>
      <div className={styles.tabBody}>
        <InputNumberBox
          leftHeader={"TokenName"}
          right={""}
          value={tokenName}
          onChange={(e: any) => setTokenName(e.target.value)}
        />
        <br/>
        <InputNumberBox
          leftHeader={"Init Amount"}
          right={""}
          value={initAmount}
          onChange={(e: any) => setInitAmount(e.target.value)}
        />
        <div className={styles.bottomDiv}>
          <div 
            className={styles.btn} 
            onClick={async() => { await xumm.issueNewToken(tokenName, initAmount) }}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}