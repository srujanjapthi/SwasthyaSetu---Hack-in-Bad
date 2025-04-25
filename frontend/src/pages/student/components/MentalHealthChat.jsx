import { useGetAIResponse } from "@/api/StudentApi";
import Markdown from "react-markdown";

export default function MentalHealthChat() {
  const { data: aiSuggestion, isLoading } = useGetAIResponse();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h1>Mental Health Chat</h1>
      <Markdown>{aiSuggestion}</Markdown>
    </div>
  );
}
