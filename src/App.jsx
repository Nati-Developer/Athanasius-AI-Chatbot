import { useState } from "react";
import { Loader } from "./components/Loader/Loader";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";
import { Assistant } from "./assistants/googleai";


function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const assistant = new Assistant();

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    setIsLoading(true);
    addMessage({ content, role: "user" });

    try {
      setIsStreaming(true);
      const response = await assistant.chat(content);
      addMessage({ content: response, role: "assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I am unable to assist you right now. Please try again later. or ask the developer Natnael to fix it",
        role: "system",
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" alt="Chatbot Logo" />
        <h2 className={styles.Title}>Athanasius AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls
        isDisabled={isLoading || isStreaming}
        onSend={handleContentSend}
      />
      {/* Footer Section */}
      <footer className={styles.Footer}>
        <p>Developed by <a href="https://nati16.com">Natnael</a></p>
      </footer>
    </div>
  );
}

export default App;