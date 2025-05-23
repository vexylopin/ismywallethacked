const apiKey = 'YGICVWF3144XIYX3AXW2QIE2U1CH87S445';
const krawContract = '0x269C4d50A83c3b181e883163C8AE5031182c8162';

async function checkWallet() {
  const wallet = document.getElementById('wallet').value.trim();
  const resultDiv = document.getElementById('result');

  if (!wallet.startsWith('0x') || wallet.length !== 42) {
    resultDiv.innerText = "Please enter a valid wallet address.";
    resultDiv.className = "result-invalid";
    return;
  }

  resultDiv.innerText = "Checking...";
  resultDiv.className = "result-checking";
  try {
    // Construct API URL
    const url = `https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${krawContract}&address=${wallet}&tag=latest&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "1") {
      resultDiv.innerText = "Error fetching data from Polygonscan.";
      return;
    }

    const balanceWei = BigInt(data.result);
    const decimals = BigInt(1e18);
    const wholePart = balanceWei / decimals;
    const decimalPart = balanceWei % decimals;
    const balance = Number(wholePart) + Number(decimalPart) / 1e18;

    if (balance > 0) {
  resultDiv.innerText = `💀 Your wallet holds ${balance.toLocaleString()} KRAW.\nSo yes, your wallet is hacked! 😂`;
  resultDiv.className = "result-hacked";

  } else {
  resultDiv.innerText = "✅ Your wallet is secure, since it holds zero KRAW. 😌";
  resultDiv.className = "result-safe";
  }


  } catch (error) {
    resultDiv.innerText = "Failed to check wallet. Please try again later.";
    console.error(error);
    resultDiv.className = "result-error";
  }
}
