import { Navigation } from "../../components/Navigation.tsx";
import Editor from "../../islands/Editor.tsx";

export default function Home() {
  return (
    <div class="h-screen flex flex-col">
      <Navigation />
      <div class="flex-grow flex">
        <Editor />
      </div>
    </div>
  );
}