document.addEventListener('DOMContentLoaded', () => {
    // Fart counter logic
    const population = 8000000000; // 8 billion
    const avgFartsPerDay = 15; // Average of 10–20 farts per day
    const secondsInDay = 86400;
    const baseFartsPerSecond = (population * avgFartsPerDay) / secondsInDay; // ~1.39M farts/second

    const counter = document.getElementById('fart-counter');
    
    function updateCounter() {
        const variation = baseFartsPerSecond * 0.1 * (Math.random() * 2 - 1);
        const fartsNow = Math.round(baseFartsPerSecond + variation);
        counter.textContent = fartsNow.toLocaleString();
    }

    updateCounter();
    setInterval(updateCounter, 2000);

    // Form submission feedback
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        setTimeout(() => {
            document.getElementById('form-message').classList.remove('hidden');
            this.reset();
            setTimeout(() => {
                document.getElementById('form-message').classList.add('hidden');
            }, 3000);
        }, 1000);
    });

    // Phantom Wallet and Chatbot logic
    const connectWalletButton = document.getElementById('connect-wallet');
    const walletStatus = document.getElementById('wallet-status');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');

    // Solana configuration
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
    const GFT_TOKEN_MINT = new solanaWeb3.PublicKey('GFT_TOKEN_MINT_ADDRESS_HERE'); // Replace with GFT mint address
    const RECIPIENT_ADDRESS = new solanaWeb3.PublicKey('RECIPIENT_WALLET_ADDRESS_HERE'); // Replace with your wallet address
    const REQUIRED_TOKENS = 100000 * 1e9; // 100,000 GFT (assuming 9 decimals)

    let provider = null;
    let publicKey = null;

    // Check if Phantom is installed
    function getProvider() {
        if ('solana' in window) {
            const anyWindow = window;
            provider = anyWindow.solana;
            if (provider.isPhantom) {
                return provider;
            }
        }
        return null;
    }

    // Connect to Phantom Wallet
    async function connectWallet() {
        provider = getProvider();
        if (!provider) {
            walletStatus.textContent = 'Please install Phantom Wallet';
            window.open('https://phantom.app/', '_blank');
            return;
        }
        try {
            const response = await provider.connect();
            publicKey = new solanaWeb3.PublicKey(response.publicKey.toString());
            walletStatus.textContent = `Connected: ${publicKey.toBase58().slice(0, 8)}...`;
            checkTokenBalance();
        } catch (err) {
            console.error('Connection error:', err);
            walletStatus.textContent = 'Failed to connect wallet';
        }
    }

    // Check GFT token balance
    async function checkTokenBalance() {
        if (!publicKey) return;
        try {
            const tokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
                connection,
                publicKey, // Payer (not used for read-only)
                GFT_TOKEN_MINT,
                publicKey
            );
            const balance = await connection.getTokenAccountBalance(tokenAccount.address);
            const tokenAmount = balance.value.uiAmount * 1e9; // Convert to smallest unit
            if (tokenAmount >= REQUIRED_TOKENS) {
                walletStatus.textContent = `Sufficient GFT tokens. Click to spend 100,000 GFT and unlock FartBot.`;
                connectWalletButton.textContent = 'Unlock FartBot';
                connectWalletButton.onclick = spendTokens;
            } else {
                walletStatus.textContent = `Insufficient GFT tokens (${balance.value.uiAmount.toLocaleString()}/100,000)`;
            }
        } catch (err) {
            console.error('Balance check error:', err);
            walletStatus.textContent = 'Error checking GFT balance';
        }
    }

    // Spend 100,000 GFT tokens to unlock FartBot
    async function spendTokens() {
        try {
            const senderTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
                connection,
                publicKey,
                GFT_TOKEN_MINT,
                publicKey
            );
            const recipientTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
                connection,
                publicKey, // Payer (not used for creation)
                GFT_TOKEN_MINT,
                RECIPIENT_ADDRESS
            );

            const transaction = new solanaWeb3.Transaction().add(
                splToken.createTransferInstruction(
                    senderTokenAccount.address,
                    recipientTokenAccount.address,
                    publicKey,
                    REQUIRED_TOKENS,
                    [],
                    splToken.TOKEN_PROGRAM_ID
                )
            );

            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            const signed = await provider.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signed.serialize());
            await connection.confirmTransaction(signature);

            // Unlock FartBot
            localStorage.setItem('fartBotUnlocked', 'true');
            unlockChatbot();
            walletStatus.textContent = 'FartBot unlocked! Enjoy chatting.';
            connectWalletButton.classList.add('hidden');
        } catch (err) {
            console.error('Transaction error:', err);
            walletStatus.textContent = 'Failed to process transaction';
        }
    }

    // Unlock chatbot UI
    function unlockChatbot() {
        chatInput.disabled = false;
        chatSubmit.disabled = false;
        connectWalletButton.classList.add('hidden');
    }

    // Check if FartBot is already unlocked
    if (localStorage.getItem('fartBotUnlocked') === 'true') {
        walletStatus.textContent = 'FartBot unlocked! Enjoy chatting.';
        unlockChatbot();
    } else {
        connectWalletButton.addEventListener('click', connectWallet);
    }

    // Chatbot logic
    const mockResponses = [
        "Farts smell because of sulfur compounds like hydrogen sulfide. Blame your gut bacteria!",
        "Did you know? The average person farts about 0.5–1.5 liters of gas daily!",
        "Farts can travel at 10 feet per second. That's some serious wind power!",
        "Yes, farts are flammable due to methane content, but please don't try it at home!",
        "Diet matters! Beans and broccoli can turn you into a fart factory."
    ];

    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', isUser ? 'user' : 'bot');
        messageDiv.innerHTML = `<span class="message">${message}</span>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function fetchAIResponse(message) {
        // Placeholder for AI API (e.g., xAI Grok API)
        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }

    chatSubmit.addEventListener('click', async () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            const response = await fetchAIResponse(message);
            addMessage(response, false);
        }
    });

    chatInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            addMessage(chatInput.value, true);
            chatInput.value = '';
            const response = await fetchAIResponse(chatInput.value);
            addMessage(response, false);
        }
    });
});