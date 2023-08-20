# DEXのサンプルソースコード

## 動かし方

- npmモジュールのインストール

  ```bash
  pnpm install
  ```

- スクリプトの実行

  ```bash
  pnpm run dex
  ```

  実行結果

  ```bash
  Connecting to Testnet...
  Requesting address from the Testnet faucet...
  Got address rf7XHEpCEZCDrGHMSKr78Exv6yNkAuEKAn.
  {
    "ledger_current_index": 40493903,
    "offers": [
      {
        "Account": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C0415EB3D7DE000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "64DDEB60E43908FAA46D6A26EFCC84048AF5B1E25A15843F177359409CE92AB5",
        "PreviousTxnLgrSeq": 40493850,
        "Sequence": 26105472,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "999984582.2369381"
        },
        "TakerPays": "11499822695724712",
        "index": "73C65F4626AD359E6E3D3EB61DBF288544ACD6FD7A46F6707CE45D02B0446B41",
        "owner_funds": "999984582.2369381",
        "quality": "11500000"
      },
      {
        "Account": "rPqaUnZY6pcUtGtPC3yEJZqn8Z2K7kWUCt",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C0415EB3D7DE000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "960B3990F8726C424FE05A1CF00298AE7165859B474F48263D791E8958AFA908",
        "PreviousTxnLgrSeq": 39835629,
        "Sequence": 39835626,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "25"
        },
        "TakerPays": "287500000",
        "index": "ECBC293F0242D8BD111F80539EC96087C080052626C7E032C9B87F9B8C7CA605",
        "owner_funds": "25",
        "quality": "11500000"
      },
      {
        "Account": "rKLApU9FHzh8oXfsw1uvhvZ9XfyWHYTb3w",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C0415EB3D7DE000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "78DABCE7D87CEFC73D014A0EDE6EC120567DAF371D84C1FAFEE0FD072A19FEA6",
        "PreviousTxnLgrSeq": 39835656,
        "Sequence": 39835653,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "25"
        },
        "TakerPays": "287500000",
        "index": "3AA1F8EE2F34AEC62DAA1CAFCB26C4BA868873621DF49D0184945C1C90AAAEC7",
        "owner_funds": "25",
        "quality": "11500000"
      },
      {
        "Account": "r9UrR1XaxpF3ZZUvvRChFeNa2RpbiXkrxs",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C0415EB3D7DE000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "20F8AA9420AD121E49108D329B66EBA041D5639FB0634FB344191130EC43A9B4",
        "PreviousTxnLgrSeq": 40473216,
        "Sequence": 40153697,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "25"
        },
        "TakerPays": "287500000",
        "index": "E91AB553F2FE5AB45B4524E76BF31797A12278DF80CECC35FA82C8F8D5170DA7",
        "owner_funds": "1886.160585",
        "quality": "11500000"
      },
      {
        "Account": "rdjvHu8ba5RXvjv4LiYeTcaSCxWqqr8fs",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C044364C5BB0000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "FD5A94698767DCC84E581C604F9E3540001799D7D46A83C103C96B758A4FF94A",
        "PreviousTxnLgrSeq": 39980276,
        "Sequence": 39592391,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "5"
        },
        "TakerPays": "60000000",
        "index": "2DBCDCD7BEA5BE40B4ACE41116F6252A1D2B03F9757F0360558D558944F25669",
        "owner_funds": "164.2743301900166",
        "quality": "12000000"
      },
      {
        "Account": "rdjvHu8ba5RXvjv4LiYeTcaSCxWqqr8fs",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C044364C5BB0000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "E6DB16C23125D1C60E9DB9FA3BADA2A49D276F205BEF77A87CA92AAEC8816975",
        "PreviousTxnLgrSeq": 40173543,
        "Sequence": 39592406,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "5"
        },
        "TakerPays": "60000000",
        "index": "E3D2B86AF0A9F2F1B3863B853AE047A55BEFE3BC65BB29236BFA86F3DAFFD602",
        "quality": "12000000"
      },
      {
        "Account": "rdjvHu8ba5RXvjv4LiYeTcaSCxWqqr8fs",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C044364C5BB0000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "5A490343711260CF32704CCD679533936175B30139D91851F2408B05EE872B0C",
        "PreviousTxnLgrSeq": 40197111,
        "Sequence": 39592409,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "5"
        },
        "TakerPays": "60000000",
        "index": "4B3218D96C4C70F932B79E9524537687FEF98CB2AF763A455F1D91BE4D9BFA8B",
        "quality": "12000000"
      },
      {
        "Account": "r9UrR1XaxpF3ZZUvvRChFeNa2RpbiXkrxs",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C05543DF729C000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "1093A7D53A68B7AC97EE86C140EE5E34A704FDA976D35DAE100B41943ADD12F8",
        "PreviousTxnLgrSeq": 40473790,
        "Sequence": 40153702,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "50"
        },
        "TakerPays": "750000000",
        "index": "9B2DEEB10762182703DF96EB69AD35FED872FB7F1207334B5E39378681B472AE",
        "quality": "15000000"
      },
      {
        "Account": "r9UrR1XaxpF3ZZUvvRChFeNa2RpbiXkrxs",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C05543DF729C000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "B60CFCC3904CB38BDF218DFA7AF0937B17B43261616B165B4BF510F6D66F776C",
        "PreviousTxnLgrSeq": 40473791,
        "Sequence": 40153703,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "50"
        },
        "TakerPays": "750000000",
        "index": "1ECBC8E77C9363C869B39D178DB7D89804A1D3061F883FB4AC22458D7839D349",
        "quality": "15000000"
      },
      {
        "Account": "r9UrR1XaxpF3ZZUvvRChFeNa2RpbiXkrxs",
        "BookDirectory": "EA86116DC065D386AB758C9740CD716530B5E3E74A3E8B5A5C1057ACF5F78000",
        "BookNode": "0",
        "Flags": 0,
        "LedgerEntryType": "Offer",
        "OwnerNode": "0",
        "PreviousTxnID": "99D0504EA4A9FC65D70DEF1235A61599B7096D554D8C53AF25F4971607310084",
        "PreviousTxnLgrSeq": 40473204,
        "Sequence": 40153696,
        "TakerGets": {
          "currency": "TST",
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "value": "100"
        },
        "TakerPays": "4600000000",
        "index": "A26E836E8635640C06334422A973BACEA2447C02762EE579C8EEC76627BCF47B",
        "quality": "46000000"
      }
    ],
    "validated": false
  }
  Matching Offer found, funded with 999984582.2369381
              TST
  Full Offer will probably fill
  Total matched:
            25 TST
  Prepared transaction: {
    "TransactionType": "OfferCreate",
    "Account": "rf7XHEpCEZCDrGHMSKr78Exv6yNkAuEKAn",
    "TakerPays": {
      "currency": "TST",
      "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
      "value": "25"
    },
    "TakerGets": "287500000",
    "Flags": 0,
    "Sequence": 40493902,
    "Fee": "12",
    "LastLedgerSequence": 40493922
  }
  Sending OfferCreate transaction...
  Transaction succeeded:
            https://testnet.xrpl.org/transactions/552A4EF88F978E980B3AFA025F6C08825DEA4A297469D8252A7ED4B57BFFCE6B
  Total balance changes: [
    {
      "account": "rf7XHEpCEZCDrGHMSKr78Exv6yNkAuEKAn",
      "balances": [
        {
          "issuer": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
          "currency": "TST",
          "value": "25"
        },
        {
          "currency": "XRP",
          "value": "-287.500012"
        }
      ]
    },
    {
      "account": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
      "balances": [
        {
          "issuer": "rf7XHEpCEZCDrGHMSKr78Exv6yNkAuEKAn",
          "currency": "TST",
          "value": "-25"
        },
        {
          "currency": "XRP",
          "value": "287.5"
        }
      ]
    }
  ]
  Created a trust line.
  Modified or removed 1 matching Offer(s)
  Getting address balances as of validated ledger...
  {
    "account": "rf7XHEpCEZCDrGHMSKr78Exv6yNkAuEKAn",
    "ledger_hash": "284F252E9C088886AE3BE9A7DA5286D88E4B87700F194C236F0A47BAFD7C2943",
    "ledger_index": 40493905,
    "lines": [
      {
        "account": "rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd",
        "balance": "25",
        "currency": "TST",
        "limit": "0",
        "limit_peer": "0",
        "no_ripple": true,
        "no_ripple_peer": false,
        "quality_in": 0,
        "quality_out": 0
      }
    ],
    "validated": true
  }
  Getting outstanding Offers from rf7XHEpCEZCDrGHMSKr78Exv6yNkAuEKAn as of validated ledger...
  {
    "account": "rf7XHEpCEZCDrGHMSKr78Exv6yNkAuEKAn",
    "ledger_hash": "284F252E9C088886AE3BE9A7DA5286D88E4B87700F194C236F0A47BAFD7C2943",
    "ledger_index": 40493905,
    "offers": [],
    "validated": true
  }
  ```